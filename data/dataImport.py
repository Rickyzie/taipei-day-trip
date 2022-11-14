import requests
import pandas as pd
import json
from datetime import date
import re

with open('./taipei-attractions.json', encoding="utf-8") as f:
    data = json.load(f)
jsonObject = data["result"]["results"]

fileList = []
for i in range(0, len(jsonObject)):
    fileList.append(list(map(lambda x : x[0], re.findall(r'(http.*?(jpg|JPG))', jsonObject[i]["file"], re.DOTALL))))

for i in range(0, len(jsonObject)):
    jsonObject[i]["fileList"] = fileList[i]

with open("output.json", "w", encoding="utf8") as f:
    json.dump(jsonObject, f, indent = 4, ensure_ascii=False)