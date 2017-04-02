/**
 * Created by Suhan on 28/03/2017.
 */

var mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
// my schema goes here!
const Comment = new mongoose.Schema({
    text: String,
    user: String
});
const Results = new mongoose.Schema({
    username: String,
    time: Number,
    round_time : {}
});

const Combinations = new mongoose.Schema({
    combination: [],
    average_time: Number
});

//URLSlugs('<user>');
Results.plugin(URLSlugs('title'));
mongoose.model('Comment', Comment);
mongoose.model('Results', Results);
mongoose.model('Combinations', Combinations);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/final');