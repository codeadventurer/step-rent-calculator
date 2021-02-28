import { formatNumberToString } from './format'
import dayjs from '../configs/dayjs'

const monthDiff = (firstStepStartDate, lastStepStartDate) => {
  const dateTo = dayjs(lastStepStartDate)
  const dateFrom = dayjs(firstStepStartDate)
  return dateTo.diff(dateFrom, 'month')
}
const fillRentStepKey = (index, type) => {
  return `information.staffeln.staffel_${index}.${type}`
}

const fillRentSteps = ({
  slope,
  numberOfSteps,
  firstStepStartDate,
  firstStepAmount,
  timeDifference,
  priceDifference,
}) => {
  // stepsArray is array of indexes starting with 1, e. g. for 5 steps: [1, 2, 3, 4, 5]
  const stepsArray = [...Array(numberOfSteps).keys()].map((index) => ++index)

  const rentSteps = stepsArray.reduce(
    (steps, index) => {
      const { currentDate, currentRentAmount } = steps

      const newStep = {
        [fillRentStepKey(index, 'beginn')]: dayjs(currentDate).format(
          'DD.MM.YYYY'
        ),
        [fillRentStepKey(index, 'eur')]: formatNumberToString(
          currentRentAmount
        ),
      }

      return {
        ...steps,
        ...newStep,
        currentRentAmount:
          slope === 'linear'
            ? currentRentAmount + priceDifference
            : Math.round(
                100 * firstStepAmount * Math.pow(priceDifference, index)
              ) / 100.0,
        currentDate: dayjs(currentDate).add(timeDifference, 'M'),
      }
    },
    {
      currentDate: firstStepStartDate,
      currentRentAmount: firstStepAmount,
    }
  )

  const { currentRentAmount, currentDate, ...rest } = rentSteps

  return rest
}

const calculateRentSteps = (values) => {
  const {
    firstStepStartDate,
    lastStepStartDate,
    firstStepAmount,
    lastStepAmount,
    numberOfSteps,
    slope,
  } = values

  if (numberOfSteps === 1)
    return {
      [fillRentStepKey(1, 'beginn')]: dayjs(firstStepStartDate).format(
        'DD.MM.YYYY'
      ),
      [fillRentStepKey(1, 'eur')]: formatNumberToString(firstStepAmount),
    }

  const divisor = numberOfSteps - 1

  const timeDifference =
    monthDiff(firstStepStartDate, lastStepStartDate) / divisor

  const priceDifferenceFunctions = {
    linear: (lastStepAmount - firstStepAmount) / divisor,
    percentual: Math.pow(lastStepAmount / firstStepAmount, 1 / divisor),
  }

  const priceDifference = priceDifferenceFunctions[slope]

  return fillRentSteps({
    slope,
    numberOfSteps,
    firstStepStartDate,
    firstStepAmount,
    timeDifference,
    priceDifference,
  })
}

export { calculateRentSteps, monthDiff }
