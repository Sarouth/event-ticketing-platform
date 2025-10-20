from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, role='user', **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, password=None, **extra_fields):
        # This method is required for `createsuperuser` command
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        user = self.create_user(
            username=username,
            email=email,
            password=password,
            role='superuser',  # Hidden role
            **extra_fields
        )
        return user

class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(
        max_length=20,
        choices=[
            ('organizer', 'Organizer'),
            ('user', 'User'),
        ],
        default='user',
    )

    # Needed for superuser/admin compatibility
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    # Permissions methods for admin
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    
class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Event(models.Model):
    organizer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="organized_events")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    event_name = models.CharField(max_length=200)
    description = models.TextField()  
    location = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField()
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2) 
    total_tickets = models.PositiveIntegerField() 
    available_tickets = models.PositiveIntegerField()  
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return self.event_name  
