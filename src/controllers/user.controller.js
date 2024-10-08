import { User } from "../models/user.model"
import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import { asyncHandler } from "../utils/asyncHandler"

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({validateBeforeSave: false})

        return { accessToken, refreshToken }

    } catch (error) {
        new ApiError(500, "Error while generating access and refresh token")
    }
}

const options = {
    httpOnly: true,
    secure: true,
}

const registerUser = asyncHandler( async (req, res) => {
    const { fullName, email, password, username } = req.body

    if ([fullName, email, password, username].some(field => field?.trim() === "")) {
        new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        new ApiError(409, "User with username or email already exists")
    }

    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        new ApiError(500, "Server error! Failed to register user")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {})

export {
    registerUser
}