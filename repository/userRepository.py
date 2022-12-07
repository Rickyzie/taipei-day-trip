from connections.mysqlConnectionPool import MysqlConnectionPool

class UserRepository :

    mcp = None

    def __init__(self):
        self.mcp = MysqlConnectionPool.getInstance()

    def userSingup(self, name, email, password):
        try:
            sql = "INSERT INTO user (name, email, password) VALUE (%s, %s, %s);"
            na = (name, email, password)
            return self.mcp.fetchOne(sql,na)
        except Exception as e:
            print(e)

    def getUserProfileById(self, id):
        try:
            sql = "SELECT id, name, email  FROM user WHERE id = (%s);" 
            na = (id, )
            return self.mcp.fetchOne(sql,na)
        except Exception as e:
            print(e)
    
    def getUserIdByLogin(self, email, password):
        try:
            sql = "SELECT id FROM user WHERE email = (%s) AND password = (%s);"
            na = (email, password)
            return self.mcp.fetchOne(sql,na)["id"]
        except Exception as e:
            print("getUserIdByLogin")
            print(e)