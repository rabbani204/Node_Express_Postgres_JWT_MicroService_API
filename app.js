const express = require('express');
const routes = require('./v1/routes');
var path = require('path');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const validator = require('express-validator');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  })
} else {
  // const validator = require('express-validator');
  //db configure
  const sequelize = require('./db/config');
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  })

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(validator());

  //cors
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'POST,PUT,DELETE,GET')
      return res.status(200).json({})
    }
    next();
  })

  app.get('/', function (req, res) {
    res.send("<h1>AQ API - Shuttle </h1>");
  });

  app.use('/api', routes);

  app.listen(3000, () => {
    console.log('listening on 3000');
  })
}