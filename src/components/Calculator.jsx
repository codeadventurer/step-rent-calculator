import { useEffect } from 'react'

import dayjs from '../configs/dayjs'
import useForm from '../hooks/useForm'
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

  useEffect(() => {
    const initialValues = {
      firstStepStartDate: '',
      lastStepStartDate: '',
      firstStepAmount: 0,
      lastStepAmount: 0,
      numberOfSteps: 0,
      slope: 'linear'
    }
    initialize(initialValues)
  }, [])

  const handleChange = (event) => {
    console.log(event)
    change(event.target.name, event.target.value)
  }

  const handleSubmit = () => {
    const values = getCalculationValues()
    console.log('values: ', values)
    const rentSteps = calculateRentSteps(values)
    console.log(rentSteps)
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

  return (
    <CalculatorContainer>
      <FieldsContainer>
        {fields.map((field, index) => (
        <Field 
          key={index} 
          label={field.label} 
          name={field.name} 
          type={field.type}
          onChange={handleChange}/>
        ))}
      </FieldsContainer>
      <ButtonContainer>
        <Button onClick={handleSubmit}>Calculate</Button>
      </ButtonContainer>
    </CalculatorContainer>
  )
}