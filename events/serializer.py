from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomUser, Category, Event
from rest_framework.authtoken.models import Token

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password", "role")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "role")

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class EventSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    category = CategorySerializer(read_only=True)
    organizer = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Event
        fields = [
            'id',
            'organizer',
            'category_id',
            'category',
            'event_name',
            'description',
            'location',
            'date',
            'time',
            'ticket_price',
            'total_tickets',
            'available_tickets',
            'created_at',
        ]