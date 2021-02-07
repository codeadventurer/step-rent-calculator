import moment from 'moment';
import { formatNumberToString } from './format';

const calculateRentSteps = (values) => {
  const {
    firstStepStartDate,
    lastStepStartDate,
    firstStepAmount,
    lastStepAmount,
    numberOfSteps,
    slope,
  } = values;

  if (numberOfSteps === 1)
    return {
      [fillRentStepsKey(1, 'beginn')]: firstStepStartDate,
      [fillRentStepsKey(1, 'eur')]: formatNumberToString(firstStepAmount),
    };

  const timeDifference =
    monthDiff(firstStepStartDate, lastStepStartDate) / (numberOfSteps - 1);

  const priceDifferenceFunctions = {
    linear: (lastStepAmount - firstStepAmount) / (numberOfSteps - 1),
    percentual: Math.pow(
      lastStepAmount / firstStepAmount,
      1 / (numberOfSteps - 1)
    ),
  };

  const priceDifference = priceDifferenceFunctions[slope];

  const formattedFirstStepStartDate = new Date(firstStepStartDate);

  const rentSteps = fillRentSteps({
    slope: slope,
    numberOfSteps: numberOfSteps,
    firstStepStartDate: formattedFirstStepStartDate,
    firstStepAmount: firstStepAmount,
    timeDifference: timeDifference,
    priceDifference: priceDifference,
  });

  return rentSteps;
};

const fillRentSteps = ({
  slope,
  numberOfSteps,
  firstStepStartDate,
  firstStepAmount,
  timeDifference,
  priceDifference,
}) => {
  let currentDate = firstStepStartDate;
  let currentRentAmount = firstStepAmount;

  // stepsArray is array of indexes starting with 1, e. g. for 5 steps: [1, 2, 3, 4, 5]
  const stepsArray = [...Array(numberOfSteps).keys()].map((x) => ++x);

  const rentSteps = stepsArray.reduce((acc, i) => {
    const newStep = {
      [fillRentStepsKey(i, 'beginn')]: moment(currentDate).utc().format(),
      [fillRentStepsKey(i, 'eur')]: formatNumberToString(currentRentAmount),
    };

    currentRentAmount =
      slope === 'linear'
        ? (currentRentAmount += priceDifference)
        : Math.round(100 * firstStepAmount * Math.pow(priceDifference, i)) /
          100.0;

    currentDate = moment(currentDate).utc().add(timeDifference, 'M');

    return {
      ...acc,
      ...newStep,
    };
  }, {});

  return rentSteps;
};

const monthDiff = (firstStepStartDate, lastStepStartDate) => {
  const dateTo = new Date(lastStepStartDate);
  const dateFrom = new Date(firstStepStartDate);
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
};

const fillRentStepsKey = (index, type) => {
  return `information.staffeln.staffel_${index}.${type}`;
};

export { calculateRentSteps, monthDiff };
