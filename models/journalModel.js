import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
    Subject: {
        type: String,
        required: true,
        trim: true       
    },
    "Journal Name": {
        type: String,
        required: true,
        trim: true       
    },
    Abbreviation:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    "Journal Image URL":{
        type:String,
        required:true,
        trim: true
    },
    "e-ISSN": {
        type: String,
        trim: true
    },
    "Impact Factor": {
        type: Number
    },
    CODEN: {
        type: String,
        trim: true
    },
    Indexing:{
        type:String,
        required:true,
        trim: true
    },
    "ICV Value": {
        type: Number
    },
    "ICV URL": {
        type: String,
        trim: true
    },
    "Started Since":{
        type:Number,
        required:true,
        trim: true
    },
    "Current Status":{
        type:String,
        required:true,
        trim: true
    },
    "Country of Origin":{
        type:String,
        required:true,
        trim: true
    },
    "Type of Access":{
        type:String,
        required:true,
        trim: true
    },
    "Issues Per Year":{
        type:String,
        required:true,
        trim: true
    },
    Frequency:{
        type:String,
        required:true,
        trim: true
    },
    "Journal DOI Number":{
        type:String,
        required:true,
        trim: true
    },
    Print: {
        type: Number
    },
    Online: {
        type: Number
    },
    "Print + Online": {
        type: Number
    },
    Publisher:{
        type:String,
        required:true,
        trim: true
    },
    Imprint:{
        type:String,
        required:true,
        trim: true
    },
    Address:{
        type:String,
        required:true,
        trim: true
    }  
}, { timestamps: true });

const Journal = mongoose.model('Journal', journalSchema);

export default Journal;
