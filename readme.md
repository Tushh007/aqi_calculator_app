# AQI_Calculator Application

## **Summary**

This project has following features:

1. User Authentication & Authorization implemented with JWT -> Login/Sign up
2. AQI Calculator -> AQI to Concentration Calulcations & Concentration to AQI Calulcations
3. User Calulator History
4. All AQI calculation data viewer in json format
5. Cross device responsiveness

This project has API endpoints for login, register, aqi calculator and api calculator data built in Angular i.e. single page application with material design principles and Django Rest Framework with PostgreSQL.

This application has validations for login, register as well as search and sort functionality for aqi calculator data view along with a separate json data view for all aqi_calculator data.

This web application is completely responsive.

## **Technologies used:**

1. Angular,
2. Django Rest Framework,
3. PostgreSQL
4. Docker
5. Nginx

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

1. Angular Frontend: http://localhost:4201
2. Django Rest Framework Backend: http://localhost:8000
3. Admin Dashboard: http://localhost:8000/api/v1/admin
4. Authentication endpoint: http://localhost:8000/api/v1/auth_token
5. User endpoint: http://localhost:8000/api/v1/aqi_calculator/users`
6. AQI_Calculator endpoint: http://localhost:8000/api/v1/aqi_calculator/history
7. Postgres: http://localhost:5050
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

1. Angular Frontend: http://localhost
2. Django Rest Framework: http://localhost/api
3. Admin Dashboard: http://localhost/api/v1/admin
4. Authentication endpoint: http://localhost/api/v1/auth_token
5. User endpoint: http://localhost/api/v1/aqi_calculator/users
6. AQI_Calculator endpoint: http://localhost/api/v1/aqi_calculator/history
7. Postgres: http://localhost/pgadmin
8. Login details | username: [admin@aqi.com](mailto:admin@aqi.com) | password: admin
9. Click on add a new server and fill the following details
10. General Tab || Name: database
11. Connection Tab || Host: database | username: app | password: app

## Application Screenshots

1. Login Page | dev-env: http://localhost:4201/login | prod-env: http://localhost/login
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/login-page.png)

2. Register Page | dev-env: http://localhost:4201/register | prod-env: http://localhost/register
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/register-page.png)

3. AQI JSON Page | dev-env: http://localhost:4201/json/aq-index.json | prod-env: http://localhost/json/aq-index.json
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/aqi-json-page.png)

4. Home Page | dev-env: http://localhost:4201 | prod-env: http://localhost (post logging in)
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/home-page.png)

5. Calculator Page | dev-env: http://localhost:4201/aq-index | prod-end: http://localhost/aq-index
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/calculator-page.png)

6. Calculator History Page | dev-env: http://localhost:4201/history | prod-end: http://localhost/history
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/calculator-history-page.png)

7. Admin Dashboard Page | dev-env: http://localhost:8000/api/v1/admin/ | prod-end: http://localhost/api/v1/admin
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/admin-dashboard-page.png)

8. PostgreSQL Database page | dev-env: http://localhost:5050/ | prod-end: http://localhost/pgadmin
   ![](https://github.com/Tushh007/aqi_calculator_app/blob/master/screenshots/postgres-page.png)
