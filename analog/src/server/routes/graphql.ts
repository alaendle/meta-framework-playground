import {
    GraphQLBoolean,
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema,
} from 'graphql'

import { createYoga } from 'graphql-yoga'
import { defineEventHandler } from 'h3';

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            hello: {
                type: GraphQLString,
                resolve: () => 'world',
            },
            ping: {
                type: GraphQLBoolean,
                resolve: () => true,
            },
        }
    })
})

const yoga = createYoga({ schema, graphqlEndpoint: '/graphql' })

export default defineEventHandler((event) => {
    const { req, res } = event.node
    return yoga(req, res)
})
