from django.contrib.auth.models import User
from mysite.core.serializers import UserSerializer, CardSerializer, CollectionSerializer, UsersListSerializer
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer
from mysite.core.models import Card, Collection

def check_admin(user):
   return user.is_superuser

#Viewsets
class CardViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CardSerializer
    
    def get_queryset(self):
        user = self.request.user
        if check_admin(user):
            return Card.objects.all()
        return self.request.user.cards.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CollectionSerializer
    
    def get_queryset(self):
        user = self.request.user
        if check_admin(user):
            return Collection.objects.all()
        return self.request.user.collections.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UsersListSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = UsersListSerializer
    
    def get_queryset(self):
        user = self.request.user
        if check_admin(user):
            return User.objects.all()
        return self.request.user
