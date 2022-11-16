import mysql.connector

class MysqlConnectionPool :
    # 加底線表示為私有變數
    _dbconfig = {
    "host":"localhost",      
    "user":"debian-sys-maint",    
    "passwd":"K0TyBR2qvL74OFgE",   
    "database": "taipei_attractions",
    "pool_name": "mypool",
    "pool_size": 5
    }
    
    _cnxpool=None

    _instance = None

    @staticmethod
    def getInstance():
        if MysqlConnectionPool._instance is None:
            MysqlConnectionPool()
        return MysqlConnectionPool._instance

    def __init__(self):
        if MysqlConnectionPool._instance is not None:
            raise Exception('only one instance can exist')
        else:
            MysqlConnectionPool._instance = self
            self._cnxpool = mysql.connector.pooling.MySQLConnectionPool(**self._dbconfig)
            

    def fetchOne(self, sql, na):
        try:
            cnx = self._cnxpool.get_connection()
            mycursor = cnx.cursor()
            mycursor.execute(sql, na)
            return mycursor.fetchone()
        except Exception as e:
            print(e)
        finally:
            cnx.close()
            mycursor.close()
        
    
    def fetchAll(self, sql, na):
        try:
            cnx = self._cnxpool.get_connection()
            mycursor = cnx.cursor(buffered=True)
            mycursor.execute(sql, na)
            return mycursor.fetchall()
        except Exception as e:
            print(e)
        finally:
            cnx.close()
            mycursor.close()
    
    def commitTransaction(self, sql, na):
        try:
            cnx = self._cnxpool.get_connection()
            mycursor = cnx.cursor()
            mycursor.execute(sql, na)
            cnx.commit()
        except Exception as e:
             print(e)
        finally:
            cnx.close()
            mycursor.close()

