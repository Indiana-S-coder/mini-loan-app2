const router = require("express").Router();
const {
    createLoan,
    getLoans,
    repayLoan,
    updateLoan,
} = require("../controllers/loans.js");
const { verifyLogin } = require("../util/verify.js");

router.get("/", verifyLogin, getLoans);
router.post("/create", verifyLogin, createLoan);
router.patch("/update-status/", verifyLogin, updateLoan);
router.patch("/repay/", verifyLogin, repayLoan);

modules.export = router;