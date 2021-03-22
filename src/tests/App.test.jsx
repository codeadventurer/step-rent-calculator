import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

test('happy path to calculate rent steps', () => {
  render(<App/>)

  // on render the result is not visible

  const nullDateHeading = screen.queryByRole('heading', {name: /date/i})
  const nullRentAmountHeading = screen.queryByRole('heading', {name: /rent amount/i})

  expect(nullDateHeading).not.toBeInTheDocument()
  expect(nullRentAmountHeading).not.toBeInTheDocument()

  // fill the form

  const firstStepStartDateInput = screen.getByLabelText(/first step from/i)
  userEvent.clear(firstStepStartDateInput)
  userEvent.type(firstStepStartDateInput, '2019-01-01')

  const lastStepStartDateInput = screen.getByLabelText(/last step from/i)
  userEvent.clear(lastStepStartDateInput)
  userEvent.type(lastStepStartDateInput, '2021-01-01')

  const firstStepAmountInput = screen.getByRole('spinbutton', { name: /first step rent/i })
  userEvent.clear(firstStepAmountInput)
  userEvent.type(firstStepAmountInput, '400')

  const lastStepAmountInput = screen.getByRole('spinbutton', { name: /last step rent/i })
  userEvent.clear(lastStepAmountInput)
  userEvent.type(lastStepAmountInput, '500')

  const numberOfStepsInput = screen.getByRole('spinbutton', { name: /number of steps/i })
  userEvent.clear(numberOfStepsInput)
  userEvent.type(numberOfStepsInput, '3')

  const slopeSelect = screen.getByRole('combobox', { name: /slope/i})
  userEvent.selectOptions(slopeSelect, ['percentual'])

  // click calculate button

  const calculateButton = screen.getByRole('button', { name: /calculate/i })
  userEvent.click(calculateButton)

 // result headings are visible and steps are visible

 const dateHeading = screen.getByRole('heading', {name: /date/i})
 const rentAmountHeading = screen.getByRole('heading', {name: /rent amount/i})

 expect(dateHeading).toBeInTheDocument()
 expect(rentAmountHeading).toBeInTheDocument()

 expect(screen.getByText('01.01.2019')).toBeInTheDocument()
 expect(screen.getByText('01.01.2020')).toBeInTheDocument()
 expect(screen.getByText('01.01.2021')).toBeInTheDocument()

 expect(screen.getByText('400,00')).toBeInTheDocument()
 expect(screen.getByText('447,21')).toBeInTheDocument()
 expect(screen.getByText('500,00')).toBeInTheDocument()

 // clear all

 const clearButton = screen.getByRole('button', { name: /clear/i })
 userEvent.click(clearButton)

 expect(dateHeading).not.toBeInTheDocument()
 expect(rentAmountHeading).not.toBeInTheDocument()
})