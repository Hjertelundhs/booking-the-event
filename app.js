const express = require('express');
const boyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const PORT = process.env.POST || 3000;

app.use(boyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`

    type RootQuery {
        events: [String!]!
    }
    type RootMutation {
        createEvent(name: String): String
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`),
    rootValue: {
      events: () => {
        return ['Romatic cooking', 'Sailing', 'All night coding'];
      },
      createEvent: args => {
        const eventName = args.name;
        return eventName;
      }
    },
    graphiql: true
  })
);

app.listen(PORT);
