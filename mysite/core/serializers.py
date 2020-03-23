from django.contrib.auth.models import User, Group
from rest_framework import serializers
from mysite.core.models import Card, Collection


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'first_name', 'last_name']

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        
        #fields = '__all__'
        fields = ['id', 'name', 'number', 'description', 'collection_name', 'user', 'collection']

    collection_name = serializers.SerializerMethodField('get_collection_name')

    def get_collection_name(self, obj):
        return obj.collection.name

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'
        #fields = ['name']

#user list serializer
class UsersListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_superuser')