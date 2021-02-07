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

  const currentDate = new Date(firstStepStart);

  const rentSteps =
    slope === 'percentual'
      ? calculatePercentual(
          numberOfSteps,
          currentDate,
          firstStepRent,
          timeDifference,
          priceDifference
        )
      : calculateLinear(
          numberOfSteps,
          currentDate,
          firstStepRent,
          timeDifference,
          priceDifference
        );

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

const calculateLinear = (
  numberOfSteps,
  currentDate,
  firstStepRent,
  timeDifference,
  priceDifference
) => {
  let rentSteps = {};
  for (let i = 1; i <= numberOfSteps; i++) {
    rentSteps[fillRentStepsKey(i, 'beginn')] = moment(currentDate)
      .utc()
      .format();
    rentSteps[fillRentStepsKey(i, 'eur')] = formatNumberToString(firstStepRent);
    firstStepRent += priceDifference;
    currentDate = moment(currentDate).utc().add(timeDifference, 'M');
  }

  return rentSteps;
};

const calculatePercentual = (
  numberOfSteps,
  currentDate,
  firstStepRent,
  timeDifference,
  priceDifference
) => {
  let rentSteps = {};
  for (let i = 1; i <= numberOfSteps; i++) {
    const price =
      Math.round(100 * firstStepRent * Math.pow(priceDifference, i - 1)) /
      100.0;

    rentSteps[fillRentStepsKey(i, 'beginn')] = moment(currentDate)
      .utc()
      .format();
    rentSteps[fillRentStepsKey(i, 'eur')] = formatNumberToString(price);

    currentDate = moment(currentDate).utc().add(timeDifference, 'M');
  }

  return rentSteps;
};

const fillRentStepsKey = (index, type) => {
  return `information.staffeln.staffel_${index}.${type}`;
};

export { calculateRentSteps, monthDiff };
