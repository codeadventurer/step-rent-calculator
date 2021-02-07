import moment from 'moment';
import { formatNumberToString } from './format';

const calculateRentSteps = (values) => {
  const {
    firstStepStart,
    lastStepStart,
    firstStepRent,
    lastStepRent,
    numberOfSteps,
    slope,
  } = values;

  if (numberOfSteps === 1)
    return {
      [fillRentStepsKey(1, 'beginn')]: firstStepStart,
      [fillRentStepsKey(1, 'eur')]: formatNumberToString(firstStepRent),
    };

  const timeDifference =
    monthDiff(firstStepStart, lastStepStart) / (numberOfSteps - 1);

  const priceDifferenceFunctions = {
    linear: (lastStepRent - firstStepRent) / (numberOfSteps - 1),
    percentual: Math.pow(lastStepRent / firstStepRent, 1 / (numberOfSteps - 1)),
  };

  const priceDifference = priceDifferenceFunctions[slope];

  const formattedFirstStepStart = new Date(firstStepStart);

  const rentSteps = fillRentSteps({
    slope: slope,
    numberOfSteps: numberOfSteps,
    firstStepStart: formattedFirstStepStart,
    firstStepRent: firstStepRent,
    timeDifference: timeDifference,
    priceDifference: priceDifference,
  });

  return rentSteps;
};

const fillRentSteps = ({
  slope,
  numberOfSteps,
  firstStepStart,
  firstStepRent,
  timeDifference,
  priceDifference,
}) => {
  let currentDate = firstStepStart;
  let currentRentAmount = firstStepRent;

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
        : Math.round(100 * firstStepRent * Math.pow(priceDifference, i)) /
          100.0;

    currentDate = moment(currentDate).utc().add(timeDifference, 'M');

    return {
      ...acc,
      ...newStep,
    };
  }, {});

  return rentSteps;
};

const monthDiff = (firstStepStart, lastStepStart) => {
  const dateTo = new Date(lastStepStart);
  const dateFrom = new Date(firstStepStart);
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
