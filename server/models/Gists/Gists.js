import mongoose from "mongoose";

let gistSchema = new mongoose.Schema({
    gistName :{
        type: String,
        require: true
    },
    gistDescription: {
        type: String
    },
    fileName: {
        type: String,
        require: true
    },
    fileContent: {
        type: String,
        require: true
    },
    gistType: {
        type: String,
        require: true
    },
    gistUrl: {
        type: String
    }
}, 
{
    timestamps: true
})

let gistModel = mongoose.model("gists", gistSchema, "gists");

export default gistModel