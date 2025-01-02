import mongoose from "mongoose";

let repoSchema = new mongoose.Schema({
    repoName: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    keywords: [
        {type: String}
    ],
    repoType: {
        type: String,
        require: true
    },
    branch : {
        type: String,
        require: true
    },
    url: {
        type: String
    }
}, 
{
    timestamps: true
})

let reposModel = mongoose.model("repos", repoSchema, "repos");

export default reposModel;