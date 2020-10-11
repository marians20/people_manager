# People Manager

## Description

People Manager is a lightweight application for people managemet.

## Technologies

### Database

To be discussed

### Backend

NodeJs

### Frontend

React

## Steps

1. Create folder people_manager
1. Enter ito new created folder with acommand prompt
1. Run following command:

    ``` npm
    npm init
    ```

    Let all parameters to default values except entry point which should be `app.js` instead of `index.js`. This can be modified later, by editing the file that will be created as effect of running the command - `package.json`.

1. Install Express running following command:

    ``` npm
    npm install express --save
    ```

1. Open the IDE within created folder and add `app.js` with following content:

    ``` javascript
    var express = require('express');
    var app = express();
    app.get('/', function (req, res) {
    res.send('Hello World!');
    });
    app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    });
    ```

1. Open <http://localhost:3000> into a browser, where 3000 is the port specified in line `app.listen(3000, function () {...`
    At this point we have a basic NodeJs Web API up an running.

## Let's add some CRUD

1. Install Body Parser package (for POST and PUT):

    ```npm
    npm install body-parser --save
    ```

2. Install nodemon. This will automatically restart development server when a change occurs in a source file.

    ```npm
    npm install nodemon --save-dev
    ```

    edit fie `package.json` like this:

    ```json
      "scripts": {
            ...
            "run": "nodemon app.js",
            ...
        },
    ```

    From now on, run server using `npm run run` instead of `node app.js`
