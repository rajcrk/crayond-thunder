//Requiring the mongoose module
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
//Creating a new Schema to store the data
var UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

UserSchema.plugin(passportLocalMongoose);
//Exporting the same schema out with the name of the Schema as modelThatIsExported
module.exports = mongoose.model("User", UserSchema);