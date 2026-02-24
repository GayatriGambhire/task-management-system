from django.contrib import admin
from django.urls import path

# Import your custom APIs from tasks.views
from tasks.views import (
    register_user,
    login_user,
    create_task,
    get_tasks,
    update_task,
    delete_task,
)

# Import JWT views separately
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('admin/', admin.site.urls),

    # 🔐 Custom Auth APIs (Mongo)
    path('api/register/', register_user),
    path('api/login/', login_user),

    # 📌 Task APIs
    path('api/tasks/', get_tasks),
    path('api/tasks/create/', create_task),
    path('api/tasks/update/<str:task_id>/', update_task),
    path('api/tasks/delete/<str:task_id>/', delete_task),

    # 🔐 JWT APIs
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

