import Head from "next/head";
import React, { useState } from "react";
import styles from "./index.module.css";

function getStimulusAmount(incomeLimit, baseStimulusAmount, income, children) {
  const ineligibleIncome = parseInt(income) - incomeLimit;
  const amountPerKid = 500 * children;
  if (ineligibleIncome <= 0) {
    return baseStimulusAmount + amountPerKid;
  } else {
    const calculatedAmount =
      baseStimulusAmount - (ineligibleIncome / 100) * 5 + amountPerKid;
    return calculatedAmount > 0 ? calculatedAmount : 0;
  }
}

function calculateStimulus(income, filingStatus, children) {
  switch (filingStatus) {
    case "Head of Household":
      return getStimulusAmount(112500, 1200, income, children);
    case "Single":
      return getStimulusAmount(75000, 1200, income, children);
      break;
    case "Married":
      return getStimulusAmount(150000, 2400, income, children);
    default:
      return getStimulusAmount(75000, 1200, income, children);
  }
}

function Home() {
  const [taxYear, setTaxYear] = useState(2019);
  const [filingStatus, setFilingStatus] = useState("Single");
  const [income, setIncome] = useState("75000");
  const [children, setChildren] = useState(0);
  const [stimulusAmount, setStimulusAmount] = useState(-1);

  function handleSubmit(e) {
    e.preventDefault();
    setStimulusAmount(calculateStimulus(income, filingStatus, children));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Stimulus Check Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Stimulus Check Calculator</h1>
        <form onSubmit={handleSubmit}>
          <p>
            This is an educational form based on figures from the{" "}
            <a href="https://www.washingtonpost.com/context/coronavirus-aid-relief-and-economic-security-act-of-2020/28f5de5f-6eed-46c0-b629-798e219497c5/">
              CARES Act
            </a>{" "}
            📝 .{" "}
          </p>
          <p>None of the information you input will be stored.</p>
          <label htmlFor="tax-year">Have you filed your 2019 taxes yet?</label>
          {[2019, 2018].map(year => (
            <button
              onClick={() => setTaxYear(year)}
              className={year == taxYear ? "selectedButton" : ""}
              key={year}
            >
              {year == 2019 ? "Yes" : "No"}
            </button>
          ))}
          <p>What was your filing status in your {taxYear} taxes? </p>
          {["Single", "Married", "Head of Household"].map(status => (
            <button
              onClick={() => setFilingStatus(status)}
              className={status == filingStatus ? "selectedButton" : ""}
              name="tax-year"
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
            value={income}
            onChange={e => setIncome(e.target.value)}
            min={0}
            name="adjusted-income"
          />
          <br />
          <label htmlFor="children">
            How many children under age 17 did you claim as dependents in{" "}
            {taxYear}?
          </label>
          <input
            type="number"
            value={children}
            onChange={e => setChildren(e.target.value)}
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
                ? `Your stimulus amount is expected to be $${stimulusAmount}.`
                : `You are not expected to receive a stimulus.`)}
          </p>
        </form>
      </main>

      <footer>
        <a
          href="https://www.github.com/m0nica"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created By: Monica Powell
        </a>
      </footer>
    </div>
  );
}

export default Home;
