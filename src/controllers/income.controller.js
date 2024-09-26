import { Income } from "../models/income.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const addIncome = asyncHandler( async (req, res) => {
    const {title, amount, category, description, date } = req.body

    if (!title || !category || !amount || !description || !date) {
        return res.status(400).json( new ApiError(400, "All fields are required!"))
    }

    if (amount < 0 || !amount === 'number') {
        return res.status(400).json( new ApiError(400, "Amount must be Positive Number!"))
    }

    if(description.length >= 20) {
        return res.status(400).json( new ApiError(400, "Maximum Description Length 20 character!"))
    }


    const income = await Income.create({
        title,
        amount,
        category,
        description,
        date
    })

    const addedIncome = await Income.findById(income._id)

    if(!addIncome) {
        return res.status(500).json( new ApiError(500, "Server Error!"))
    }

    return res.status(201)
    .json(new ApiResponse(200, addedIncome, "Income added Successfully"))
})

const getIncomes = asyncHandler( async(req, res) => {
    const incomes = await Income.find().sort({createdAt: -1})

    if (incomes.length === 0) {
        return res.status(404).json( new ApiError(404, "No income found!"))
    }

    return res.status(200)
    .json(new ApiResponse(200, incomes, "Income Fetched Successfully"))
})

const deleteIncome = asyncHandler( async(req, res) => {
    const { id: incomeId } = req.params

    const income = await Income.findByIdAndDelete(incomeId)

    if (!income) {
        return res.status(400).json( new ApiError(400, "Invalid IncomeId"))
    }

    return res
    .status(200)
    .json( new ApiResponse(
        200,
        income,
        "Income deleted Successfully"
    ))
})

export { addIncome, getIncomes, deleteIncome }