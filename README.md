<div align='center'>
  <img src='https://user-images.githubusercontent.com/67340789/159402441-d3cb387c-bae2-4737-bcb7-2abffacf5357.png' alt='logo cardoso fontes' width='320'/>
</div>


<h1 align='center'>Jam Mate - A social network for musicians</h1>

[![NPM](https://img.shields.io/apm/l/react)](https://github.com/Pribm/Sistema_Agendamento_Policlinica/blob/main/LICENSE)

## About
<p>This is a prototype of a social network for musicians and bands.</p>

# Test Application

## Local test
> After cloning this project, you must perform the following procedures :

### Inside the frontend folder:
- Use `npm i` in your terminal to install all the frontend dependencies attached in the React App.
- Use `npm start` to run the frontend application in the localhost adress.

### Inside the backend folder:
- Use `composer install` in your terminal to install all the backend dependencies attached in the Laravel App.
- Run the command `php artisan passport:install`
- Run the command `php artisan migrate`
#### .env Configurations:
- Configure your `.env` file inside your backend folder in order to configure your database, the database used in the project development was mySql, follow the instructions below:
1. Create your relational database;
2. set these lines in your .env file:
```
DB_CONNECTION=<your_database_connection>
DB_HOST=<your localhost adress>
DB_PORT=<your localhost port>
DB_DATABASE=<the name of your database>
DB_USERNAME=<your database username>
DB_PASSWORD=<your database password>
```

3. to test the login recuperation, you must configure your .env email settings:
```
MAIL_MAILER=smtp
MAIL_HOST=<your email host adress>
MAIL_PORT=<your email host port>
MAIL_USERNAME=<your email host name>
MAIL_PASSWORD=<your email host password>
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=<your app email adress>
MAIL_FROM_NAME="${APP_NAME}"
```

4. to configure your OAuth server, you must add these lines to your .env file:
```
PASSPORT_CLIENT_ID=<your oauth passord client id>
PASSPORT_CLIENT_SECRET=<your oauth client secret>
```

5. The genres selection was seeded using a free Spotify genres API, you must include the token in your .env order to seed your database:
```
SPOTIFY_API_TOKEN=<get your spotify api token and set here>
```

5.1. As some seeded data came from webscrapping procedures, it is possible that the data sources are down or the links need updating. The files with the logic that contain the data obtained from the web are in the path `app/Controllers/WebScrappers`

 6. Run `php artisan seed` to seed your database.

## Online test
>The app backend was hosted using a free plan on Heroku, some requests may take a while.
> The frontend was hosted using the github pages, you can access the application through the following link: https://pribm.github.io/Jam_Mate/


# Used Technologies

## Backend
- PHP
- Laravel
- MySql
> The backend was developed using the Laravel Framework, and the database used was mySql.

## Frontend
- React
- Material Ui
- Bootstrap

> The requests to the backend was made with axios client http

## Author

Paulo Vinícius Ribeiro Monteiro



