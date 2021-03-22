# AQI_Calculator Application

## **Summary**

This project has following features:

1. User Authentication & Authorization implemented with JWT -> Login/Sign up
2. AQI Calculator -> AQI to Concentration Calulcations & Concentration to AQI Calulcations
3. User Calulator History
4. All AQI calculation data viewer in json format
5. Cross device responsiveness

This project has API endpoints for login, register, aqi calculator and api calculator data built in Angular 8 i.e. single page application with material design principles and Django Rest Framework with PostgreSQL.

This application has validations for login, register as well as search and sort functionality for aqi calculator data view along with a separate json data view for all aqi_calculator data.

This web application is completely responsive.

## **Technologies used:**

1. Python 3,
2. Angular 8,
3. Django Rest Framework,
4. PostgreSQL
5. Docker
6. Nginx

## AQI Calculation

The project uses below formulas for calculation AQI and Pollutant Concentration:
![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/aqi_formula.PNG)

The project uses the AQI Breakpoint Table shown in the below image:
![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/aqi_breakpoint_table.PNG)

source/reference: https://blue.cs.sonoma.edu/cs115/F17/proj/p1/cs115_p1.html

## **Requirements for running the project in local machine:**

1. Docker

## Development Environment

### **Running in Development environment**

1. Make sure that entrypoint.sh has line ending format of UNIX. if not please use sublime text / notepad++ and change the line endings to UNIX format and save the file.
2. For running the project: docker-compose up -d -–build
3. docker-compose exec backend python manage.py makemigrations
4. docker-compose exec backend python manage.py migrate
5. For accessing admin dashboard: docker-compose exec backend python manage.py createsuperuser
6. For checking logs &amp; troubleshooting: docker-compose logs -f
7. For closing project: docker-compose down -v
8. For running commands in the local containers: docker-compose exec [container name] [command]

### **Routes &amp; Endpoints | Development environment**

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

## Production Environment

### **Running in Production environment:**

1. Make sure that entrypoint.prod.sh has line ending format of UNIX. if not please use sublime text / notepad++ and change the line endings to UNIX format and save the file.
2. For running the project: docker-compose -f docker-compose.prod.yml up -d --build
3. docker-compose -f docker-compose exec backend python manage.py makemigrations
4. docker-compose -f docker-compose exec exec backend python manage.py migrate
5. For accessing admin dashboard: docker-compose -f docker-compose exec backend python manage.py createsuperuser
6. For checking logs &amp; troubleshooting: docker-compose -f docker-compose.prod.yml logs -f
7. For closing project: docker-compose -f docker-compose.prod.yml down -v
8. For running commands in the local containers: docker-compose -f docker-compose exec [container name] [command]

### **Routes &amp; Endpoints | Production environment**

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

## Application Screenshots

1. Login Page | dev-env: localhost:4201/login
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/login_page.PNG)

2. Register Page | dev-env: localhost:4201/register
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/register-page.PNG)

3. AQI JSON Page | dev-env: localhost:4201/json/aq-index.json
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/aqi-json-page.PNG)

4. Home Page | dev-env: localhost:4201 (post logging in)
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/home-page.PNG)

5. Calculator Page | dev-env: localhost:4201/aq-index
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/calculator-page.PNG)

6. Calculator History Page | dev-env: localhost:4201/history
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/calculator-history-page.PNG)

7. Admin Dashboard Page | dev-env: http://localhost:8000/api/v1/admin/
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/admin-dashboard-page.PNG)

8. PostgreSQL Database page | dev-env: http://localhost:5050/
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/postgres-page.PNG)
