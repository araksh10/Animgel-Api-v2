const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animeCardSchema = new Schema({
    name: String,
    image: String,
    episodes: Number,
    studio: {type: Schema.Types.ObjectId, ref: "Studio"},
    genres: [{type: Schema.Types.ObjectId, ref: "Genre"}],
    runtime: String,
    trailer: String,
    description: String,
});

module.exports = mongoose.model("AnimeCard", animeCardSchema);