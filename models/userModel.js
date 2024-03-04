import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required:true,
        trim:true       
    },
    email:{
        type:String,
        required:true,
        unique:true,
        
    },
    password:{
        type:String,
        required:true,
    },
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: Number,
        default: 0
      },
},
{timestamps:true}
);


const userModel = mongoose.model('User', userSchema);

export default userModel;