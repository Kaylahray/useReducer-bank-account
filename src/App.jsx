import { useReducer } from "react";
import "./App.css";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "openAccount":
      return {
        ...state,
        balance: 500,
        isActive: true,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };
    case "payLoan":
      return {
        ...state,
        loan: 0,

        balance: state.balance - state.loan,
      };
    case "closeAccount":
      if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;
    default:
      throw new Error("Action required");
  }
};

export default function App() {
  const [{ balance, isActive, loan }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className={`App ${isActive ? "active" : ""}`}>
      <h1>useReducer Bank Account</h1>
      <div className="container">
        <div className="column">
          <p>Balance: {balance}</p>
          <p>Loan: {loan}</p>
        </div>
        <div className="column">
          <button
            onClick={() => {
              dispatch({ type: "openAccount" });
            }}
            disabled={isActive}
            className="btn-open"
          >
            Open account
          </button>
          <button
            onClick={() => {
              dispatch({ type: "deposit", payload: 150 });
            }}
            disabled={!isActive}
            className="btn-deposit"
          >
            Deposit 150
          </button>
          <button
            onClick={() => {
              dispatch({ type: "withdraw", payload: 50 });
            }}
            disabled={!isActive}
            className="btn-withdraw"
          >
            Withdraw 50
          </button>
        </div>
        <div className="column">
          <button
            onClick={() => {
              dispatch({ type: "requestLoan", payload: 5000 });
            }}
            disabled={!isActive}
            className="btn-loan"
          >
            Request a loan of 5000
          </button>
          <button
            onClick={() => {
              dispatch({ type: "payLoan" });
            }}
            disabled={!isActive}
            className="btn-pay-loan"
          >
            Pay loan
          </button>
          <button
            onClick={() => {
              dispatch({ type: "closeAccount" });
            }}
            disabled={!isActive}
            className="btn-close"
          >
            Close account
          </button>
        </div>
      </div>
    </div>
  );
}
