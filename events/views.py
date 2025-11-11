from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, get_user_model
from .serializer import RegisterSerializer, UserSerializer, EventSerializer, CategorySerializer
from rest_framework import generics, permissions
from .models import Event, Category

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"access": token.key, "username": user.username, "role": user.role}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


User = get_user_model()

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(username=user_obj.username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"access": token.key, "username": user.username, "email": user.email, "role": user.role})
        else:
            return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)
        
        
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
# 👇 Allow only authenticated users to create an event
class AddEventView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically set the organizer as the logged-in user
        serializer.save(organizer=self.request.user)
        
class IsOrganizer(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow only authenticated users with role='organizer'
        return request.user.is_authenticated and getattr(request.user, 'role', '') == 'organizer'


class AddCategoryView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = []

    def perform_create(self, serializer):
        serializer.save()
