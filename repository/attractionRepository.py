from mysqlConnectionPool import MysqlConnectionPool

class AttractionRepository :

    mcp = None

    def __init__(self):
        self.mcp = MysqlConnectionPool.getInstance()

    def toApiAttraction(self, attraction):
        data = { 
                "id": attraction["_id"],
                "name": attraction["name"],
                "category": attraction["CAT"],
                "description": attraction["description"],
                "address": attraction["address"],
                "transport": attraction["direction"],
                "mrt": attraction["MRT"],
                "lat": attraction["latitude"],
                "lng": attraction["longitude"],
            }
        return data



    def getAttractionsByPageAndKeyword(self, page = 1, keyword = ""):
        try:
            sql = "SELECT * FROM attraction WHERE name LIKE (%s) AND _id > (%s) order by _id limit 12;"
            keyword = "%" + keyword + "%" 
            page = (page - 1) * 12
            na = ( keyword, page)
            return list(map(lambda x: self.toApiAttraction(x), self.mcp.fetchAll(sql,na)))
        except Exception as e:
            print(e)

    def getAttractionsById(self, _id):
        try:
            sql = "SELECT * FROM attraction WHERE _id = (%s) ;"
            na = (_id, )
            return self.toApiAttraction(self.mcp.fetchOne(sql,na))
        except Exception as e:
            print(e)
    
    def getfileListById(self, _id):
        try:
            sql = "SELECT * FROM file_list WHERE attraction_id = (%s) ;"
            na = (_id, )
            return list(map(lambda x: x["file"], self.mcp.fetchAll(sql,na)))
        except Exception as e:
            print(e)
            
    def getCategories(self):
        try:
            sql = "SELECT DISTINCT CAT FROM attraction"
            return self.mcp.fetchAll(sql)
        except Exception as e:
            print(e)

ar =  AttractionRepository()

attraction = ar.getAttractionsById(1)

attractions = ar.getAttractionsByPageAndKeyword()

data = {
    "nextPage": 1,
        "data": [
            {
            "id": 10,
            "name": "平安鐘",
            "category": "公共藝術",
            "description": "平安鐘祈求大家的平安，這是為了紀念 921 地震週年的設計",
            "address": "臺北市大安區忠孝東路 4 段 1 號",
            "transport": "公車：204、212、212直",
            "mrt": "忠孝復興",
            "lat": 25.04181,
            "lng": 121.544814,
            "images": [
                "http://140.112.3.4/images/92-0.jpg"
            ]
            }
  ]
}
print(attractions)