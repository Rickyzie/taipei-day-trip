from connections.mysqlConnectionPool import MysqlConnectionPool

class UserRepository :

    mcp = None

    def __init__(self):
        self.mcp = MysqlConnectionPool.getInstance()

    def userSingup(self, name, email, password):
        try:
            sql = "INSERT INTO user (name, email, password) VALUE (%s, %s, %s);"
            na = (name, email, password)
            return self.mcp.commitTransaction(sql,na)
        except Exception as e:
            print("userSingup")
            print(e)


    def getUserProfileById(self, id):
        try:
            sql = "SELECT id, name, email  FROM user WHERE id = (%s);" 
            na = (id, )
            return self.mcp.fetchOne(sql,na)
        except Exception as e:
            print("getUserProfileById")
            print(e)
    
    def getUserIdByLogin(self, email, password):
        try:
            sql = "SELECT id FROM user WHERE email = (%s) AND password = (%s);"
            na = (email, password)
            result = self.mcp.fetchOne(sql,na)
            if result is not None:
                return result["id"]
            else: 
                return None
        except Exception as e:
            print("getUserIdByLogin")
            print(e)

    def isEmailOrPasswordExist(self, email, password):
        try:
            sql = "SELECT id FROM user WHERE email = (%s) OR password = (%s);"
            na = (email, password)
            result = self.mcp.fetchOne(sql,na)
            if result is not None:
                return True
            else:
                return False
        except Exception as e:
            print("isEmailOrPasswordExist")
            print(e)