// import * as Color from 'colors';  // extends string!
export let Color = require('colors/safe');
/*
text colors
    black
    red
    green
    yellow
    blue
    magenta
    cyan
    white
    gray
    grey

bright text colors

    brightRed
    brightGreen
    brightYellow
    brightBlue
    brightMagenta
    brightCyan
    brightWhite

background colors

    bgBlack
    bgRed
    bgGreen
    bgYellow
    bgBlue
    bgMagenta
    bgCyan
    bgWhite
    bgGray
    bgGrey

bright background colors

    bgBrightRed
    bgBrightGreen
    bgBrightYellow
    bgBrightBlue
    bgBrightMagenta
    bgBrightCyan
    bgBrightWhite

styles
    reset
    bold
    dim
    italic
    underline
    inverse
    hidden
    strikethrough

extras

    rainbow
    zebra
    america
    trap
    random
*/

Color.setTheme({
    highlight: ['bgBrightYellow', 'blue'],
    keyChoice: 'brightYellow',
    outerPunc: 'cyan',
    innerPunc: 'blue',
    attributeValue: ['brightRed', 'bold'],
    statValue: ['red'],
    subduedLine: 'gray',
    line: 'white',
    normalText: 'green',
    altText: 'magenta',
});
