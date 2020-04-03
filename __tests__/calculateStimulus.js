import {
  getStimulusAmount,
  calculateStimulusAmount,
} from "../utils/calculateStimulus";

describe("given income is less than or equal to incomeLimit", () => {
  it("when there are no children return baseStimulusAmount", () => {
    const stimulusAmount = calculateStimulusAmount(75000, 1200, 75000, 0);
    expect(stimulusAmount).toEqual(1200);
  });
  it("when there is one child return baseStimulusAmount + 500", () => {
    const stimulusAmount = calculateStimulusAmount(75000, 1200, 75000, 1);
    expect(stimulusAmount).toEqual(1700);
  });
  it("when there are three childen return baseStimulusAmount + 1500", () => {
    const stimulusAmount = calculateStimulusAmount(75000, 1200, 75000, 3);
    expect(stimulusAmount).toEqual(2700);
  });
});

describe("given income is greater than incomeLimit", () => {
  it("when income is 500 more than incomeLimit stimulus amount should be 25 less than baseStimulusAmount", () => {
    const stimulusAmount = calculateStimulusAmount(75000, 1200, 75500, 0);
    expect(stimulusAmount).toEqual(1175);
  });
  it("when income is almost ineligible for stimulus shoudld return proper amount", () => {
    const stimulusAmount = calculateStimulusAmount(75000, 1200, 98000, 0);
    expect(stimulusAmount).toEqual(50);
  });
  it("when income is significantly more than incomeLimit stimulus amount should be 0", () => {
    const stimulusAmount = calculateStimulusAmount(75000, 1200, 99000, 0);
    expect(stimulusAmount).toEqual(0);
  });
});
