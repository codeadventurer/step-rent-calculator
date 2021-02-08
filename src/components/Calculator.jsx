import { CalculatorContainer, FieldsContainer, Field, ButtonContainer, Button } from '../styles/Calculator'

export default function Calculator() {
  return (
    <CalculatorContainer>
      <FieldsContainer>
        <Field>
          <label htmlFor="">First Step from</label>
          <input type="date" name="firstStepStart"/>
        </Field>
        <Field>
          <label htmlFor="">Last Step from</label>
          <input type="date" name="lastStepStart"/>
        </Field>
        <Field>
          <label htmlFor="">First Step Rent(€)</label>
          <input type="number" name="firstStepRent"/>
        </Field>
        <Field>
          <label htmlFor="">Last Step Rent(€)</label>
          <input type="number" name="firstStepRent" />
        </Field>
        <Field>
          <label htmlFor="">Number of Steps</label>
          <input type="number" name="numberOfSteps"/>
        </Field>
        <Field>
          <label htmlFor="">Slope</label>
          <select name="slope"> 
            <option value="linear">linear</option>
            <option value="percentual">percentual</option>
          </select>
        </Field>
      </FieldsContainer>
      <ButtonContainer>
        <Button>Calculate</Button>
      </ButtonContainer>
    </CalculatorContainer>
  )
}