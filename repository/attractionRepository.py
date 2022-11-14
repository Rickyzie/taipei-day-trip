from mysqlConnectionPool import MysqlConnectionPool

class AttractionRepository :

    mcp = None

    def __init__(self):
        self.mcp = MysqlConnectionPool.getInstance()

    def getAttractionsWithPageAndKeyword(self, page = 1, keyword = "%溫%"):
        sql = "SELECT * FROM attraction  WHERE name LIKE (%s)  order by _id limit 12;"
        na = ( keyword,)
        print(self.mcp.fetchAll(sql,na))

ar =  AttractionRepository()
ar.getAttractionsWithPageAndKeyword()