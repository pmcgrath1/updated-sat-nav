from flask import Flask, jsonify, render_template, request,make_response,current_app
import psycopg2


from datetime import timedelta
 
from functools import update_wrapper

app = Flask(__name__)
#CORS(app, headers=['Content-Type'])

@app.route('/_add_numbers')

def add_numbers():

	try:

	    conn = psycopg2.connect("dbname='monday' user='postgres' host='localhost' password ='eastwood52095' ")
	      

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

@app.route('/')
def index():
    return render_template('test.html')


app.run(debug=True)