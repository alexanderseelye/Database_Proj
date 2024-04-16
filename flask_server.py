# Filename - server.py
 
# Import flask and datetime module for showing date and time
from flask import Flask, json, request, Response
from flask_headers import headers
from flask_cors import CORS
import psycopg

#x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)
CORS(app)

USER = "postgres"
PASSWD = "postgres"
DB = "projectdata"

my_headers = {
    "Access-Control-Allow-Origin" : "*",
    "Content-Type" : "application/json"
}
 
db_conn = psycopg.connect(f"dbname={DB} user={USER} password={PASSWD}")
db_cur = db_conn.cursor()

user_db_conn = None
user_db_cur = None

def changeSession(user, passwd, con, cur):
    cur.close()
    con.close()
    new_con = psycopg.connect(f"dbname={DB} user={user} password={passwd}")    
    print(new_con.cursor().execute("SELECT SESSION_USER"))
    return new_con

# @app.before_request
# def handle_preflight():
#     if request.method == "OPTIONS":
#         res = Response()
#         res.headers['X-Content-Type-Options'] = '*'
#         return res

# Route for seeing a data


@app.route('/users')
@headers(my_headers)
def get_users():
    db_cur.execute("SELECT * FROM users")
    x = db_cur.fetchall()
    #print(x)
    y = {
        "columns": ["ID", "Username", "Password"],
        "results": x
        }
    print(json.dumps(y))
    # Returning an api for showing in  reactjs
    return json.dumps(y)


@app.route("/players")
@headers(my_headers)
def get_players():
    db_cur.execute("SELECT * FROM playerinfo")
    x = db_cur.fetchall()
    #print(x)
    y = {
        "columns": ["Name", "Number", "PPG", "ProfilePic"],
        "results": x
        }
    # print(db_cur.execute("SELECT SESSION_USER, CURRENT_USER").fetchall())
    return json.dumps(y)


@app.route("/login", methods=['GET', 'POST'])
@headers(my_headers)
def login():
    data = request.json
    user = data.get("user")
    passwd = data.get("password")
    # print(user)
    # print(passwd)
    success = False
    for record in db_cur.execute("SELECT * FROM users").fetchall():
        if user in record and passwd in record:
            success = True
            break

    if success:
        db_cur.execute(f"SET SESSION AUTHORIZATION {user}")
        # db_conn.commit()
        # user_db_conn = changeSession(user, passwd, db_conn, db_cur)
        # user_db_cur = user_db_conn.cursor()
        # print(user_db_cur.execute("SELECT SESSION_USER"))

    return json.dumps({"login": success})


@app.route("/register", methods=['GET', 'POST'])
@headers(my_headers)
def register():
    data = request.json
    print(data.get("user"))
    print(data.get("password"))
    newuser = data.get("user")
    newpass = data.get("password")
    
    already_exists = False
    success = False
    for record in db_cur.execute("SELECT * FROM users").fetchall():
        if newuser in record:
            already_exists = True
            break
    if not (already_exists):
        print("Inserting new user: " + newuser)
        db_cur.execute(f"INSERT INTO users (id, username, passwd) VALUES (5, '{newuser}', '{newpass}')")
        db_cur.execute(f"""CREATE ROLE {newuser} WITH
                            LOGIN
                            SUPERUSER
                            CREATEDB
                            CREATEROLE
                            NOINHERIT
                            NOREPLICATION
                            CONNECTION LIMIT -1
                            PASSWORD '{newpass}';""")
        db_conn.commit()
        success = True

    return json.dumps({"login": success})

# Running app
if __name__ == '__main__':
    app.run(debug=True)