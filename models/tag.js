import mongoose, { Schema } from "mongoose";

//definicion del esquema de los tag
const tagSchema = new Schema({
    tagname: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    }
}, { 
    collection: 'tags',
    timestamps: true 
});

const Tag = mongoose.model('Tag', tagSchema)

export default Tag