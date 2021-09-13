# Library App Backend

[View the app](https://jelmore1674.github.io/my-library)

[Front End Repository](https://github.com/jelmore1674/my-library)

---

## About

This is the backend for the My Library app I created. The app has user
authentication using bcrypt. Stores and recalls the data from the database.

---

## Technologies

### Front End

<img src='https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/react/react-original-wordmark.svg' width='75px'>

### Back End

<img src='https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/nodejs/nodejs-original-wordmark.svg' width="75px" style="background-color: white">
<img src='https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/express/express-original-wordmark.svg' width="75px" style="background-color: white">
<img src='https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/postgresql/postgresql-original-wordmark.svg' width="75px" style="background-color: white">

## Technical Bits

---

### NodeJS

Using Node, I have 3 routes. _/register, /signin,_ and _/library-items_

The logic of the routes is put into a controller to clean up the _server.js_
file

### Database

I used knex to connect to the PostgreSQL database. I have 3 different tables for
my database.

Users

| userid | name   | email             |
| ------ | ------ | ----------------- |
| 1      | Justin | justin@justin.com |

Login

| id  | email             | hash       |
| --- | ----------------- | ---------- |
| 1   | justin@justin.com | randomhash |

Library

| id  | email             | title     | author        | pages | completed | userid |
| --- | ----------------- | --------- | ------------- | ----- | --------- | ------ |
| 1   | justin@justin.com | Test Book | Justin Elmore | 34    | true      | 1      |
