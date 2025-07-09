const graphql = require('graphql');
const Genre = require('../../models/Genre');
// const {GenreType} = require('./GenreType');
const Studio = require('../../models/Studio');
// const {StudioType} = require('./StudioType');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = graphql;


const AnimeCardType = new GraphQLObjectType({
    name: 'AnimeCard',
    fields: () => {
        const {GenreType} = require('./GenreType');
        const {StudioType} = require('./StudioType');

        return {
            id: {type: GraphQLID},
            name: {type: GraphQLString},
            image: {type: GraphQLString},
            episodes: {type: GraphQLInt},
            runtime: {type: GraphQLString},
            trailer: {type: GraphQLString},
            description: {type: GraphQLString},
            genres: {
                type: new GraphQLList(GenreType),
                resolve(parent, args) {
                    return Genre.find({_id: { $in: parent.genres}});
                },
            },
            studio: {
                type: StudioType,
                resolve(parent, args) {
                    return Studio.findById(parent.studio);
                },
            },
        };
    },
});

module.exports = {AnimeCardType};