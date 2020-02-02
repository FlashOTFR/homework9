const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);


function promptUser() {
return inquirer.prompt([{
    type: 'input',
    message: 'What is you github username?',
    name: 'username',
},
{
    type: 'list',
    name: 'color',
    message: 'What is your favorite color?',
    choices: ['green', 'blue', 'red', 'yellow'],
}])


}

function generateHTML(answers) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <img src='${avatar_url}'>
        <br>
        <p>${login}</p>
        <br>
        <a href=${location}>Location</a>
        <a href=${url}>Github link</a>
        <a href=${blog}>User blog</a>
        <br>
        <p>${bio}</p>
        <br>
        <p>${public_repos}</p>
        <br>
        <p>${followers}</p>
        <br>
        <p>number of github stars</p>
    </body>
    </html>`;
  }

promptUser().then(({username}) => {

    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(answers => {
        const html = generateHTML(answers);

        return writeFileAsync('index.html', html);
      })