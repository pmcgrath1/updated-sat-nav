from flask import Flask, jsonify, render_template, request
import psycopg2



app = Flask(__name__)




@app.route('/insertToTable')

def add_numbers():

	try:

	    conn = psycopg2.connect("dbname='d7tuktpsceh55f' user='rlwwwdlcslgbmw' host='ec2-54-225-239-184.compute-1.amazonaws.com' password ='zVljCV2QtJddSUqG2Zjuh9w5zb' ")








	    cur = conn.cursor()
	    cur.execute('''INSERT INTO gps_data1 (ID)VALUES (88800));''')
	    conn.commit()
	    print ("Table created successfully")

	    conn.close()
	except:
		print ("I am unable to connect to the database")

	a = request.args.get('a', 0, type=int)
	b = request.args.get('b', 0, type=int)
	return jsonify(result=100)

@app.route('/')
def index():
    return render_template('test.html')