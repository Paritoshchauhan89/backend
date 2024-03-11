import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from 'jsonwebtoken';

// Register using manual form
export const registerController = async(req,res)=>{
  try {
      const {FullName, email,password} = req.body 
      // validations
  if(!FullName || !email || !password ){
  return  res.status(202).send({
      success:true,
      message:"Please fill all fields"
    })
  }
      // check user
      const exisitingUser = await userModel.findOne({email})
     // exisiting user
if (exisitingUser){
  return res.status(201).send({
      success:true,
      message:'Already Register please login',
  })
}
//  register  user
const hashedPassword = await hashPassword(password)
// save
const user = await  new userModel({FullName,email,password:hashedPassword}).save()
res.status(200).send({
  success:true,
  message:"User Register Successfully",
  user,
});

  } catch (error) {
      console.log(error)
      res.status(500).send({
          success:false,
          message:'Error in Registration',
          error
      })
      
  }

};

// login

export const logincontroller = async(req,res)=>{

    try {
        const {email,password} = req.body
        // validations
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        // check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }
        // token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",});
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
              _id: user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
        
    }

};

// All users
export const getAllAccounts = async (req,res)=>{


    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount:users.length,
            success:true,
            message:'all accounts data',
            users,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in get All users",
            error,
        })
        
    }
};


export const getaccountByIdController =async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).send({
                success:false,
                message:'user not found with this is ',

            });
        }
        return res.status(200).send({
            success:true,
            message:'fetch single user',
            user,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'error while getting single user',
            error,
        });
        
    }
};

export const updateAccountController = async (req, res) => {
    try {
      const userId = req.params.id;
      const { fullName, email, password } = req.body;
  
      // Validate if at least one field to update is provided
      if (!fullName && !email && !password) {
        return res.status(400).send({
          success: false,
          message: "At least one field (name, email, or password) is required for update.",
        });
      }
  
      // Find the user by ID
      const user = await userModel.findById(userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      // Update user fields if provided
      if (fullName) {
        user.fullName = fullName;
      }
  
      if (email) {
        user.email = email;
      }
  
      if (password) {
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
      }
  
      // Save the updated user
      await user.save();
  
      return res.status(200).send({
        success: true,
        message: "User updated successfully",
        user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "Error while updating user",
        error,
      });
    }
  };
  

export const deleteAccountController = async (req, res) => {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id);
      
      // Check if the user exists
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      // If the user has a reference to another user
      if (user.user) {
        // Remove the user from the referenced user's 'users' array
        await userModel.findByIdAndUpdate(user.user, {
          $pull: { users: user._id },
        });
      }
  
      return res.status(200).send({
        success: true,
        message: "User Deleted!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "Error while deleting user",
        error,
      });
    }
  };


 