import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req,res)=> {
    const {fullName, email, username, password} = await req.body;
    console.log("email: ",email);

    if (
        [fullName, email, username, password].some((field) =>
        field?.trim() === "" )
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }


    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)


    // if (!coverImageLocalPath){
    //     throw new ApiError(400, "coverImage file is required")
    // }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        password,
        coverImage: coverImage?.url || "",
        email,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" 
    )

    if(!createdUser){
        throw new ApiError(500, "Somwthing went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )



})

//first take the id password or required values from user
//then call the functions to check if it is right or wrong
//if right then send ok
//if not then send error message
//upload the file to cloudinary
// send the objec to mongodb
//remove password and refreshtoken from response
//return the response



export {registerUser}