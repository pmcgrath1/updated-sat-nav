from flask import Flask, jsonify, render_template, request,make_response,current_app
import psycopg2


from datetime import timedelta
 
from functools import update_wrapper

app = Flask(__name__)
#CORS(app, headers=['Content-Type'])

@app.route('/_add_numbers')

def add_numbers():

	try:

	    conn = psycopg2.connect("dbname='ireland' user='postgres' host='localhost' password ='eastwood52095' ")
	      

	    cur = conn.cursor()
	    cur.execute('''CREATE TABLE work2
	       (ID INT PRIMARY KEY     NOT NULL,
	       NAME           TEXT    NOT NULL,
	       AGE            INT     NOT NULL,
	       ADDRESS        CHAR(50),
	       SALARY         REAL);''')
	    conn.commit()
	    print ("Table created successfully")

	    conn.close()
	except:
		print ("I am unable to connect to the database")

	a = request.args.get('a', 0, type=int)
	b = request.args.get('b', 0, type=int)
	return jsonify(result=a + b)

@app.route('/insert')
def insertToDb():
	print("Made it to insert")
	try:

		a = request.args.get('data', 0, type=str)

		
		conn = psycopg2.connect("dbname='ireland' user='postgres' host='localhost' password ='eastwood52095'")
		cur = conn.cursor()
		cur.execute("INSERT INTO gps_data(latlng) VALUES (%s)", (a,))
		cur.close()
		conn.commit()
		print ("Connection to database successful")
		conn.close()
	except:

		print ("I am unable to connect to the database")

	return jsonify(result=100)




app.run(debug=True)


















