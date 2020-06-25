from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from mysite.core import views


router = routers.DefaultRouter()
router.register(r'auth/users', views.UsersListSet, 'users_list')
router.register(r'cards', views.CardViewSet, 'cards')
router.register(r'collections', views.CollectionViewSet)

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('accounts.urls')),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
]
