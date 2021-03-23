import styled from 'styled-components'

export const CalculatorContainer = styled.div`
  border: 2px solid #1f55f5;
  box-shadow: -16px 16px #1f55f5;
  width: 500px;
  padding: 2rem;
`

export const FieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  justify-content: space-between;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const Button = styled.button`
  margin: 0 0.5rem;
  border: 2px solid #1f55f5;
  box-shadow: -5px 5px #1f55f5;
  padding: 0.5rem 1.5rem;
  color: #1f55f5;
  background-color: #f8ccc9;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;

  :disabled {
    cursor: not-allowed;
  }

  :hover:not([disabled]) {
    background-color: #f3aaa5;
  }
`
