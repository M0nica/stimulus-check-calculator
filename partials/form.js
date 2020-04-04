import { useReducer } from "react";
import { filingStatuses } from "../utils/constants";
import { getStimulusAmount } from "../utils/calculateStimulus";

function reducer(state, action) {
  const { type, payload } = action;
  return { ...state, [type]: payload };
}

function Form() {
  const { SINGLE, HEADOFHOUSE, MARRIED } = filingStatuses;
  const initialState = {
    taxYear: 2019,
    filingStatus: SINGLE,
    income: "75000",
    children: 0,
    stimulusAmount: -1,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "stimulusAmount",
      payload: getStimulusAmount(income, filingStatus, children),
    });
  }

  const { taxYear, filingStatus, income, children, stimulusAmount } = state;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tax-year">Have you filed your 2019 taxes yet?</label>
      {[2019, 2018].map((year) => (
        <button
          onClick={() => dispatch({ type: "taxYear", payload: year })}
          className={year == taxYear ? "selectedButton" : ""}
          key={year}
          name="tax-year"
        >
          {year == 2019 ? "Yes" : "No"}
        </button>
      ))}
      <label htmlFor="filing-status">
        What was your filing status in your {taxYear} taxes?{" "}
      </label>
      {[SINGLE, MARRIED, HEADOFHOUSE].map((status) => (
        <button
          onClick={() => dispatch({ type: "filingStatus", payload: status })}
          className={status == filingStatus ? "selectedButton" : ""}
          name="filing-status"
          key={status}
        >
          {" "}
          {status}
        </button>
      ))}
      <br />
      <label htmlFor="adjusted-income">
        What was your adjusted gross income in {taxYear}?
      </label>
      ${" "}
      <input
        type="string"
        inputMode="numeric"
        pattern="[0-9]*"
        value={income}
        onChange={(e) => dispatch({ type: "income", payload: e.target.value })}
        min={0}
      />
      <br />
      <label htmlFor="children">
        How many children under age 17 did you claim as dependents in {taxYear}?
      </label>
      <input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        value={children}
        onChange={(e) =>
          dispatch({ type: "children", payload: e.target.value })
        }
        min={0}
        name="label"
      />
      <br />
      <button type="submit" className="calculateButton">
        Calculate
      </button>
      <p>
        {" "}
        {stimulusAmount >= 0 &&
          (stimulusAmount > 0
            ? `Your stimulus amount is likely to be ${new Intl.NumberFormat(
                "en-US",
                { style: "currency", currency: "USD" }
              ).format(stimulusAmount)}.`
            : `You are not expected to receive a stimulus.`)}
      </p>
      <br />
    </form>
  );
}

export default Form;
