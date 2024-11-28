import pandas as pd
import numpy as np
import openpyxl
import os

def calc_data(region, sheet_name, columns: list) -> list:
  """function for all necessary calculations from table sheets"""
  # open specifyed sheet from xlsx
  data_df = pd.read_excel(r"2024.10.10 Дашборд.xlsx", sheet_name=sheet_name)
  #find region row
  ind_of_state = data_df.loc[data_df.loc[data_df[columns[1]] == '{}'.format(region)].index,[columns[0]]]
  #deviation between plan and fact
  row_data_dict = {}
  deviation = data_df.loc[ind_of_state.index, [columns[3]]]
  fact = data_df.loc[ind_of_state.index, [columns[2]]]
  plan = deviation.values + fact.values
  if plan.item() == 0:
    dev_per = 0
  else:
    dev_per = (deviation / plan)*100
  #fill dict values
  row_data_dict["plan"] = plan.item()
  row_data_dict["fact"] = fact.values.item()
  row_data_dict["deviation"] = (plan-fact).values.item()
  if row_data_dict["plan"]!= 0:
    row_data_dict["deviation_in_per"] = round(dev_per.values.item())
  else:
    row_data_dict["deviation_in_per"] = 0
  #info per 1000 for container places
  if  sheet_name=='МНО':
    population = data_df.loc[data_df.loc[data_df[2] == '{}'.format(region)].index,8].values.item()
    container_places_per_1k = row_data_dict["fact"]/population*1000
    row_data_dict["container_places_per_1k"] = round(container_places_per_1k, 1)
    #info fgis utko for container places
    fgis_utko = data_df.loc[data_df.loc[data_df[2] == '{}'.format(region)].index,19].values.item()
    if not np.isnan(fgis_utko):
      fgis_utko = fgis_utko*100
    else:
      fgis_utko = 0
    row_data_dict["fgis_utko"] = round(fgis_utko)
  #info per 1000 for containers
  if sheet_name=='Контейнеры':
    population = data_df.loc[data_df.loc[data_df['Unnamed: 1'] == '{}'.format(region)].index,'Unnamed: 7'].values.item()
    containers_per_1k = row_data_dict["fact"]/population*1000
    row_data_dict["containers_per_1k"] = round(containers_per_1k, 1)
    #info fgis utko for containers
    fgis_utko = data_df.loc[data_df.loc[data_df['Unnamed: 1'] == '{}'.format(region)].index,'Unnamed: 18'].values.item()
    if not np.isnan(fgis_utko):
      fgis_utko = fgis_utko*100
    else:
      fgis_utko = 0
    row_data_dict["fgis_utko"] = round(fgis_utko)
  return row_data_dict

def all_info_4_rus(dataframe):
    """function for all info for the RF collectioning"""
    data_4_RF = {}
    data_4_RF['tech_lack'] = round(dataframe.loc[8,17]*100,1)
    data_4_RF['places_lack'] = round(dataframe.loc[8,26]*100, 1)
    data_4_RF['places_per_1k'] = round(dataframe.loc[8,28])
    data_4_RF['containers_lack'] = round(dataframe.loc[8,33]*100, 1)
    data_4_RF['containers_per_1k'] = round(dataframe.loc[8,35],1)
    return data_4_RF

def data_to_web(region):
  data_to_web = {}
  data_to_web['tech_info'] = calc_data(region, sheet_name='Спецтехника', columns=['Unnamed: 0','Unnamed: 1', 'Unnamed: 5', 'Unnamed: 6'])
  data_to_web['container_places_info'] = calc_data(region, sheet_name='МНО', columns=[1,2,9,12])
  data_to_web['containers_info'] = calc_data(region, sheet_name='Контейнеры', columns=["Unnamed: 0","Unnamed: 1","Unnamed: 8","Unnamed: 11"])
  data_to_web['all_RF_info'] = all_info_4_rus(pd.read_excel(r"2024.10.10 Дашборд.xlsx", sheet_name='Свод'))
  return data_to_web

def clean_data(data):
  for key, value in data.items():
    if value.endswith('(2/3)'):
      data[key] = value[:-6]
    if value.endswith(')') and key!='region':
      data[key] = value.split(' (')[0]
    if value.endswith('%'):
      data[key] = value[:-1]
  return data

def rewrite_new_data_to_xlxs(data):
  data_df = pd.read_excel(r"2024.10.10 Дашборд.xlsx", sheet_name=['Свод', 'Контейнеры', 'МНО', 'Спецтехника'])

  #technika
  data_df['Спецтехника'].loc[data_df['Спецтехника'].index[data_df['Спецтехника']['Unnamed: 1'].values == '{}'.format(data['region'])], 'Unnamed: 4'] = int(data['tech_plan'])
  data_df['Спецтехника'].loc[data_df['Спецтехника'].index[data_df['Спецтехника']['Unnamed: 1'].values == '{}'.format(data['region'])], 'Unnamed: 5'] = int(data['tech_fact'])
  data_df['Спецтехника'].loc[data_df['Спецтехника'].index[data_df['Спецтехника']['Unnamed: 1'].values == '{}'.format(data['region'])], 'Unnamed: 6'] = int(data['tech_dev'])
  #container_places
  data_df['МНО'].loc[data_df['МНО'].index[data_df['МНО'][2].values == '{}'.format(data['region'])], 17] = int(data['places_plan'])
  data_df['МНО'].loc[data_df['МНО'].index[data_df['МНО'][2].values == '{}'.format(data['region'])], 9] = int(data['places_fact'])
  data_df['МНО'].loc[data_df['МНО'].index[data_df['МНО'][2].values == '{}'.format(data['region'])], 12] = int(data['places_dev'])
  data_df['Свод'].loc[data_df['Свод'].index[data_df['Свод'][3].values == '{}'.format(data['region'])], 28] = float(data['container_places_per_1k'])
  data_df['Свод'].loc[data_df['Свод'].index[data_df['Свод'][3].values == '{}'.format(data['region'])], 29] = float(data['fgis_utko_places'])/100
  #containers
  data_df['Контейнеры'].loc[data_df['Контейнеры'].index[data_df['Контейнеры']['Unnamed: 1'].values == '{}'.format(data['region'])], 'Unnamed: 16'] = int(data['containers_plan'])
  data_df['Контейнеры'].loc[data_df['Контейнеры'].index[data_df['Контейнеры']['Unnamed: 1'].values == '{}'.format(data['region'])], 'Unnamed: 8'] = int(data['containers_fact'])
  data_df['Контейнеры'].loc[data_df['Контейнеры'].index[data_df['Контейнеры']['Unnamed: 1'].values == '{}'.format(data['region'])], "Unnamed: 11"] = int(data['containers_dev'])
  data_df['Свод'].loc[data_df['Свод'].index[data_df['Свод'][3].values == '{}'.format(data['region'])], 35] = float(data['containers_per_1k'])
  data_df['Свод'].loc[data_df['Свод'].index[data_df['Свод'][3].values == '{}'.format(data['region'])], 36] = float(data['fgis_utko_containers'])/100


  with pd.ExcelWriter(r"2024.10.10 Дашборд.xlsx", engine='openpyxl') as writer:
      data_df['Свод'].to_excel(writer, sheet_name='Свод')
      data_df['Спецтехника'].to_excel(writer, sheet_name='Спецтехника')
      data_df['МНО'].to_excel(writer, sheet_name='МНО')
      data_df['Контейнеры'].to_excel(writer, sheet_name='Контейнеры')


# region = 'Астраханская область'
# print(data_to_web(region))
