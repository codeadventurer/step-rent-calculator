import { calculateRentSteps, monthDiff } from '../helpers/calculations'

describe('calculateRentSteps()', () => {
  describe('when slope is linear', () => {
    describe('when there is only 1 step', () => {
      it('returns firstStepStartDate and one firstStepAmount', () => {
        const formValues = {
          firstStepStartDate: '2019-01-01',
          lastStepStartDate: '2021-01-01',
          firstStepAmount: 400,
          lastStepAmount: 500,
          numberOfSteps: 1,
          slope: 'linear',
        }

        expect(calculateRentSteps(formValues)).toEqual({
          'information.staffeln.staffel_1.beginn': '01.01.2019',
          'information.staffeln.staffel_1.eur': '400,00',
        })
      })
    })

    describe('when prices are integers', () => {
      it('returns rentSteps with correct keys and values', () => {
        const formValues = {
          firstStepStartDate: '2019-01-01',
          lastStepStartDate: '2022-01-01',
          firstStepAmount: 400,
          lastStepAmount: 550,
          numberOfSteps: 4,
          slope: 'linear',
        }

        expect(calculateRentSteps(formValues)).toEqual({
          'information.staffeln.staffel_1.beginn': '01.01.2019',
          'information.staffeln.staffel_1.eur': '400,00',
          'information.staffeln.staffel_2.beginn': '01.01.2020',
          'information.staffeln.staffel_2.eur': '450,00',
          'information.staffeln.staffel_3.beginn': '01.01.2021',
          'information.staffeln.staffel_3.eur': '500,00',
          'information.staffeln.staffel_4.beginn': '01.01.2022',
          'information.staffeln.staffel_4.eur': '550,00',
        })
      })
    })

    describe('when prices are floats', () => {
      it('returns rentSteps with correct keys and values', () => {
        const formValues = {
          firstStepStartDate: '2019-01-01',
          lastStepStartDate: '2021-01-01',
          firstStepAmount: 399.5,
          lastStepAmount: 599.5,
          numberOfSteps: 3,
          slope: 'linear',
        }

        expect(calculateRentSteps(formValues)).toEqual({
          'information.staffeln.staffel_1.beginn': '01.01.2019',
          'information.staffeln.staffel_1.eur': '399,50',
          'information.staffeln.staffel_2.beginn': '01.01.2020',
          'information.staffeln.staffel_2.eur': '499,50',
          'information.staffeln.staffel_3.beginn': '01.01.2021',
          'information.staffeln.staffel_3.eur': '599,50',
        })
      })
    })

    describe('when rent increased more often than once a year', () => {
      it('returns correct dates with 1st of the month', () => {
        const formValues = {
          firstStepStartDate: '2019-01-01',
          lastStepStartDate: '2021-01-01',
          firstStepAmount: 400,
          lastStepAmount: 600,
          numberOfSteps: 5,
          slope: 'linear',
        }

        expect(calculateRentSteps(formValues)).toEqual({
          'information.staffeln.staffel_1.beginn': '01.01.2019',
          'information.staffeln.staffel_1.eur': '400,00',
          'information.staffeln.staffel_2.beginn': '01.07.2019',
          'information.staffeln.staffel_2.eur': '450,00',
          'information.staffeln.staffel_3.beginn': '01.01.2020',
          'information.staffeln.staffel_3.eur': '500,00',
          'information.staffeln.staffel_4.beginn': '01.07.2020',
          'information.staffeln.staffel_4.eur': '550,00',
          'information.staffeln.staffel_5.beginn': '01.01.2021',
          'information.staffeln.staffel_5.eur': '600,00',
        })
      })
    })
  })

  describe('when slope is percentual', () => {
    describe('when prices are integers', () => {
      it('returns rentSteps with correct keys and values', () => {
        const formValues = {
          firstStepStartDate: '2019-01-01',
          lastStepStartDate: '2022-01-01',
          firstStepAmount: 400,
          lastStepAmount: 500,
          numberOfSteps: 4,
          slope: 'percentual',
        }

        expect(calculateRentSteps(formValues)).toEqual({
          'information.staffeln.staffel_1.beginn': '01.01.2019',
          'information.staffeln.staffel_1.eur': '400,00',
          'information.staffeln.staffel_2.beginn': '01.01.2020',
          'information.staffeln.staffel_2.eur': '430,89',
          'information.staffeln.staffel_3.beginn': '01.01.2021',
          'information.staffeln.staffel_3.eur': '464,16',
          'information.staffeln.staffel_4.beginn': '01.01.2022',
          'information.staffeln.staffel_4.eur': '500,00',
        })
      })
    })

    describe('when prices are floats', () => {
      it('returns rentSteps with correct keys and values', () => {
        const formValues = {
          firstStepStartDate: '2019-01-01',
          lastStepStartDate: '2021-01-01',
          firstStepAmount: 399.5,
          lastStepAmount: 599.5,
          numberOfSteps: 3,
          slope: 'percentual',
        }

        expect(calculateRentSteps(formValues)).toEqual({
          'information.staffeln.staffel_1.beginn': '01.01.2019',
          'information.staffeln.staffel_1.eur': '399,50',
          'information.staffeln.staffel_2.beginn': '01.01.2020',
          'information.staffeln.staffel_2.eur': '489,39',
          'information.staffeln.staffel_3.beginn': '01.01.2021',
          'information.staffeln.staffel_3.eur': '599,50',
        })
      })
    })
  })
})

describe('monthDiff()', () => {
  it('returs the right amount of months', () => {
    expect(monthDiff('2019-01-01', '2021-01-01')).toEqual(24)
    expect(monthDiff('2019-01-01', '2021-02-01')).toEqual(25)
    expect(monthDiff('2019-01-15', '2021-02-15')).toEqual(25)
    expect(monthDiff('2019-01-01', '2021-01-31')).toEqual(24)
    expect(monthDiff('2019-01-01', '2018-01-01')).toEqual(-12)
  })
})
