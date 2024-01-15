import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loans, setLoans] = useState([]);
  const { user, token, setLoggedIn, setUser } = useContext(AuthContext);
  const [showDetails, updateShowDetails] = useState("-1");
  const navigate = useNavigate();

  const fetchLoans = async () => {
    console.log("Fetching loans..."); 

    try {
      const loanData = await axios.get(
        "https://mini-loan-app2.vercel.app/api/v1/loans",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoans(loanData.data.Loans);
      console.log(loanData.data.Loans);
    } catch (err) {
      console.error(err);
      alert(`Can't fetch the loans\nError: ${err}`);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `https://mini-loan-app2.vercel.app/api/v1/loans/update-status/`,
        { id, status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Updated the loan status");
      window.location.reload(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(`Can't update status!\nError:${error}`);
    }
  };

  const updatePayment = async (loanId, installmentId) => {
    try {
      await axios.patch(
        `https://mini-loan-app2.vercel.app/api/v1/loans/repay/`,
        { loanId, installmentId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Paid the installment");
      window.location.reload(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(`Can't pay installment!\nError:${error}`);
    }
  };

  const handleLogout = () => {
    // Clear local storage and navigate to login page
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {user && user.role === "admin" ? (
        <div>
          <h3 className="text-2xl font-bold">Admin</h3>
        </div>
      ) : (
        <div>
          {user && <h3 className="text-2xl text-blue-500 font-bold"> Name: {user.name}</h3>}
          {user && <h3 className="text-2xl font-bold"> Email: {user.email}</h3>}
        </div>
      )}

      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleLogout}
      >
        Logout
      </button>

      {loans && loans.length ? (
        <>
          <table className="min-w-full bg-white border border-gray-300 mt-4 ">
            <thead className="border-2">
              <tr className="">
                {user.role === "admin" && <th className="border-x-2">User Id</th>}
                {user.role === "admin" && <th className="border-x-2">Name</th>}
                {user.role === "admin" && <th className="border-x-2">Email</th>}
                <th className="border-x-2">Amount</th>
                <th className="border-x-2">Terms</th>
                <th className="border-x-2">Status</th>
                <th className="border-x-2">Created Date</th>
                <th className="border-x-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <React.Fragment key={loan._id}>
                  <tr className="border-x-2">
                    {user.role === "admin" && <td className="border-2">{loan.user_id && loan.user_id._id}</td>}
                    {user.role === "admin" && <td className="border-2">{loan.user_id && loan.user_id.name}</td>}
                    {user.role === "admin" && (
                      <td className="border-2">{loan.user_id && loan.user_id.email}</td>
                    )}
                    <td className="border-2">{loan.amount}</td>
                    <td className="border-2">{loan.terms}</td>
                    <td className="border-2">{loan.status}</td>
                    <td className="border-2">{loan.createdAt && loan.createdAt.slice(0, 10)}</td>
                    <td className="border-2">
                      {user &&
                      user.role === "admin" &&
                      loan.status === "pending" ? (
                        <>
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                            onClick={() => updateStatus(loan._id, "accepted")}
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => updateStatus(loan._id, "rejected")}
                          >
                            Reject
                          </button>
                        </>
                      ) : loan.status !== "rejected" ? (
                        <>
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => updateShowDetails(loan._id)}
                          >
                            View Details
                          </button>{" "}
                        </>
                      ) : (
                        <button
                          className="bg-gray-300 text-gray-600 px-4 py-2 rounded"
                          disabled
                        >
                          Rejected :(
                        </button>
                      )}
                    </td>
                  </tr>
                  {showDetails === loan._id && (
                    <div className="">
                      <div className="flex  flex-col justify-around items-center mt-2">
                      <h2 className="font-semibold">Total Amount:{loan.amount}</h2>
                      <h2 className="font-semibold">Remaining Amount:{loan.remainingAmount}</h2>
                      </div> 
                      <div>
                      <table className="min-w-full bg-white border border-gray-300 mt-2">
                        {loan.repayments && (
                          <>
                            <tr>
                              <th className="border-2">Amount</th>
                              <th className="border-2">Due</th>
                              <th className="border-2">Status</th>
                              <th className="border-2">Action</th>
                            </tr>
                            {loan.repayments && loan.repayments.map((repay) => (
                              <tr key={repay._id}>
                                <td className="border-2">{repay.amount}</td>
                                <td className="border-2">{repay.date.slice(0, 15)}</td>
                                <td className="border-2">{repay.status}</td>
                                <td className="border-2">
                                  {repay.status === "pending" ? (
                                    <button
                                      disabled={loan.status !== "accepted"}
                                      onClick={() => {
                                        updatePayment(loan._id, repay._id);
                                      }}
                                    >
                                      Repay
                                    </button>
                                  ) : (
                                    <button disabled>Paid :)</button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </table>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No loans found!</p>
      )}
      <br />
      <a href="/createLoan" className="text-red-500">
        Create New Loan +
      </a>
    </div>
  );
};

export default Home;