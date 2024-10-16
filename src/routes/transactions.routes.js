import { Router } from "express"
import { addIncome, getIncomes, deleteIncome, updateIncome } from "../controllers/income.controller.js"
import { addExpense, getExpenses, deleteExpense, updateExpense } from "../controllers/expense.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"


const router = Router()

router.use(verifyJWT)

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .patch('/edit-income/:id', updateIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpenses)
    .delete('/delete-expense/:id', deleteExpense)
    .patch("/edit-expense/:id", updateExpense)

export default router