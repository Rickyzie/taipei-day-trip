from connections.mysqlConnectionPool import MysqlConnectionPool

class OrderRepository :

    mcp = None

    def __init__(self):
        self.mcp = MysqlConnectionPool.getInstance()

    def addOrder(self, user_id, name, email, phone, order_number, bank_transaction_id):
        try:
            self.mcp.multipleExecute([
                (
                """
                    INSERT INTO taipei_attractions.order (id, user_id, name, email, phone, order_number, bank_transaction_id) VALUES (%s, %s, %s, %s, %s, %s, %s);
                """,
                (order_number, user_id, name, email, phone, order_number, bank_transaction_id)
                ),
                (
                """
                    INSERT INTO taipei_attractions.order_reservation ( 
                        order_id, 
                        attraction_id, 
                        date, 
                        time,
                        price 
                        ) 
                    SELECT
                        %s,
                        attraction_id, 
                        date, 
                        time,
                        price 
                    FROM taipei_attractions.cart AS C
                    LEFT JOIN taipei_attractions.reservation AS R
                    ON C.reservation_id = R.id
                    WHERE C.user_id = %s
                """,
                (order_number ,user_id)
                )
            ])
            return True
        except Exception as e:
            print("addOrder")
            print(e)
            raise
            
    def deleteCartByUserId(self, userId):
        try:
            sql = '''
                DELETE C.*, R.*
                FROM taipei_attractions.cart AS C
                LEFT JOIN taipei_attractions.reservation AS R
                ON C.reservation_id = R.id
                WHERE user_id = %s;
            '''
            na = (userId,)
            self.mcp.commitTransaction(sql,na)
            return "delete Successfully"
        except Exception as e:
            print("deleteCartByuserId")
            print(e)
            raise

