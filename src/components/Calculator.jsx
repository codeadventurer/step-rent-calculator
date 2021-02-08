import { CalculatorContainer, FieldsContainer, ButtonContainer, Button } from '../styles/Calculator'
import Field from './Field'

const fields = [
  {label: 'First Step from', name: 'firstStepStartDate', type: 'date'},
  {label: 'Last Step from', name: 'lastStepStartDate', type: 'date'},
  {label: 'First Step Rent(€)', name: 'firstStepAmount', type: 'number'},
  {label: 'Last Step Rent(€)', name: 'lastStepAmount', type: 'number'},
  {label: 'Number of Steps', name: 'numberOfSteps', type: 'number'},
  {label: 'Slope', name: 'slope', type: 'select'}]

export default function Calculator() {

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value)
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
        <Button>Calculate</Button>
      </ButtonContainer>
    </CalculatorContainer>
  )
}