from flask import *
from repository.attractionRepository import AttractionRepository
import re



ar =  AttractionRepository()

app=Flask(__name__)
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

if __name__ == "__main__":
    app.run(port=3000, debug = True)
    app.config["JSON_SORT_KEYS"] = False

 