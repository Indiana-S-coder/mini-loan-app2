const router = require("express").Router();
const {
    createLoan,
    getLoans,
    repayLoan,
    updateLoan,
} = require("../controllers/loanController.js");
const { verifyLogin } = require("../util/verify.js");

router.get("/", verifyLogin, getLoans);
router.post("/createLoan", verifyLogin, createLoan);
router.patch("/update-status/", verifyLogin, updateLoan);
router.patch("/repay/", verifyLogin, repayLoan);

module.exports = router;