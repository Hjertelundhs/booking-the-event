const express = require('express');
const boyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const events = [];

const PORT = process.env.POST || 3000;

app.use(boyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type RootQuery {
        events: [Event!]!
    }
    type RootMutation {
        createEvent(eventInput: EventInput): Event
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: args => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date
        };
        events.push(event);
        return event;
      }
    },
    graphiql: true
  })
);

app.listen(PORT);
