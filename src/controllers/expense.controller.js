import { Expense } from "../models/expense.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const addExpense = asyncHandler( async (req, res) => {
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


    const expense = await Expense.create({
        title,
        amount,
        category,
        description,
        date
    })

    const addedExpense = await Expense.findById(expense._id)

    if(!addExpense) {
        return res.status(500).json( new ApiError(500, "Server Error!"))
    }

    return res.status(201)
    .json(new ApiResponse(200, addedExpense, "Expense added Successfully"))
})

const getExpenses = asyncHandler( async(req, res) => {
    const expenses = await Expense.find().sort({createdAt: -1})

    if (expenses.length === 0) {
        return res.status(404).json( new ApiError(404, "No Expense found!"))
    }

    return res.status(201)
    .json(new ApiResponse(200, expenses, "Expense Fetched Successfully"))
})

const deleteExpense = asyncHandler( async(req, res) => {
    const { id: expenseId } = req.params

    const expense = await Expense.findByIdAndDelete(expenseId)

    if (!expense) {
        return res.status(400).json( new ApiError(400, "Invalid ExpenseId"))
    }

    return res
    .status(200)
    .json( new ApiResponse(
        200,
        expense,
        "Expense deleted Successfully"
    ))
})

export { addExpense, getExpenses, deleteExpense }