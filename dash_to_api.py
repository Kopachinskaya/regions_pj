import pandas as pd
import numpy as np
import openpyxl
import os

data = {
        "container_places_per_1k": "9.8",
        "containers_dev": "11301",
        "containers_fact": "34946",
        "containers_per_1k": "16.5",
        "containers_plan": "46247",
        "fgis_utko_containers": "100",
        "fgis_utko_places": "100",
        "places_dev": "17421",
        "places_fact": "20660",
        "places_plan": "38081",
        "region": "Алтайский край",
        "tech_dev": "49",
        "tech_fact": "352",
        "tech_plan": "401"
}

def clean_data(data):
  for key, value in data.items():
    if value.endswith('(2/3)'):
      data[key] = value[:-6]
    if value.endswith(')') and key!='region':
      data[key] = value.split(' (')[0]
    if value.endswith('%'):
      data[key] = value[:-1]
  return data

print(clean_data(data))
data_df = pd.read_excel(r"2024.10.10 Дашборд.xlsx", sheet_name=['Свод', 'Контейнеры', 'МНО', 'Спецтехника'])
print(data_df['Спецтехника'])


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