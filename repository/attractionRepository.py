from mysqlConnectionPool import MysqlConnectionPool

class AttractionRepository :

    mcp = None

    def __init__(self):
        self.mcp = MysqlConnectionPool.getInstance()

    def getAttractionsByPageAndKeyword(self, page = 1, keyword = ""):
        try:
            sql = "SELECT * FROM attraction WHERE name LIKE (%s) AND _id > (%s) order by _id limit 12;"
            keyword = "%" + keyword + "%" 
            page = (page - 1) * 12
            na = ( keyword, page)
            return self.mcp.fetchAll(sql,na)
        except Exception as e:
            print(e)

    def getAttractionsById(self, _id):
        try:
            sql = "SELECT * FROM attraction WHERE _id = (%s) ;"
            na = (_id, )
            return self.mcp.fetchOne(sql,na)
        except Exception as e:
            print(e)
            
    def getCategories(self):
        try:
            sql = "SELECT DISTINCT CAT FROM attraction"
            return self.mcp.fetchAll(sql)
        except Exception as e:
            print(e)

ar =  AttractionRepository()
print(ar.getCategories())