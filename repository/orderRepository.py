from connections.mysqlConnectionPool import MysqlConnectionPool

class OrderRepository :

    mcp = None

    def __init__(self):
        self.mcp = MysqlConnectionPool.getInstance()

    def addOrder(self, user_id, name, email, phone):
        try:
            self.mcp.multipleExecute([
                (
                """
                    INSERT INTO taipei_attractions.order (user_id, name, email, phone) VALUES (%s, %s, %s, %s);
                """,
                (user_id, name, email, phone)
                ),
                (
                """
                    INSERT INTO taipei_attractions.cart (user_id, reservation_id) VALUES (%s, LAST_INSERT_ID());
                """,
                ()
                )
            ])
            return "Add Successfully"
        except Exception as e:
            print("addOrder")
            print(e)
            raise

