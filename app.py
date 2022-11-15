from flask import *
from repository.attractionRepository import AttractionRepository

ar =  AttractionRepository()

app=Flask(__name__)
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True

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
	page = int(request.args.get('page'))
	keyword = request.args.get('keyword')
	attractions = ar.getAttractionsByPageAndKeyword(page, keyword )
	data = {
		"nextPage":page + 1,
		"data":	attractions
		}
	return data
@app.route("/api/attraction/<attractionId>")
def apiAttractionByAttractionId(attractionId):
	return


#Api 旅遊景點分類
@app.route("/api/categories")
def apiCategories():
	return



attraction = ar.getAttractionsById(1)

attractions = ar.getAttractionsByPageAndKeyword()


print(attractions)

if __name__ == "__main__":
    app.run(port=3000, debug = True) 

 