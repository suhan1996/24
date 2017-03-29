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
Link.plugin(URLSlugs('title'));
mongoose.model('Comment', Comment);
mongoose.model('Link', Link);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/hw05');