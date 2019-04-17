//Requiring the mongoose module
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//Creating a new Schema to store the data
var postSchema = new mongoose.Schema({
    author: {
        type: String
    },
    content: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    image: { 
        type: String 
    },
    date: { 
        type: Date, default: Date.now 
    }
});


//Exporting the same schema out with the name of the Schema as modelThatIsExported
module.exports = mongoose.model("Post", postSchema);