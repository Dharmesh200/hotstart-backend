
const { model, Schema } = require("mongoose");

const MovieSchema = new Schema({
    title: {
        type: String,
    },
    genere: {
        type: String,
    },
    releasedate: {
        type: Number,
    },
    // poster:{
    //     type:[""]
    // },
    // trailer:{
    //     type:[""]
    // },
    media: {
        type: [''],
    }
},
    { timestamps: true, }
)

module.exports = model("movie", MovieSchema)