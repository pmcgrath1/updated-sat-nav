from flask import Flask, jsonify, render_template, request,session,flash,url_for
import mysql.connector
from MyUtils import UseDatabase
from functools import wraps
import os
from werkzeug import secure_filename

################################################################################
#                       FILE UPLOAD
################################################################################
UPLOAD_FOLDER = '/home/pmcgrath1/mysite/static/gpxFiles'
ALLOWED_EXTENSIONS = set(['gpx','txt'])

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS



@app.route('/upload',methods=['GET', 'POST'])
def index():
    #return jsonify(result=100)
    file = request.files['file']
    user = request.form['userid']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        files_address = 'http://pmcgrath1.pythonanywhere.com/static/gpxFiles/'+file.filename
        name = file.filename

        with UseDatabase(app.config) as cursor1:
            SQL1 = "INSERT into files (address,username,filename) values ('"+files_address+"','"+user+"','"+name+"')"
            cursor1.execute(SQL1)


        return jsonify(result=100)
################################################################################


################################################################################
#                   Admin Login
################################################################################

@app.route('/')
def display_login():
  return render_template("login.html",
                            the_title="OSM update manager",
                            login_url=url_for("processlogin"))

@app.route('/logout',methods=['POST','GET'])
def logout():
  session.pop('loggedIn',None)
  return render_template("login.html",
                            the_title="OSM update manager",
                            login_url=url_for("processlogin"))

def login_required(test):
  @wraps(test)
  def wrap(*args,**kwargs):
    if 'loggedIn' in session:
      return test(*args, **kwargs)
    else:
      return render_template("login.html",
                            the_title="OSM update manager",
                            login_url=url_for("processlogin"),
                            message="Please log in")
  return wrap

@app.route('/main')
@login_required
def loggedIn():
  if 'loggedIn' in session:
    return render_template("main.html",
                            the_title="OSM update manager")


@app.route('/login' , methods=['POST','GET'])
def processlogin():

  name = request.form['userid']
  password = request.form['passwd']

  with UseDatabase(app.config) as cursor1:
        SQL1 = "SELECT filename,username,address from files"
        cursor1.execute(SQL1)
        file_address = cursor1.fetchall()

  with UseDatabase(app.config) as cursor:
        SQL = "SELECT * from admin where user='" + name + "' and password='" + password + "'"
        cursor.execute(SQL)
        the_data = cursor.fetchone()

  if the_data is None:
    return render_template("login.html",
                            the_title="OSM update manager",
                            login_url=url_for("processlogin"),
                            message="Invalid login or usernames")
  else:
    session['loggedIn'] = True
    return render_template("main.html",
                            the_title="OSM update manager",
                            rows=file_address)

app.config['SECRET_KEY'] = 'thisismysecretkeywhichyouwillneverguesshahahahahahahaha'
app.config['DB_HOST'] = 'mysql.server'
app.config['DB_USER'] = 'pmcgrath1'
app.config['DB_PASSWD'] = 'eastwood18'
app.config['DB'] = 'pmcgrath1$osmadmin'

################################################################################

################################################################################










#@app.route('/createTable')

#def add_numbers():

#	try:

	  #  conn = psycopg2.connect("dbname='d7tuktpsceh55f' user='rlwwwdlcslgbmw' host='ec2-54-225-239-184.compute-1.amazonaws.com' password ='zVljCV2QtJddSUqG2Zjuh9w5zb' ")








	  #  cur = conn.cursor()
	  #  cur.execute('''INSERT INTO gps_data (latlng)VALUES(7)''')
	  #  conn.commit()
	  #  print ("Table created successfully")

	 #   conn.close()
	#except:
	#	print ("I am unable to connect to the database")


	#return jsonify(result=100)

#@app.route('/insert')
#def index():


    #a = request.args.get('data', 0, type=str)


   # conn = psycopg2.connect("dbname='d7tuktpsceh55f' user='rlwwwdlcslgbmw' host='ec2-54-225-239-184.compute-1.amazonaws.com' password ='zVljCV2QtJddSUqG2Zjuh9w5zb' ")

  #  cur = conn.cursor()


   # cur.execute("INSERT INTO gps_data1(latlng) VALUES (%s)", (a,))
   # cur.close()
   # conn.commit()
   # conn.close()


    #return jsonify(result=100)












