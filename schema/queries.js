const graphql = require('graphql');
const AnimeCard = require('../models/AnimeCard');
const {AnimeCardType} = require('./types/AnimeCardType');
const Genre = require('../models/Genre');
const {GenreType} = require('./types/GenreType');
const Studio = require('../models/Studio');
const {StudioType} = require('./types/StudioType');

const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        animes: {
            type: new GraphQLList(AnimeCardType),
            resolve(parent, args) {
                return AnimeCard.find();
            },
        },
        anime: {
            type: AnimeCardType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                return AnimeCard.findById(args.id);
            },
        },
        animeByName: {
            type: new GraphQLList(AnimeCardType),
            args: {name: {type: GraphQLString}},
            resolve(parent, args) {
                return AnimeCard.find({name: {$regex: args.name, $options: 'i'}});
            },
        },
        genres: {
            type: new GraphQLList(GenreType),
            resolve(parent, args) {
                return Genre.find();
            },
        },
        genre: {
            type: GenreType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                return Genre.findById(args.id);
            },
        },
        studios: {
            type: new GraphQLList(StudioType),
            resolve(parent, args) {
                return Studio.find();
            },
        },
        studio: {
            type: StudioType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                return Studio.findById(args.id);
            },
        },
     },
});

module.exports = RootQuery;