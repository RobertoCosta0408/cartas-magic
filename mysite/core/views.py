from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.decorators import login_required, user_passes_test
from mysite.core.forms import SignUpForm
from mysite.core.serializers import UserSerializer, CardSerializer, CollectionSerializer
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer
from mysite.core.models import Card, Collection

# Create your views here.
@login_required
def home(request):
    return render(request, 'home.html')

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.first_name = form.cleaned_data.get('first_name')
            user.last_name = form.cleaned_data.get('last_name')
            user.save()
            return redirect('home')
    else:
        form = SignUpForm()
    
    context = {'form': form}
    return render(request, 'registration/signup.html', context)

def check_admin(user):
   return user.is_superuser

@user_passes_test(check_admin)
@login_required
def users_registered(request):
    users = User.objects.all()
    context = {'users': users}
    return render(request, 'users.html', context)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserList(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'edit_user.html'
    serializer_class = UserSerializer

    def get(self, request, pk):
        user = User.objects.get(pk=pk)
        print(user)
        print(user.pk)
        return Response({'user': user})

#Viewsets
class CardViewSet(viewsets.ModelViewSet):
    #queryset = Card.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = CardSerializer
    
    def get_queryset(self):
        user = self.request.user
        if check_admin(user):
            return Card.objects.all()
        return self.request.user.cards.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    
    #permission_classes = [permissions.AllowAny]

class CollectionViewSet(viewsets.ModelViewSet):
    
    queryset = Collection.objects.all()
    
    permission_classes = [permissions.IsAuthenticated]
    #permission_classes = [permissions.AllowAny]

    serializer_class = CollectionSerializer
    
    def get_queryset(self):
        user = self.request.user
        if check_admin(user):
            return Collection.objects.all()
        return self.request.user.collections.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    