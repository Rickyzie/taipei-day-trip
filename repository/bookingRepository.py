from connections.mysqlConnectionPool import MysqlConnectionPool
from datetime import datetime

class BookingRepository :

    mcp = None

    def __init__(self):
        self.mcp = MysqlConnectionPool.getInstance()

    def toApiAttraction(self, atttraction):
        data = {
            "attraction": {
                "id": atttraction["attraction_id"],
                "name": atttraction["name"],
                "address": atttraction["address"],
                "image": atttraction["file"]
            },
            "reservationId":atttraction["id"],
            "date": atttraction["date"].strftime('%Y-%m-%d'),
            "time": atttraction["time"],
            "price": atttraction["price"]
        }
        return data
    

    def addAttraction(self, attractionId, date, time, price, userId):
        try:
            self.mcp.multipleExecute([
                (
                """
                    INSERT INTO taipei_attractions.reservation (attraction_id, date, time, price) VALUES (%s, %s, %s, %s);
                """,
                (attractionId, date, time, price)
                ),
                (
                """
                    INSERT INTO taipei_attractions.cart (user_id, reservation_id) VALUES (%s, LAST_INSERT_ID());
                """,
                (userId,)
                )
            ])
            return "Add Successfully"
        except Exception as e:
            print("addAttraction")
            print(e)
            raise

    def getAttractionsById(self, id):
        try:
            sql = """
                SELECT R.id, group_concat(F.file separator ',') as file, C.user_id, R.attraction_id, A.name, A.address, R.date, R.time, R.price
                FROM cart AS C
                LEFT JOIN reservation AS R
                ON C.reservation_id = R.id
                LEFT JOIN attraction AS A
                ON A._id = R.attraction_id 
                LEFT JOIN file_list AS F
                ON F.attraction_id  = R.attraction_id 
                WHERE C.user_id = (%s)
                GROUP BY R.id
                ORDER by R.id;
            """
            na = (id, )
            attractions = self.mcp.fetchAll(sql,na)

            for i in range(len(attractions)):
                attractions[i]["file"] = attractions[i]["file"].split(",")[0]

            return list(map(lambda x: self.toApiAttraction(x), attractions))
        except Exception as e:
            print("getAttractions")
            print(e)
            raise
    
    def deleteReservationById(self, reservationId):
        try:
            sql = "DELETE FROM cart WHERE reservation_id = %s;"
            sql = "DELETE FROM reservation WHERE id = %s;"
            na = (reservationId,)
            self.mcp.commitTransaction(sql,na)
            return "delete Successfully"
        except Exception as e:
            print("deleteReservationById")
            print(e)
            raise

