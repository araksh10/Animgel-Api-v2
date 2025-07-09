const graphql = require('graphql');
const RootQuery = require('./queries');
const Mutation = require('./mutations');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});