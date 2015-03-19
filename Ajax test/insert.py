from flask import Flask, jsonify, render_template, request,json
import psycopg2
app = Flask(__name__)

@app.route('/insertTable')

def add_numbers():
	a = request.args.get('data', 0, type=str)
	print("Here is the sample data ",a)
	try:
                print("Here is the sample data inside of try",a)
                #conn = psycopg2.connect("dbname='d7tuktpsceh55f' user='rlwwwdlcslgbmw' host='ec2-54-225-239-184.compute-1.amazonaws.com' password ='zVljCV2QtJddSUqG2Zjuh9w5zb'")
                conn = psycopg2.connect("dbname='ireland' user='postgres' host='localhost' password ='eastwood52095' ")
                cur = conn.cursor()
                print ("Succesfully connected to the database")

                
                
                print("'a' variable contains",a)
                cur.execute("INSERT INTO gps_data1 (ID)VALUES (800)");
                
                cur.close()
                conn.commit()
                conn.close()
                print ("Data entered successfully")
                
	except:

		print ("I am unable to connect to the database")

	return jsonify(results="success")


@app.route('/')
def index():

	
    return render_template('test.html')

app.run(debug=True)