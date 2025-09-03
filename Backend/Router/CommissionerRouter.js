import express from 'express'

const CommissionerRoutes = express.Router();

CommissionerRoutes.post('/createvote', (req, res) => {
    console.log("Create vote route.")
})

export default CommissionerRoutes;