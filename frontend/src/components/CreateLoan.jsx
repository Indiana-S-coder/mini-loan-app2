import { useContext, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateLoan = () => {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!amount || !term) throw "Fill all details!";
      await axios.post(
        "http://localhost:4000/api/v1/loans/create",
        { amount:amount, terms: term },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Loan creation successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(`Can't create the loan!\nError: ${error}`);
    }
  };

  return (
    <div className="flex justify-center mt-28">
      <div className="flex flex-col items-center justify-center bg-slate-50 rounded-lg p-9 shadow-md">
        <h2 className="font-bold text-2xl text-slate-600 pb-10">Apply for Loan</h2>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="flex flex-col items-start">
            <label className="block text-sm font-medium text-gray-600">
              Loan Amount:
            </label>
            <input
              placeholder="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="block text-sm font-medium text-gray-600">
              Loan Term(in weeks):
            </label>
            <input
            placeholder="Term"
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-red-500"
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLoan;