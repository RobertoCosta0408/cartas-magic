from django.urls import path, include
from .api import RegisterApi, LoginApi, UserApi#, UsersListApi
from knox import views as knox_views
"""
from rest_framework import routers
router = routers.DefaultRouter()
router.register(r'auth/users', UsersListApi)
"""
urlpatterns = [
    path('auth', include('knox.urls')),
    path('auth/register', RegisterApi.as_view()),
    path('auth/login', LoginApi.as_view()),
    path('auth/user', UserApi.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    #path('auth/users_list', UsersListApi.as_view()),
]