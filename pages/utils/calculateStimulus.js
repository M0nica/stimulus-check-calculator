import { filingStatuses } from "./constants";

function calculateStimulusAmount(
  incomeLimit,
  baseStimulusAmount,
  income,
  children
) {
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

export function getStimulusAmount(income, filingStatus, children) {
  const { HEADOFHOUSE, SINGLE, MARRIED } = filingStatuses;
  switch (filingStatus) {
    case HEADOFHOUSE:
      return calculateStimulusAmount(112500, 1200, income, children);
    case SINGLE:
      return calculateStimulusAmount(75000, 1200, income, children);
      break;
    case MARRIED:
      return calculateStimulusAmount(150000, 2400, income, children);
    default:
      return calculateStimulusAmount(75000, 1200, income, children);
  }
}
