const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    name: String,
    animes: [{type: Schema.Types.ObjectId, ref: 'AnimeCard'}],
});

module.exports = mongoose.model("Genre", genreSchema);