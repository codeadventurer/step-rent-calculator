import { renderHook, act } from '@testing-library/react-hooks'
import useForm from '../hooks/useForm'

test('initialize', () => {
  const { result } = renderHook(() => useForm())

  const initialValues = {
    firstStepStartDate: '',
    lastStepStartDate: '',
    firstStepAmount: '',
    lastStepAmount: '',
    numberOfSteps: '',
    slope: 'linear',
  }

  act(() => {
    result.current.initialize(initialValues)
  })

  expect(result.current.initialized).toBe(true)
  expect(result.current.formValues).toStrictEqual({
    firstStepAmount: { name: 'firstStepAmount', value: '', pristine: true },
    firstStepStartDate: {
      name: 'firstStepStartDate',
      value: '',
      pristine: true,
    },
    lastStepAmount: { name: 'lastStepAmount', value: '', pristine: true },
    lastStepStartDate: { name: 'lastStepStartDate', value: '', pristine: true },
    numberOfSteps: { name: 'numberOfSteps', value: '', pristine: true },
    slope: { name: 'slope', value: 'linear', pristine: true },
  })
})

test('change', () => {
  const { result } = renderHook(() => useForm())

  const initialValues = {
    firstStepStartDate: '',
    lastStepStartDate: '',
    firstStepAmount: '',
    lastStepAmount: '',
    numberOfSteps: '',
    slope: 'linear',
  }

  act(() => {
    result.current.initialize(initialValues)
  })

  act(() => {
    result.current.change('firstStepAmount', '500')
  })

  act(() => {
    result.current.change('firstStepStartDate', '2020-07-01')
  })

  act(() => {
    result.current.change('slope', 'percentual')
  })

  expect(result.current.formValues).toStrictEqual({
    firstStepAmount: { name: 'firstStepAmount', value: '500', pristine: false },
    firstStepStartDate: {
      name: 'firstStepStartDate',
      value: '2020-07-01',
      pristine: false,
    },
    lastStepAmount: { name: 'lastStepAmount', value: '', pristine: true },
    lastStepStartDate: { name: 'lastStepStartDate', value: '', pristine: true },
    numberOfSteps: { name: 'numberOfSteps', value: '', pristine: true },
    slope: { name: 'slope', value: 'percentual', pristine: false },
  })
})
