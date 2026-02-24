from rest_framework.decorators import api_view
from rest_framework.response import Response
from pymongo import MongoClient
from bson import ObjectId
from bson.errors import InvalidId
from django.contrib.auth.hashers import make_password, check_password
from datetime import datetime


# MongoDB Connection
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["intern_db"]

tasks_collection = db["tasks"]
users_collection = db["users"]


# ============================
# 🔐 AUTH APIs
# ============================

@api_view(["POST"])
def register_user(request):
    try:
        data = request.data

        if not data.get("email") or not data.get("password"):
            return Response({"error": "Email and password required"}, status=400)

        if len(data.get("password")) < 6:
            return Response({"error": "Password must be at least 6 characters"}, status=400)

        existing = users_collection.find_one({"email": data.get("email")})
        if existing:
            return Response({"error": "Email already exists"}, status=400)

        users_collection.insert_one({
            "name": data.get("name"),
            "email": data.get("email"),
            "password": make_password(data.get("password"))
        })

        return Response({"message": "User registered successfully"})

    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
def login_user(request):
    try:
        data = request.data

        if not data.get("email") or not data.get("password"):
            return Response({"error": "Email and password required"}, status=400)

        user = users_collection.find_one({"email": data.get("email")})

        if not user:
            return Response({"error": "User not found"}, status=400)

        if not check_password(data.get("password"), user["password"]):
            return Response({"error": "Invalid password"}, status=400)

        return Response({
            "message": "Login successful",
            "user_id": str(user["_id"]),
            "name": user.get("name")
        })

    except Exception as e:
        return Response({"error": str(e)}, status=500)


# ============================
# 📌 CREATE TASK
# ============================

@api_view(["POST"])
def create_task(request):
    try:
        data = request.data

        if not data.get("title"):
            return Response({"error": "Title is required"}, status=400)

        if not data.get("user_id"):
            return Response({"error": "User ID is required"}, status=400)

        new_task = {
            "title": data.get("title"),
            "description": data.get("description", ""),
            "due_date": data.get("due_date", ""),
            "status": "Pending",
            "completed_at": None,
            "user_id": data.get("user_id")
        }

        result = tasks_collection.insert_one(new_task)

        return Response({
            "message": "Task created successfully",
            "id": str(result.inserted_id)
        })

    except Exception as e:
        return Response({"error": str(e)}, status=500)


# ============================
# 📌 GET TASKS
# ============================

@api_view(["GET"])
def get_tasks(request):
    try:
        user_id = request.GET.get("user_id")

        if not user_id:
            return Response({"error": "User ID is required"}, status=400)

        tasks = []
        for task in tasks_collection.find({"user_id": user_id}):
            task["_id"] = str(task["_id"])
            tasks.append(task)

        return Response(tasks)

    except Exception as e:
        return Response({"error": str(e)}, status=500)


# ============================
# 📌 UPDATE TASK
# ============================

@api_view(["PUT"])
def update_task(request, task_id):
    try:
        if not ObjectId.is_valid(task_id):
            return Response({"error": "Invalid Task ID"}, status=400)

        data = request.data

        if not data.get("title"):
            return Response({"error": "Title is required"}, status=400)

        update_data = {
            "title": data.get("title"),
            "description": data.get("description"),
            "due_date": data.get("due_date"),
            "status": data.get("status")
        }

        if data.get("status") == "Completed":
            update_data["completed_at"] = datetime.now()
        else:
            update_data["completed_at"] = None

        result = tasks_collection.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": update_data}
        )

        if result.matched_count == 0:
            return Response({"error": "Task not found"}, status=404)

        return Response({"message": "Task updated successfully"})

    except InvalidId:
        return Response({"error": "Invalid ObjectId format"}, status=400)

    except Exception as e:
        return Response({"error": str(e)}, status=500)


# ============================
# 📌 DELETE TASK
# ============================

@api_view(["DELETE"])
def delete_task(request, task_id):
    try:
        if not ObjectId.is_valid(task_id):
            return Response({"error": "Invalid Task ID"}, status=400)

        result = tasks_collection.delete_one({"_id": ObjectId(task_id)})

        if result.deleted_count == 0:
            return Response({"error": "Task not found"}, status=404)

        return Response({"message": "Task deleted successfully"})

    except Exception as e:
        return Response({"error": str(e)}, status=500)
