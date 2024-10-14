import { Router } from "express"
import { addIncome, getIncomes, deleteIncome } from "../controllers/income.controller.js"
import { addExpense, getExpenses, deleteExpense } from "../controllers/expense.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"


const router = Router()

router.use(verifyJWT)

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpenses)
    .delete('/delete-expense/:id', deleteExpense)

export default router