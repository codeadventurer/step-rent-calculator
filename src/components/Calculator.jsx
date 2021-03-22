import { useEffect } from 'react'

import useForm from '../hooks/useForm'
import { useSteps } from '../context/steps-context'
import { CalculatorContainer, FieldsContainer, ButtonContainer, Button } from '../styles/Calculator'
import Field from './Field'
import { calculateRentSteps } from '../helpers/calculations'


const fields = [
  {label: 'First Step from', name: 'firstStepStartDate', type: 'date'},
  {label: 'Last Step from', name: 'lastStepStartDate', type: 'date'},
  {label: 'First Step Rent(€)', name: 'firstStepAmount', type: 'number'},
  {label: 'Last Step Rent(€)', name: 'lastStepAmount', type: 'number'},
  {label: 'Number of Steps', name: 'numberOfSteps', type: 'number'},
  {label: 'Slope', name: 'slope', type: 'select'}]

export default function Calculator() {
  const { initialize, initialized, change, formValues } = useForm()
  const [, setSteps] = useSteps()

  useEffect(() => {
    initializeValues()
  }, [])

  const initializeValues = () => {
    const initialValues = {
      firstStepStartDate: '',
      lastStepStartDate: '',
      firstStepAmount: '',
      lastStepAmount: '',
      numberOfSteps: '',
      slope: 'linear'
    }
    initialize(initialValues)
  }

  const handleChange = (event) => {
    change(event.target.name, event.target.value)
  }

  const handleClear = () => {
    initializeValues()
    setSteps({})
  }

  const handleSubmit = () => {
    const values = getCalculationValues()
    const rentSteps = calculateRentSteps(values)
    setSteps(rentSteps)
  }

  const getCalculationValues = () => {
    const {
      firstStepStartDate,
      lastStepStartDate,
      firstStepAmount,
      lastStepAmount,
      numberOfSteps,
      slope
    } = formValues

    const values = {
      firstStepStartDate: firstStepStartDate.value,
      lastStepStartDate: lastStepStartDate.value,
      firstStepAmount: parseFloat(firstStepAmount.value),
      lastStepAmount: parseFloat(lastStepAmount.value),
      numberOfSteps: parseInt(numberOfSteps.value),
      slope: slope.value
    }

    return values
  }

  const isInvalid =  Object.values(formValues).some(item => !item.value || item.value === '0')

  if (initialized) {
  return (
    <CalculatorContainer>
      <FieldsContainer>
        {fields.map((field, index) => (
        <Field 
          key={index} 
          label={field.label} 
          name={field.name} 
          type={field.type}
          value={formValues[field.name].value}
          onChange={handleChange}/>
        ))}
      </FieldsContainer>
      <ButtonContainer>
        <Button onClick={handleClear}>Clear</Button>
        <Button onClick={handleSubmit} disabled={isInvalid}>Calculate</Button>
      </ButtonContainer>
    </CalculatorContainer>
    )
  }
  
  return null
}