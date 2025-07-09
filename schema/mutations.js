const graphql = require('graphql');
const AnimeCard = require('../models/AnimeCard');
const {AnimeCardType} = require('./types/AnimeCardType');
const Genre = require('../models/Genre');
const {GenreType} = require('./types/GenreType');
const Studio = require('../models/Studio');
const {StudioType} = require('./types/StudioType');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {

        //Adding stuff
        addAnime: {
            type: AnimeCardType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                image: {type: GraphQLString},
                episodes: {type: GraphQLInt},
                runtime: {type: GraphQLString},
                trailer: {type: GraphQLString},
                description: {type: GraphQLString},
                genres: {type: new GraphQLList(GraphQLID)},
                studio: {type: GraphQLID},
            },
            resolve(parent, args) {
                const anime = new AnimeCard({
                    ...args,
                });
                return anime.save();
            },
        },
        addGenre: {
            type: GenreType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                const genre = new Genre({name: args.name});
                return genre.save();
            },
        },
        addStudio: {
            type: StudioType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                logo: {type: GraphQLString},
                details: {type: GraphQLString},
            },
            resolve(parent, args) {
                const studio = new Studio({...args});
                return studio.save();
            },
        },

        //destroying stuff
        deleteAnime: {
            type: AnimeCardType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return AnimeCard.findByIdAndDelete(args.id);
            },
        },

        //Update stuff
        updateAnime: {
            type: AnimeCardType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                image: {type: GraphQLString},
                episodes: {type: GraphQLInt},
                runtime: {type: GraphQLString},
                trailer: {type: GraphQLString},
                description: {type: GraphQLString},
                genres: {type: new GraphQLList(GraphQLID)},
                studio: {type: GraphQLID}, 
            },
            async resolve(parent, args) {
                const updateData = {...args};
                Object.keys(updateData).forEach((key) => {
                    if(updateData[key] === undefined) delete updateData[key];
                });
                return AnimeCard.findByIdAndUpdate(args.id, updateData, {new: true}).populate("genres");
            },
        },
    },
});

module.exports = Mutation;