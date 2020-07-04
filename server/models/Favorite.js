const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const moment = require("moment");

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    movieImage: {
        type: String
    },
    movieRunTime: {
        type: String
    }
})



const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }