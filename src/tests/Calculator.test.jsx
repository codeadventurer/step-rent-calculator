import { render, screen } from '../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'

import Calculator from '../components/Calculator'

test('calculate button is disabled unless all fields are filled', () => {
  render(<Calculator/>)

  const calculateButton = screen.getByRole('button', { name: /calculate/i })

  // on render the button is disabled
  expect(calculateButton).toBeDisabled()

  const firstStepStartDateInput = screen.getByLabelText(/first step from/i)
  userEvent.clear(firstStepStartDateInput)
  userEvent.type(firstStepStartDateInput, '2020-01-01')

  const lastStepStartDateInput = screen.getByLabelText(/last step from/i)
  userEvent.clear(lastStepStartDateInput)
  userEvent.type(lastStepStartDateInput, '2021-01-01')

  const firstStepAmountInput = screen.getByRole('spinbutton', { name: /first step rent/i })
  userEvent.clear(firstStepAmountInput)
  userEvent.type(firstStepAmountInput, '200')

  const lastStepAmountInput = screen.getByRole('spinbutton', { name: /last step rent/i })
  userEvent.clear(lastStepAmountInput)
  userEvent.type(lastStepAmountInput, '400')

  const numberOfStepsInput = screen.getByRole('spinbutton', { name: /number of steps/i })
  userEvent.clear(numberOfStepsInput)
  userEvent.type(numberOfStepsInput, '3')

  // all fields are field - the button is enabled

  expect(calculateButton).toBeEnabled()

  // clearing one field disables the button again
  userEvent.clear(firstStepAmountInput)
  expect(calculateButton).toBeDisabled()
})

test('clear button clears all fields and returns slope to linear', () => {
  render(<Calculator/>)

  const clearButton = screen.getByRole('button', { name: /clear/i })

  const firstStepStartDateInput = screen.getByLabelText(/first step from/i)
  userEvent.clear(firstStepStartDateInput)
  userEvent.type(firstStepStartDateInput, '2020-01-01')

  const lastStepStartDateInput = screen.getByLabelText(/last step from/i)
  userEvent.clear(lastStepStartDateInput)
  userEvent.type(lastStepStartDateInput, '2021-01-01')

  const firstStepAmountInput = screen.getByRole('spinbutton', { name: /first step rent/i })
  userEvent.clear(firstStepAmountInput)
  userEvent.type(firstStepAmountInput, '200')

  const lastStepAmountInput = screen.getByRole('spinbutton', { name: /last step rent/i })
  userEvent.clear(lastStepAmountInput)
  userEvent.type(lastStepAmountInput, '400')

  const numberOfStepsInput = screen.getByRole('spinbutton', { name: /number of steps/i })
  userEvent.clear(numberOfStepsInput)
  userEvent.type(numberOfStepsInput, '3')

  const slopeSelect = screen.getByRole('combobox', { name: /slope/i})
  userEvent.selectOptions(slopeSelect, ['percentual'])

  userEvent.click(clearButton)

  expect(firstStepStartDateInput).toBeEmptyDOMElement()
  expect(lastStepStartDateInput).toBeEmptyDOMElement()
  expect(firstStepAmountInput).toBeEmptyDOMElement()
  expect(lastStepAmountInput).toBeEmptyDOMElement()
  expect(numberOfStepsInput).toBeEmptyDOMElement()
  expect(slopeSelect).toHaveDisplayValue(/linear/i)
})