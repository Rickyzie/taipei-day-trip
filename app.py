from flask import *
import requests
from repository.attractionRepository import AttractionRepository
from repository.userRepository import UserRepository
from repository.bookingRepository import BookingRepository
from repository.orderRepository import OrderRepository

from datetime import datetime

import time
import jwt
import re



ar =  AttractionRepository()
ur = UserRepository()
br = BookingRepository()
dr = OrderRepository()
app = Flask(__name__,
            static_folder="static",
            static_url_path="/")
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True

def replace_all_blank(value):
    return re.sub('\W+', '', value).replace("_", '')

# Pages 
@app.route("/")
def index():
	return render_template("index.html")
@app.route("/attraction/<id>")
def attraction(id):
	return render_template("attraction.html")
@app.route("/booking")
def booking():
	return render_template("booking.html")
@app.route("/thankyou")
def thankyou():
	return render_template("thankyou.html")

#Api 旅遊景點
@app.route("/api/attractions")
def apiAttractions():
	try:
		page = int(request.args.get('page'))
		if(request.args.get('keyword') == None):
			keyword = ""
		else:
			keyword = replace_all_blank(request.args.get('keyword'))
		attractions = ar.getAttractionsByPageAndKeyword(page, keyword)
		if(len(attractions) == 12):
			nextPage = page + 1
		else:
			nextPage = None
		data = {
			"nextPage":nextPage,
			"data":	attractions
			}
		return jsonify(data)

	except ValueError :
		return jsonify({"error": True,"message": "Invalid argument"}), 400
	except Exception as e :
		return jsonify({"error": True,"message": "server error"}), 500


@app.route("/api/attraction/<attractionId>")
def apiAttractionByAttractionId(attractionId):
	try:
		#check attractionId is int string or not 
		if(not attractionId.isdigit()):
			raise TypeError

		attraction = ar.getAttractionsById(attractionId)
		data = {
			"data":	attraction
			}
		#attractionId cant found data
		if (attraction == None):
			raise ValueError
			
		return jsonify(data)

	except TypeError :
		return jsonify({"error": True,"message": "Invalid argument"}), 400
	except ValueError :
		return jsonify({"error": True,"message": "Id not found"}), 400
	except Exception as e:
		return jsonify({"error": True,"message": "server error"}), 500


#Api 旅遊景點分類
@app.route("/api/categories")
def apiCategories():
	try:
		apiCategories =list(map(lambda x: x["CAT"], ar.getCategories())) 
		data = {
			"data":	apiCategories
			}
		return jsonify(data)
	except Exception:
		return jsonify({"error": True,"message": "server error"}), 500

#Api 使用者部份
@app.route("/api/user", methods=["POST"])
def apiUserSignup():
	try:
		isExist = ur.isEmailOrPasswordExist(request.json['email'],request.json['password'])
		print(isExist)
		if isExist:
			return jsonify({"error": True,"message": "email or password already registered"})
		else:
			ur.userSingup(
				request.json['name'],
				request.json['email'],
				request.json['password'],
			)		
			return jsonify({"ok": True})
	except TypeError :
		return jsonify({"error": True,"message": "Invalid argument"}), 400
	except ValueError :
		return jsonify({"error": True,"message": "Id not found"}), 400
	except Exception as e:
		print(e)
		return jsonify({"error": True,"message": "server error"}), 500

@app.route("/api/user/auth", methods=["PUT"])
def apiUserLogin():
	userId = ur.getUserIdByLogin(request.json['email'],request.json['password'])
	if userId is not None: 
		response = make_response(jsonify({"ok": True}), 200)
		response.set_cookie(key='token', value=jwt.encode({"id":userId, "exp": time.time() + 7*24*60*60 }, "secret", algorithm="HS256"), expires=time.time() + 7*24*60*60)
		return response
	return jsonify({"error": True,"message": "account not found"}), 400

@app.route("/api/user/auth", methods=["GET"])
def apiGetUserAuth():
	try:
		decodeJwt = jwt.decode(request.cookies.get('token'), 'secret', algorithms='HS256')
		userProfile = ur.getUserProfileById(decodeJwt["id"])
		return jsonify({"data":userProfile}), 200
	except jwt.PyJWTError as e :
		print(e)
		return jsonify({"data": None}), 200
	except Exception as e :
		print(e)
		return jsonify({"error": True,"message": "sever error"}), 500

@app.route("/api/user/auth", methods=["DELETE"])
def apiUserLogout():
	try:
		response = make_response(jsonify({"ok": True}), 200)
		response.set_cookie(key='token', value="", expires=0)
		return response
	except Exception as e :
		print(e)
		return jsonify({"error": True,"message": "Id not found"}), 400

#Api 預定行程

@app.route("/api/booking", methods=["POST"])
def apiAddAttraction():
	try:
		decodeJwt = jwt.decode(request.cookies.get('token'), 'secret', algorithms='HS256')
		br.addAttraction(
			request.json['attractionId'],
			request.json['date'],
			request.json['time'],
			request.json['price'],
			decodeJwt["id"]
		)
		return jsonify({"ok": True})
	except jwt.PyJWTError as e :
		return jsonify({"error": True,"message": "NEED_LOGIN"}), 400
	except ValueError :
		return jsonify({"error": True,"message": "Id not found"}), 400
	except Exception as e:
		print(e)
		return jsonify({"error": True,"message": "server error"}), 500

@app.route("/api/booking", methods=["GET"])
def apiGetAttractions():
	try:
		decodeJwt = jwt.decode(request.cookies.get('token'), 'secret', algorithms='HS256')
		attractions = br.getAttractionsById(decodeJwt["id"])
		
		return jsonify({"data": attractions})
	except TypeError :
		return jsonify({"error": True,"message": "Invalid argument"}), 400
	except ValueError :
		return jsonify({"error": True,"message": "Id not found"}), 400
	except Exception as e:
		print(e)
		return jsonify({"error": True,"message": "server error"}), 500

@app.route("/api/booking", methods=["DELETE"])
def apiDeleteReservation():
	try:
		jwt.decode(request.cookies.get('token'), 'secret', algorithms='HS256')
		br.deleteReservationById(request.json["id"])
		return jsonify({"ok": True})
	except TypeError :
		return jsonify({"error": True,"message": "Invalid argument"}), 400
	except ValueError :
		return jsonify({"error": True,"message": "Id not found"}), 400
	except Exception as e:
		print(e)
		return jsonify({"error": True,"message": "server error"}), 500

@app.route("/api/orders", methods=["POST"])
def apiPostOrders():
	try:
		decodeJwt = jwt.decode(request.cookies.get('token'), 'secret', algorithms='HS256')
		attractions = br.getAttractionsById(decodeJwt["id"])
		totalPrice  = int()
		for a in attractions:
			totalPrice+= a["price"]
		partner_key = ""
		json = {
			"prime": request.json["prime"],
			"partner_key": partner_key,
			"merchant_id": "rickyzie_CTBC",
			"details":"TapPay Test",
			"amount": totalPrice,
			"cardholder":request.json["cardholder"],
			"remember": True,
			"order_number": datetime.now().strftime('%Y%m%d%H%M%S'),
			"bank_transaction_id": datetime.now().strftime('%Y%m%d%H%M%S')
		}
		headers = {
			"Content-Type": "application/json",
			"x-api-key": partner_key
		}
		tapPayResponese = requests.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', json = json, headers = headers)
		tapPayData = tapPayResponese.json()
		isSuccess = dr.addOrder(decodeJwt["id"], request.json["cardholder"]["name"], request.json["cardholder"]["email"], request.json["cardholder"]["phone_number"], tapPayData["order_number"], tapPayData["bank_transaction_id"])

		if isSuccess:
			dr.deleteCartByUserId(decodeJwt["id"])
		return jsonify({"ok": True, "orderId": tapPayData["order_number"]})

	except Exception:
		return jsonify({"error": True,"message": "server error"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug = True)
    app.config["JSON_SORT_KEYS"] = False

 