import mongoose from "mongoose";

const URL_Schema = mongoose.Schema({
    id : {type : Number},
    url : {type : String },
    shortCode : {type : String}
});

export const url_model = mongoose.model("url_shortner" , URL_Schema);