require('dotenv').config();
const express = require('express');
const App = express();
const cors = require('cors');
const { rootRouter } = require('../routers/Root.Router');

const port = process.env.PORT || 7000;

App.use(express.json());
App.use(cors());

const { graphqlHTTP } = require('express-graphql');
const { graphqlSchema } = require("../graphql/schema");
const { graphqlResolvers } = require("../graphql/resolvers");
App.use("/graphql", graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true,
}))

App.get('/', (req, res) => {
  res.send('Wellcome PJ_TEST');
});
App.use('/api/v1', rootRouter);
App.listen(port, () => {
  console.log(`App listening on : ${port}`);
});
