from flask import Flask, request, render_template,jsonify,send_from_directory,make_response
import pymysql
import traceback
import os
import datetime
from flask_cors import CORS
import json
import uuid
import urllib.parse
import hashlib
from pymysql.cursors import DictCursor
from werkzeug.utils import secure_filename


import time
import waitress

app = Flask(__name__)
CORS(app, supports_credentials=True)

upload_file_path = "input_file"

with open("config.json", 'r') as f:
    data = json.load(f)

host = data['host']
server = data['server']
is_dev = data['dev'].upper() =="TRUE"


@app.after_request
def apply_caching(response):
    response.headers["Access-Control-Expose-Headers"] = "Content-Disposition"
    return response

def get_con():
    con = pymysql.connect(host = host, user= "root1",password =  "77+ezmfo4xGs",database= "my_plan")
    return con

user_tokens = {
    "dbea3e79cd7c84a3b96ece091712205e7b64e56a8de33b5106511d3b55f601af":1
}

def generate_token():
    return hashlib.sha256(os.urandom(24)).hexdigest()


@app.route('/',methods=['GET'])
def index():
    return jsonify({"status":"success"})

@app.route('/api/user/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    con = get_con()
    cursor = con.cursor(DictCursor)

    cursor.execute("SELECT * FROM User WHERE Username=%s AND Password=%s", (username, password))
    user = cursor.fetchone()

    if user:
        token = generate_token()
        user_tokens[token] = user['UserID']
        con.close()
        return jsonify({
            "status": "success",
            "message": "Login successful",
            "token": token
        })
    else:
        con.close()
        return jsonify({
            "status": "error",
            "message": "Invalid credentials"
        }), 401

    return jsonify({'status':"success"})


@app.route('/api/user/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    con = get_con()
    cursor = con.cursor()

    cursor.execute("SELECT * FROM User WHERE Username=%s", (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        con.close()
        return jsonify({
            "status": "error",
            "message": "Username already exists"
        }), 400

    cursor.execute("INSERT INTO User (Username, Password) VALUES (%s, %s)", (username, password))
    con.commit()
    con.close()

    token = generate_token()
    user_tokens[token] = username

    return jsonify({
        "status": "success",
        "message": "Registration successful",
        "token": token
    })

def authenticate_user(token):
    return token in user_tokens

@app.route('/api/user/set-avatar', methods=['POST'])
def set_avatar():
    data = request.json
    token = request.headers.get('token')

    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    avatar_base64 = data.get('avatar')

    con = get_con()
    cursor = con.cursor()

    cursor.execute("UPDATE User SET Avatar=%s WHERE UserID=%s", (avatar_base64, user_tokens[token]))
    con.commit()
    con.close()

    return jsonify({
        "status": "success",
        "message": "Avatar set successfully"
    })


@app.route('/api/user/set-info', methods=['POST'])
def set_user_info():
    data = request.json
    token = request.headers.get('token')

    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    name = data.get('name')
    email = data.get('email')
    birthday = data.get('birthday')
    country = data.get('country')
    password = data.get('password')

    con = get_con()
    cursor = con.cursor()

    cursor.execute("""
        UPDATE User
        SET Name=%s, Email=%s, Birthday=%s, Country=%s, Password=%s
        WHERE UserID=%s
    """, (name, email, birthday, country, password, user_tokens[token]))
    con.commit()
    con.close()

    return jsonify({
        "status": "success",
        "message": "User information updated successfully"
    })


@app.route('/api/user/get-info', methods=['GET'])
def get_user_info():
    token = request.headers.get('token')

    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    con = get_con()
    cursor = con.cursor(DictCursor)

    cursor.execute("SELECT * FROM User WHERE UserID=%s", (user_tokens[token],))
    user_info = cursor.fetchone()
    con.close()

    if user_info:
        return jsonify({
            "status": "success",
            "userInfo": user_info
        })
    else:
        return jsonify({
            "status": "error",
            "message": "User not found"
        }), 404

@app.route('/api/friend/search', methods=['GET'])
def search_friend():
    token = request.headers.get('token')
    friend_name = request.args.get('name')

    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    con = get_con()
    cursor = con.cursor(DictCursor)

    cursor.execute("SELECT UserID, Name, Avatar FROM User WHERE Username LIKE %s", ('%' + friend_name + '%',))
    friends = cursor.fetchall()
    con.close()

    friend_list = [friend for friend in friends]

    return jsonify({
        "status": "success",
        "result": friend_list
    })


# Add Friend
@app.route('/api/friend/add', methods=['POST'])
def add_friend():
    token = request.headers.get('token')
    friend_id = request.json.get('friendID')

    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    con = get_con()
    cursor = con.cursor()

    try:
        if user_tokens[token] == friend_id:
            return jsonify({
                "status": "error",
                "message": "Cannot add yourself as a friend"
            }), 400

        cursor.execute("SELECT * FROM Friendship WHERE (UserID=%s AND FriendID=%s) OR (UserID=%s AND FriendID=%s)",
                       (user_tokens[token], friend_id, friend_id, user_tokens[token]))
        existing_friendship = cursor.fetchone()

        if existing_friendship:
            return jsonify({
                "status": "error",
                "message": "Friendship already exists"
            }), 400

        cursor.execute("INSERT INTO Friendship (UserID, FriendID) VALUES (%s, %s)", (user_tokens[token], friend_id))
        cursor.execute("INSERT INTO Friendship (UserID, FriendID) VALUES (%s, %s)", ( friend_id,user_tokens[token]))

        con.commit()

        return jsonify({
            "status": "success",
            "message": "Friend added successfully"
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
    finally:
        con.close()


# Friend List
@app.route('/api/friend/list', methods=['GET'])
def friend_list():
    token = request.headers.get('token')

    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    con = get_con()
    cursor = con.cursor(DictCursor)

    try:
        cursor.execute("""
            SELECT User.UserID AS id, User.Username AS name, User.Avatar AS avatar
            FROM Friendship
            JOIN User ON Friendship.FriendID = User.UserID
            WHERE Friendship.UserID = %s
        """, (user_tokens[token],))
        friends = cursor.fetchall()

        return jsonify({
            "status": "success",
            "friends": friends
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
    finally:
        con.close()


UPLOAD_FOLDER = 'image_folder'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/upload/image', methods=['POST'])
def upload_image():

    token = request.headers['token']

    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    if 'image' not in request.files:
        return jsonify({"status": "error", "message": "No file part"}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({"status": "error", "message": "No selected file"}), 400

    if file:

        timestamp = int(time.time())
        filename = f"{timestamp}_{secure_filename(file.filename)}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        file.save(filepath)

        con = get_con()
        cursor = con.cursor(DictCursor)
        user_id = user_tokens[token]
        cursor.execute("INSERT INTO ImageUpload (UserID, UploadPath, Path) VALUES (%s, %s, %s)",
                       (user_id, filepath,  secure_filename(file.filename)))

        cursor.execute("SELECT LAST_INSERT_ID() AS fileId")
        result = cursor.fetchone()
        file_id = result['fileId']

        con.commit()
        cursor.close()
        con.close()

        return jsonify({"status": "success", "message": "Image uploaded successfully", "fileId": file_id}), 200


@app.route('/api/post/create', methods=['POST'])
def create_post():
    token = request.headers.get('token')

    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    data = request.json
    image_list = data.get('imageList', [])
    text_content = data.get('text', '')
    title = data.get('title', '')

    if not title:
        return jsonify({"status": "error", "message": "Title is required"}), 400

    con = get_con()
    cursor = con.cursor(DictCursor)

    user_id = user_tokens[token]

    cursor.execute(
        "INSERT INTO Post (UserID, TextContent, Title) VALUES (%s, %s, %s)",
        (user_id, text_content, title)
    )

    cursor.execute("SELECT LAST_INSERT_ID() AS postID")
    result = cursor.fetchone()
    post_id = result['postID']

    for file_id in image_list:
        cursor.execute(
            "INSERT INTO PostImage (PostID, FileId) VALUES (%s, %s)",
            (post_id, file_id)
        )

    con.commit()

    cursor.close()
    con.close()

    return jsonify({
        "status": "success",
        "message": "Post created successfully",
        "postID": post_id
    }), 200


@app.route('/api/post/latest', methods=['GET'])
def get_latest_posts():
    token = request.headers.get('token')

    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    con = get_con()
    cursor = con.cursor(DictCursor)

    cursor.execute(
        "SELECT Post.PostID, User.Name, Post.TextContent, Post.Title, COUNT(PostLike.PostID) AS LikeCount "
        "FROM Post "
        "JOIN User ON Post.UserID = User.UserID "
        "LEFT JOIN PostLike ON Post.PostID = PostLike.PostID "
        "GROUP BY Post.PostID "
        "ORDER BY Post.PostID DESC LIMIT 5"
    )

    posts = cursor.fetchall()

    for post in posts:
        cursor.execute(
            "SELECT ImageUpload.Path FROM PostImage "
            "JOIN ImageUpload ON PostImage.FileId = ImageUpload.FileID "
            "WHERE PostImage.PostID = %s",
            (post['PostID'],)
        )

        post['imageList'] = [f"/uploads/"+image['Path'] for image in cursor.fetchall()]

    cursor.close()
    con.close()

    return jsonify({
        "status": "success",
        "posts": posts
    }), 200

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)



@app.route('/api/plan/create', methods=['POST'])
def create_plan():
    token = request.headers.get('token')
    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    data = request.json
    user_id = user_tokens[token]

    date = data.get('date')
    time = data.get('time')
    alarm_reminder = data.get('alarmReminder', False)
    tag = data.get('tag')
    importance_level = data.get('importanceLevel')

    con = get_con()
    cursor = con.cursor(DictCursor)

    cursor.execute(
        "INSERT INTO Plan (UserID, PlanDate, PlanTime, AlarmReminder, Tag, ImportanceLevel) "
        "VALUES (%s, %s, %s, %s, %s, %s)",
        (user_id, date, time, alarm_reminder, tag, importance_level)
    )

    con.commit()


    cursor.execute("SELECT LAST_INSERT_ID() AS planID")
    result = cursor.fetchone()
    plan_id = result['planID']


    cursor.close()
    con.close()

    return jsonify({
        "status": "success",
        "message": "Plan created successfully",
        "planID": plan_id
    }), 201


@app.route('/api/plan/list', methods=['GET'])
def get_plan_list():
    token = request.headers.get('token')
    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    user_id = user_tokens[token]

    con = get_con()
    cursor = con.cursor(DictCursor)

    cursor.execute(
        "SELECT PlanID, PlanDate, PlanTime, AlarmReminder, Tag, ImportanceLevel "
        "FROM Plan WHERE UserID=%s",
        (user_id,)
    )

    plans = cursor.fetchall()

    cursor.close()
    con.close()

    response_plans = [{
        "planID": plan['PlanID'],
        "date": str(plan['PlanDate']),
        "time": str(plan['PlanTime']),
        "alarmReminder": bool(plan['AlarmReminder']),
        "tag": plan['Tag'],
        "importanceLevel": plan['ImportanceLevel']
    } for plan in plans]

    return jsonify({
        "status": "success",
        "plans": response_plans
    })


@app.route('/api/plan/delete', methods=['POST'])
def delete_plan():
    token = request.headers['token']

    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    data = request.json
    plan_id = data.get('planID')

    con = get_con()
    cursor = con.cursor(DictCursor)

    user_id = user_tokens[token]
    cursor.execute("SELECT * FROM Plan WHERE PlanID=%s AND UserID=%s", (plan_id, user_id))
    plan = cursor.fetchone()

    if plan:
        cursor.execute("DELETE FROM Plan WHERE PlanID=%s", (plan_id,))
        con.commit()
        cursor.close()
        con.close()

        return jsonify({"status": "success", "message": "Plan deleted successfully"}), 200
    else:
        return jsonify({"status": "error", "message": "Plan not found or doesn't belong to the authenticated user"}), 404


@app.route('/api/plan/update', methods=['POST'])
def update_plan():
    token = request.headers['token']

    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    data = request.json
    plan_id = data.get('planID')
    date = data.get('date')
    time = data.get('time')
    alarm_reminder = data.get('alarmReminder')
    tag = data.get('tag')
    importance_level = data.get('importanceLevel')

    con = get_con()
    cursor = con.cursor(DictCursor)

    user_id = user_tokens[token]
    cursor.execute("SELECT * FROM Plan WHERE PlanID=%s AND UserID=%s", (plan_id, user_id))
    plan = cursor.fetchone()

    if plan:
        cursor.execute("UPDATE Plan SET PlanDate=%s, PlanTime=%s, AlarmReminder=%s, Tag=%s, ImportanceLevel=%s WHERE PlanID=%s",
                       (date, time, alarm_reminder, tag, importance_level, plan_id))
        con.commit()
        cursor.close()
        con.close()

        return jsonify({"status": "success", "message": "Plan updated successfully"}), 200
    else:
        return jsonify({"status": "error", "message": "Plan not found or doesn't belong to the authenticated user"}), 404

@app.route('/api/plan/complete', methods=['POST'])
def complete_plan():
    token = request.headers['token']

    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    data = request.json
    plan_id = data.get('planID')

    con = get_con()
    cursor = con.cursor(DictCursor)

    user_id = user_tokens[token]
    cursor.execute("SELECT * FROM Plan WHERE PlanID=%s AND UserID=%s", (plan_id, user_id))
    plan = cursor.fetchone()

    if plan:
        complete_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        score = 15
        cursor.execute("INSERT INTO PlanCompleteHis (UserID, PlanID, completeTime, score) VALUES (%s, %s, %s, %s)",
                       (user_id, plan_id, complete_time, score))
        con.commit()

        cursor.close()
        con.close()

        return jsonify({"status": "success", "message": "Plan marked as completed"}), 200
    else:
        return jsonify({"status": "error", "message": "Plan not found or doesn't belong to the authenticated user"}), 404


@app.route('/api/plan/get-score', methods=['GET'])
def get_plan_score():
    token = request.headers['token']

    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    user_id = user_tokens[token]

    con = get_con()
    cursor = con.cursor(DictCursor)

    cursor.execute("SELECT COALESCE(SUM(score), 0) AS total_score FROM PlanCompleteHis WHERE UserID = %s", (user_id,))
    result = cursor.fetchone()
    total_score = result['total_score']

    cursor.close()
    con.close()

    return jsonify({
        "status": "success",
        "score": total_score
    }), 200

@app.route('/api/friend/scoreboard', methods=['GET'])
def get_friend_scoreboard():
    token = request.headers['token']

    if not authenticate_user(token):
        return jsonify({
            "status": "error",
            "message": "Authentication failed"
        }), 401

    user_id = user_tokens[token]

    con = get_con()
    cursor = con.cursor(DictCursor)

    cursor.execute("SELECT U.UserID AS friendID, U.Name, U.Avatar, COALESCE(SUM(P.score), 0) AS score "
                   "FROM User U "
                   "JOIN Friendship F ON (U.UserID = F.FriendID) "
                   "LEFT JOIN PlanCompleteHis P ON (F.FriendID = P.UserID) "
                   "WHERE F.UserID = %s "
                   "GROUP BY U.UserID, U.Name, U.Avatar "
                   "ORDER BY score DESC", (user_id,))
    results = cursor.fetchall()

    cursor.close()
    con.close()

    scoreboard = [
        {"friendID": result['friendID'], "name": result['Name'], "avatar": result['Avatar'], "score": result['score']}
        for result in results
    ]

    return jsonify({
        "status": "success",
        "rankings": scoreboard
    }), 200

if __name__ == '__main__':
    app.run(debug=True,port=443,host='0.0.0.0')



