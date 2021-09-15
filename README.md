# Library App

## LINKS

[Visit Live Site](https://mylibrary.justinelmore.dev)

[Front End Repository](https://github.com/jelmore1674/MyLibraryReactFullStack/tree/main/my-library)

[Backend Repository](https://github.com/jelmore1674/MyLibraryReactFullStack/tree/main/mylibrary-backend)

## About

This is a updated library app of my previous one. This app is packed full of
features. User authentication, storage, and just a new spin on a previous app.

<img src='./my-library/public/mylibrary.png'>

## Technologies

### Docker

<img src='https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-plain.svg' width='75px' style="background-color: white">

The Entire App is containerized in a docker container. Using docker I was able
to create a easy to deploy full stack web application.

### Nginx

<img src='https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg' width='75px' style="background-color: white">

Within the Docker container I am using NGINX to proxy the services so calling
the api's in the app is made easy.

### Front End

<img src='https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/react/react-original-wordmark.svg' width='75px' style="background-color: white">

The Front End is build using React. While using react, I am also using Bootstrap
5 for the styles.

### Back End

<img src='https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/nodejs/nodejs-original-wordmark.svg' width="75px" style="background-color: white">
<img src='https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/express/express-original-wordmark.svg' width="75px" style="background-color: white">
<img src='https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/postgresql/postgresql-original-wordmark.svg' width="75px" style="background-color: white">

The backend is built using Express, Postgres, and Node.js. When building the
backend I am using bcrypt to secure user passwords. During the build of the
backend, I followed the practices of the MVC pattern, creating Models,
Controllers, and Routes. I also incorporated JWT that will store the user
currently logged in to session storage. So you can refresh and stay logged in. I
use redis to store the tokens that were created.
