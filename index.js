var inquirer = require('inquirer');

const occupations = [
    {
        name: 'dissident',
        desc: `actively challenges an established system, doctrine, belief, policy, or institution (overt, non-physical)`
    },
    {
        name: 'insurgent',
        value: 'insurgent',
        short: 'insurgent',
        desc: `takes up arms in violent rebellion against authority (overt, physical)`
    },
    {
        name: 'saboteur',
        desc: `engages in deliberate action aimed at weakening or destroying an organization, machine, process, or effort (hidden, physical)`
    },
    {
        name: 'spy',
        desc: `engages in clandestine surveillance to gather intelligence (hidden, non-physical)`
    }
];

const introQuestions = [
    {
        type: 'list',
        name: 'occupation',
        message: 'What is your occupation?',
        choices: occupations
    }
];

inquirer
    .prompt( introQuestions )
    .then((answers) => {
        console.log(`answers: `, answers);
    })
    .catch((error) => {
        console.log(`There was an error: ${error}`);
    });