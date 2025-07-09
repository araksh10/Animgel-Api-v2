const graphql = require('graphql');
const AnimeCard = require('../../models/AnimeCard');
const {AnimeCardType} = require('./AnimeCardType');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const GenreType = new GraphQLObjectType({
    name: 'Genre',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        animes: {
            type: new GraphQLList(AnimeCardType),
            resolve(parent, args) {
                return AnimeCard.find({genres: parent.id});
            },
        },
    }),
});

module.exports = {GenreType};