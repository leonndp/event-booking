const express = require('express')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.use('/graphql', graphqlHttp({
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
            return ['Romantic Cooking', 'Sailing', 'All-Night Coding']
        },
        createEvent: ({ name }) => {
            const eventName = name
            return eventName
        }
    },
    graphiql: true
}))

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`)
})