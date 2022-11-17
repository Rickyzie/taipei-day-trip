import re
import json
from mysqlConnectionPool import MysqlConnectionPool

# open json file convert to python dict
with open('./taipei-attractions.json', encoding="utf-8") as f:
    data = json.load(f)
    attractions = data["result"]["results"]

# Filter each file attribute to the jpg address and packege with List
for i in range(0, len(attractions)):
    attractions[i]["fileList"] = list(map(lambda x : x[0], re.findall(r'(http.*?(jpg|JPG))', attractions[i]["file"])))

# write in output.json so as to read easily
with open("output.json", "w", encoding="utf8") as f:
    json.dump(attractions, f, indent = 4, ensure_ascii=False)

mcp = MysqlConnectionPool.getInstance()
for i in range(0, len(attractions)):
    try:
        sql = """
            INSERT INTO attraction (
                _id,
                rate, 
                direction, 
                name,
                date,
                longitude,
                REF_WP,
                avBegin,
                langinfo,
                MRT,
                SERIAL_NO,
                RowNumber,
                CAT,
                MEMO_TIME,
                POI,
                idpt,
                latitude,
                description,
                avEnd,
                address
                ) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        na = (
            attractions[i]["_id"], 
            attractions[i]["rate"], 
            attractions[i]["direction"],
            attractions[i]["name"], 
            attractions[i]["date"], 
            attractions[i]["longitude"],
            attractions[i]["REF_WP"], 
            attractions[i]["avBegin"], 
            attractions[i]["langinfo"],
            attractions[i]["MRT"], 
            attractions[i]["SERIAL_NO"], 
            attractions[i]["RowNumber"],
            attractions[i]["CAT"], 
            attractions[i]["MEMO_TIME"], 
            attractions[i]["POI"],
            attractions[i]["idpt"], 
            attractions[i]["latitude"], 
            attractions[i]["description"],
            attractions[i]["avEnd"], 
            attractions[i]["address"], 
        )
        mcp.commitTransaction(sql, na)
        for j in attractions[i]["fileList"]:
            sql = """
                INSERT INTO file_list(
                    attraction_id,
                    file
                    )
                    VALUES (%s, %s)
            """
            na = (
                attractions[i]["_id"],
                j
            )
            mcp.commitTransaction(sql, na)
    except Exception as e:
        print(e)
