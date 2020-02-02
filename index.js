const inquirer = require('inquirer');
const axios = require('axios');
const fs = require('fs');
const util = require('util');

inquirer.prompt([{
    type: 'input',
    message: 'What is you github username?',
    name: 'username',
},
{
    type: 'list',
    name: 'color',
    message: 'What is your favorite color?',
    choices: ['green', 'blue', 'red', 'yellow'],
}]).then(({ username }) => {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(res => {
        console.log(res);
    })
})




