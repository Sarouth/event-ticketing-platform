1. creating virtual environment: python -m venv venve
activate virtual environment: .\venv\Scripts\Activate.ps1

2. Install Django, Django restframework: pip install djano (cerify: django-admin --version)
pip install django djangorestframework (verify: python -m djano --version, pip show djanorestframework)

3. create djano project: (django-admin startproject ticketing_project .)
create new app: python manage.py startapp events

4. Add events, rest_framework inside ticketing_project/ setting.py --> INSTALLED_APPS

5. install musqlclient: pip install mysqlclient
(verify: pip show mysqlclient)

6. create database in MySql workbench
Add username, password, databse name inside ticketing_project/ setting.py --> DATABASE

7. create serialer.py in events app

8. create customuser: setting.py --> below INSTALLED_APPS (AUTH_USER_MODEL = 'events.CustomUser')

9. create models in models.py

Migration: 
python manage.py makemigrations, 
python manage.py migrate

verify: check in Mysql workbench the default tables of djano are visible or not

10. create superuser function and create super user: python manage.py createsuperuser, python manage.py runserver

11. create a urls.py file in events app
add : 
from django.urls import path
from . import views

urlpatterns = [
    # add more paths as needed
]

12. Add events.urls inside ticketing_project.urls: path('api/events/', include('events.urls')),

13. update events/admin.py

14. 