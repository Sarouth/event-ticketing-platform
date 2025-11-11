from django.urls import path
from .views import RegisterView, LoginView, UserProfileView, AddEventView, AddCategoryView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("add/", AddEventView.as_view(), name="add_event"),
    path('categories/', AddCategoryView.as_view(), name='categories'),
]