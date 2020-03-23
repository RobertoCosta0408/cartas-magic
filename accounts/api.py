from django.shortcuts import render

from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer#, UsersListSerializer
from django.contrib.auth.models import User

#register api
class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, 
                                context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


#login api
class LoginApi(generics.GenericAPIView):
    serializer_class = LoginSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, 
                                context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })
    
#get user api
class UserApi(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated, 
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

"""
class UsersListApi(viewsets.ModelViewSet):
    
    permission_classes = [
        permissions.IsAuthenticated, 
        permissions.IsAdminUser
    ]
    queryset = User.objects.all()
    serializer_class = UsersListSerializer(queryset, many=True)

    def get_queryset(self):
        user = self.request.user
        if check_admin(user):
            return User.objects.all()
        return self.request.user

    #queryset = User.objects.all()
"""