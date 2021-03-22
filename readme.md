# AQI_Calculator Application

## **Summary**

This project has API endpoints for login, register, aqi_calculator data built in Angular 8 i.e. single page application with material design principals and Django Rest Framework with PostgreSQL.

This application has validations for login, register as well as search and sort functionality for aqi_calculator data view along with a separate json data view for all aqi_calculator data.

This web application is completely responsive.

## **Technologies used:**

1. Python 3,
2. Angular 8,
3. Django Rest Framework,
4. PostgreSQL
6. Docker
7. Nginx

## **Requirements for running the project in local machine:**

1. Docker

## **Running project on local machine:**

1. ### **Running in Development environment**
1. For running the project: docker-compose up -d –build
1. For checking logs &amp; troubleshooting: docker-compose logs -f
1. For closing project: docker-compose down -v
1. For running commands in the local containers:
1. docker-compose exec [container name] [command]
1. docker-compose exec backend python manage.py createsuperuser
1. docker-compose exec backend python manage.py makemigrations
1. docker-compose exec backend python manage.py migrate
1. ### **Running in Production environment:**
1. For running the project: docker-compose -f docker-compose.prod.yml up -d --build
1. For checking logs &amp; troubleshooting: docker-compose -f docker-compose.prod.yml logs -f
1. For closing project: docker-compose -f docker-compose.prod.yml down -v
1. For running commands in the local containers:
1. docker-compose -f docker-compose exec [container name] [command]
1. docker-compose -f docker-compose exec backend python manage.py createsuperuser
1. docker-compose -f docker-compose exec backend python manage.py makemigrations
1. docker-compose -f docker-compose exec exec backend python manage.py migrate

## **Routes &amp; Endpoints | Development environment**

1. Angular Frontend: localhost:4201
2. Django Rest Framework Backend: localhost:8000
3. Admin Dashboard: localhost:8000/api/v1/admin
4. Authentication endpoint: localhost:8000/api/v1/auth_token
5. User endpoint: localhost:8000/api/v1/aqi_calculator/users`
6. AQI_Calculator endpoint: localhost:8000/api/v1/aqi_calculator/history
7. Postgres: localhost:5050
8. Login details | username: [admin@aqi.com](mailto:admin@aqi.com) | password: admin
9. Click on add a new server and fill the following details
10. General Tab || Name: database
11. Connection Tab || Host: database | username: app | password: app

## **Routes &amp; Endpoints | Production environment**

1. Angular Frontend: localhost
2. Django Rest Framework: localhost/api
3. Admin Dashboard: localhost/api/v1/admin
4. Authentication endpoint: localhost/api/v1/auth_token
5. User endpoint: localhost/api/v1/aqi_calculator/users
6. AQI_Calculator endpoint: localhost/api/v1/aqi_calculator/history
7. Postgres: localhost/pgadmin
8. Login details | username: [admin@aqi.com](mailto:admin@aqi.com) | password: admin
9. Click on add a new server and fill the following details
10. General Tab || Name: database
11. Connection Tab || Host: database | username: app | password: app
