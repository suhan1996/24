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

//const Score = new mongoose.Schema({
//    username: String,
//    time: Number
//});
const Result = new mongoose.Schema({
    username: String,
    time: String,
   // solve:Number,
    city : String
});

const Combination = new mongoose.Schema({
    combination: String,
    solution: String,
    times: Number,
    solve:Number
});

//URLSlugs('<user>');
Combination.plugin(URLSlugs('combination'));
mongoose.model('Comment', Comment);
mongoose.model('Result', Result);
mongoose.model('Combination', Combination);

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost/final');

// is the environment variable, NODE_ENV, set to PRODUCTION?
if (process.env.NODE_ENV === 'PRODUCTION') {
    // if we're in PRODUCTION mode, then read the configration from a file
    // use blocking file io to do this...
    var fs = require('fs');
    var path = require('path');
    var fn = path.join(__dirname, 'config.json');
    var data = fs.readFileSync(fn);

    // our configuration file will be in json, so parse it and set the
    // conenction string appropriately!
    var conf = JSON.parse(data);
    var dbconf = conf.dbconf;
} else {
    // if we're not in PRODUCTION mode, then use
    dbconf = 'mongodb://localhost/final';
    console.log("else",dbconf)
}
console.log("final",dbconf)

mongoose.connect(dbconf)