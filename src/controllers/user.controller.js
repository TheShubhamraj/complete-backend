import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"

import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import {User} from "../models/user.model.js"
const registerUser = asyncHandler(async(req, res) =>{
    //1.get user detail from frontend
    //2.validation-not empty 
    //3.check if user already exits:username,email
    //4.check for images,check for avatar
    // 5. upload them to cloudinary,avatar 
    //create a user object-create entry in db

    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullname,email,username,password} = req.body
    console.log("email:",email)

    // if (fullname ==="") {
    //     throw new ApiError(400,"fullname is required")
    // }
    if ([fullname,email,username,password].some(()=>field?.trim() ==="")) {
        throw new ApiError(400,"All fields are required")
    }

    const existedUser =  User.findOne({
        $or:[{username},{email}]
    })
    if (existedUser) {
        throw new ApiError(409,"User with email or username already exists")
    }

   const avatarLocalPath= req.files?.avatar[0]?.path;

  const coverImageLocalPath= req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400,"Avatar image is required")
  }
 const avatar=await uploadOnCloudinary(avatarLocalPath)

 const converImage = await uploadOnCloudinary(coverImageLocalPath)

 if (!avatar) {
    throw new ApiError(400,"Avatar file is requied");

 }
const user = await User.create({
    fullname,
    avatar:avatar.url,
    converImage:coverImage?.url ||"",
    email,
    password,
    username:username.toLowerCase()
 })

const createdUser =await User.findById(user._id).select(
    "-password -refreshToken"
)

if (!createdUser) {
    throw new ApiError(500,"something went wrong while registering the user")
}

    return res.status(201).json(new ApiResponse(200,createdUser,"User registered successfully")
)
    


})

export {
    registerUser,
}

