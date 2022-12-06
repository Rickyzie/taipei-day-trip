from flask import *
from repository.attractionRepository import AttractionRepository
from repository.userRepository import UserRepository
import time
import jwt
import re



ar =  AttractionRepository()
ur = UserRepository()
print(ur.getUserIdByLogin("a@a.com", "aa"))
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

@app.route("/api/user", methods=["POST"])
def apiUserSignup():
	try:
		isUserRegistered = ur.isUserRegistered(request.form['email'],request.form['password'])
		if(isUserRegistered): 
			return jsonify({"error": True,"message": "email already registered"})
		else:
			ur.userSingup(
				request.form['name'],
				request.form['email'],
				request.form['password'],
			)		
			return jsonify({"ok": True})
	except TypeError :
		return jsonify({"error": True,"message": "Invalid argument"}), 400
	except ValueError :
		return jsonify({"error": True,"message": "Id not found"}), 400
	except Exception as e:
		return jsonify({"error": True,"message": "server error"}), 500

@app.route("/api/user/auth", methods=["PUT"])
def apiUserLogin():
	userId = ur.getUserIdByLogin(request.form['email'],request.form['password'])
	if userId is not None: 
		response = make_response(jsonify({"ok": True}), 200)
		response.set_cookie(key='token', value=jwt.encode({"id":userId, "exp": time.time() + 7*24*60*60 }, "secret", algorithm="HS256"), expires=time.time()+6*60)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug = True)
    app.config["JSON_SORT_KEYS"] = False

 