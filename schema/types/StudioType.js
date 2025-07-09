const graphql = require('graphql');
const AnimeCard = require("../../models/AnimeCard");
const {AnimeCardType} = require("./AnimeCardType");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;

const StudioType = new GraphQLObjectType({
    name: 'Studio',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        logo: {type: GraphQLString},
        details: {type: GraphQLString},
        animes: {
            type: new GraphQLList(AnimeCardType),
            resolve(parent, args) {
                return AnimeCard.find({ studio: parent.id });
            },
        },
    }),
});

module.exports = {StudioType};