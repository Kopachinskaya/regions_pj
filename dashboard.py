import pandas as pd
import fitz
import numpy as np
import openpyxl


def open_dashboard_4_region(region):

    """Open dashboard and create DFs"""

    xls = pd.read_excel(r"project-regions\\2024.10.10 Дашборд.xlsm", sheet_name=['Свод', 'Контейнеры', 'МНО'])
    dashboard_df = xls['Свод']
    containers_df = xls['Контейнеры']
    container_places_df = xls['МНО']
    ind_of_state = dashboard_df.loc[dashboard_df.loc[dashboard_df[3] == '{}'.format(region)].index,3]

    return dashboard_df, containers_df, container_places_df, ind_of_state

def table_info_for_subject(dataframe, ind_of_state, columns: list,  plan = None, fact = None) -> list:
  if plan:
    plan = pd.Series([plan], index = ind_of_state.index)
  else:
    plan = dataframe.loc[ind_of_state.index, columns[0]]
  if fact:
    fact = pd.Series([fact], index = ind_of_state.index)
  else:
      fact = dataframe.loc[ind_of_state.index, columns[1]]
  deviation = plan - fact
  if deviation.item() == 0:
    deviation_in_per = pd.Series(0)
  else:
    deviation_in_per = pd.Series(int((deviation / plan)*100))
  return plan, fact, pd.Series(int(deviation)), deviation_in_per

def per_1k_ahd_fgis_utko(dataframe, new_info, region, columns: list)-> list:
  population = dataframe.loc[dataframe.loc[dataframe[columns[0]] == '{}'.format(region)].index,columns[1]]
  fact_TS = dataframe.loc[dataframe.loc[dataframe[columns[0]] == '{}'.format(region)].index,columns[2]]
  container_per_1k = new_info[1].iloc[0]/population.iloc[0]*1000
  if np.isnan(container_per_1k):
     container_per_1k = "--"
  fgis_utko = (new_info[1].iloc[0]/np.max([new_info[1].iloc[0], fact_TS.iloc[0]]))
  if not np.isnan(fgis_utko):
     fgis_utko = int(fgis_utko)*100
  else:
     fgis_utko = '--'
  return container_per_1k, fgis_utko

def all_info_4_rus(dataframe):
    tech_lack = round(np.mean(dataframe.loc[9:,17])*100, 1)
    places_lack = round(np.mean(dataframe.loc[9:,26])*100, 1)
    places_per_1k = round(np.mean(dataframe.loc[9:,28]))
    containers_lack = round(np.mean(dataframe.loc[9:,33])*100, 1)
    containers_per_1k = round(np.mean(dataframe.loc[9:,35]))
    return [tech_lack, places_lack, places_per_1k, containers_lack, containers_per_1k]


def data_to_web(region):
    data = open_dashboard_4_region(region)
    new_table_tech_info_for_subject = table_info_for_subject(data[0], data[3], columns = [14, 15])
    new_container_places_info_for_subject = table_info_for_subject(data[0], data[3], columns = [23, 24])
    new_container_number_info_for_subject = table_info_for_subject(data[0], data[3], columns = [30, 31])
    #Строчка с изменением данных в таблице
    container_number_per_1k_ahd_fgis_utko = per_1k_ahd_fgis_utko(data[1], new_container_number_info_for_subject, region, columns=['Unnamed: 1', 'Unnamed: 7', 'Unnamed: 10'])
    container_places_per_1k_ahd_fgis_utko = per_1k_ahd_fgis_utko(data[2], new_container_places_info_for_subject, region, columns=[2, 8, 10])
    data_to_web = [{'Техника':[value.values[0] for value in new_table_tech_info_for_subject],
             'Контейнерные площадки':[value.values[0] for value in new_container_places_info_for_subject],
             'Количество контейнеров': [value.values[0] for value in new_container_number_info_for_subject]}, 
             container_number_per_1k_ahd_fgis_utko, 
             container_places_per_1k_ahd_fgis_utko, all_info_4_rus(data[0])]
    return data_to_web


# region = 'Камчатский край'
# print(data_to_web(region))