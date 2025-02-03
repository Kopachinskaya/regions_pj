import pandas as pd
import numpy as np

# runs only first time to create .xlsx copy of dashboard to work with
svod = pd.read_excel(r"regions_pj\2024.10.10 Дашборд.xlsm", sheet_name='Свод')
tech_df = pd.read_excel(r"regions_pj\2024.10.10 Дашборд.xlsm", sheet_name='Спецтехника')
places_df =  pd.read_excel(r"regions_pj\2024.10.10 Дашборд.xlsm", sheet_name= 'МНО')
containers_df = pd.read_excel(r"regions_pj\2024.10.10 Дашборд.xlsm", sheet_name= 'Контейнеры')
with pd.ExcelWriter(r"regions_pj\2024.10.10 Дашборд.xlsx", engine='openpyxl') as writer:
  svod.to_excel(writer, sheet_name='Свод')
  tech_df.to_excel(writer, sheet_name='Спецтехника')
  places_df.to_excel(writer, sheet_name='МНО')
  containers_df.to_excel(writer, sheet_name='Контейнеры')