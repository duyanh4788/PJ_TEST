require('dotenv').config();
const express = require('express');
const App = express();
const path = require('path');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { rootRouter } = require('../routers/Root.Router');

const port = process.env.PORT || 7000;

App.use(express.json());
App.use(cors());

App.use('/', (req, res) => {
  res.send('Wellcome PJ_TEST');
});

App.use('/api/v1', rootRouter);
App.listen(port, () => {
  console.log(`App listening on : ${port}`);
});
