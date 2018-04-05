'use strict'

const express = require('express')
const app     = express()
const msg     = require('gulp-messenger')
const chalk   = require('chalk')
const Twig    = require('twig')
const _       = require('lodash')
const fs = require('fs');
const solc = require('solc');
var Web3 = require('web3');
var web3 = new Web3();
var twig = Twig.twig;

// This section is optional and used to configure twig.
app.set('twig options', {
    strict_variables: false
});

app.set('port', (process.env.PORT || 3000))
app.use(express.static(__dirname + '/public'))  // static directory

// Custom routes (not convered by static files, uses twig template engine)
app.get('/', (req, res) => {
  res.render('index.twig', {
    firstName: 'Yashwanth',
    lastName: 'Reddy'
  });
});

app.get('/yash', (req, res) => {
  res.render('index.twig', {
    firstName: 'Yashwanth',
    lastName: 'Venati'
  });
});

app.get('/yash12', (req, res) => {

  // Compile the source code
  const input = fs.readFileSync('contracts/MLComp.sol');
  console.log("input done...")
  const output = solc.compile(input.toString(), 1);
  console.log("output done...")
  const bytecode = output.contracts[':MLComp'].bytecode;
  console.log("bytecode done...")
  console.log(typeof(bytecode))
  const abi = JSON.parse(output.contracts[':MLComp'].interface);
  console.log("ABI done...")
  console.log(abi)

  res.render('index.twig', {
    firstName: 'Yashwanth',
    lastName: 'Reddy',
    abi: abi,
    bytecode: bytecode
  });
});
// lets startup this puppy
app.listen(app.get('port'), () => {
  msg.log('\n')
  console.log(chalk.cyan('Server Started ' + new Date()));
  msg.log('\n')
  const serverInfo = chalk.yellow(`http://localhost:${app.get('port')}`);
  msg.success('=', _.pad(`Application Running On: ${serverInfo}`, 80), '=')
})
