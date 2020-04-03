import Header from "../partials/seo-meta";
import React, { useReducer } from "react";
import styles from "./index.module.css";
import { filingStatuses } from "./utils/constants";
import { getStimulusAmount } from "./utils/calculateStimulus";

function reducer(state, action) {
  const { type, payload } = action;
  return { ...state, [type]: payload };
}

function Home() {
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
    <div className={styles.container}>
      <Header />
      <main>
        <h1>Stimulus Check Calculator 💸</h1>
        <p>
          Use this calculator to determine the estimated amount of your stimulus
          check under the CARES Act.
        </p>
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
              onClick={() =>
                dispatch({ type: "filingStatus", payload: status })
              }
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
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={income}
            onChange={(e) =>
              dispatch({ type: "income", payload: e.target.value })
            }
            min={0}
          />
          <br />
          <label htmlFor="children">
            How many children under age 17 did you claim as dependents in{" "}
            {taxYear}?
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
                ? `Your stimulus amount is likely to be $${stimulusAmount}.`
                : `You are not expected to receive a stimulus.`)}
          </p>
          <br />
        </form>
      </main>

      <footer>
        <p>
          This form was created for educational purposes and based off of
          figures from the{" "}
          <a href="https://www.washingtonpost.com/context/coronavirus-aid-relief-and-economic-security-act-of-2020/28f5de5f-6eed-46c0-b629-798e219497c5/">
            CARES Act
          </a>{" "}
          and this{" "}
          <a href="https://www.washingtonpost.com/graphics/business/coronavirus-stimulus-check-calculator/">
            Washington Post Article
          </a>
          .
        </p>
        <p>None of the information you input will be stored.</p>
        <p>
          Created By:{" "}
          <a
            href="https://github.com/M0nica/stimulus-check-calculator"
            target="_blank"
            rel="noopener noreferrer"
          >
            Monica Powell
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
