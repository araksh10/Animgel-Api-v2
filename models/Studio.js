const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studioSchema = new Schema({
    name: String,
    logo: String,
    details: String,
    animes: [{type: Schema.Types.ObjectId, ref: 'AnimeCard'}],
});

module.exports = mongoose.model("Studio", studioSchema);