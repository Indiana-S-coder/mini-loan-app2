const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Auth",
      },
    amount: {
      type: Number,
      require: true,
    },
    terms: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    outStanding:{
      type:Number
    },
    remainingAmount:{
      type:Number
    },
    repayments: [
      {
        date: String,
        amount: Number,
        status:{
          type:String,
          default:"pending"
        }
      },
    ],
  },
  { timestamps: true }
);

const Loans = mongoose.model("Loans", loanSchema);

module.exports = Loans;