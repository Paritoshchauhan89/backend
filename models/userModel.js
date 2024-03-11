import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true,
        trim: true       
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    googleId: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: ['author', 'admin' , 'editor' , 'reviewer' , 'quality' , 'formatting'], // Specify allowed values using an array
        default: 'author' // Default role value
    }
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

export default userModel;
