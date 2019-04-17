//Requiring the mongoose module
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//Creating a new Schema to store the data
var likeSchema = new mongoose.Schema({
    author: {
        type: String
    },
    postId: {
        type: String
    }
});


//Exporting the same schema out with the name of the Schema as modelThatIsExported
module.exports = mongoose.model("Like", likeSchema);