import mysql.connector

class MysqlConnectionPool :
    # 加底線表示為私有變數
    _dbconfig = {
    "host":"localhost",      
    "user":"root",    
    "passwd":"aa24572880",   
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
            

    def fetchOne(self, sql, na = None):
        try:
            cnx = self._cnxpool.get_connection()
            mycursor = cnx.cursor(buffered=True)
            mycursor.execute(sql, na)
            data = mycursor.fetchone()
            if data is not None:
                return dict(zip(mycursor.column_names, data))
            else:
                return None
        except Exception as e:
            raise
        finally:
            cnx.close()
            mycursor.close()
        
    
    def fetchAll(self, sql, na = None):
        try:
            cnx = self._cnxpool.get_connection()
            mycursor = cnx.cursor(buffered=True)
            mycursor.execute(sql, na)
            return list(map(lambda x: dict(zip(mycursor.column_names, x)), mycursor.fetchall()))
        except Exception :
            raise 
        finally:
            cnx.close()
            mycursor.close()
    
    def commitTransaction(self, sql, na = None):
        try:
            cnx = self._cnxpool.get_connection()
            mycursor = cnx.cursor()
            mycursor.execute(sql, na)
            cnx.commit()
        except Exception:
            raise
        finally:
            cnx.close()
            mycursor.close()

