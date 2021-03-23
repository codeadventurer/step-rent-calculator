import styled from 'styled-components'

export const CalculatorContainer = styled.div`
  border: 2px solid #1f55f5;
  box-shadow: -16px 16px #1f55f5;
  width: 40%;
  max-width: 600px;
  padding: 2rem;

  @media (max-width: 1024px) {
    margin-bottom: 3rem;
    width: 60%;
  }
`

export const Heading = styled.h1`
  margin: 0 0 0.5rem 0;
  font-weight: 900;

  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`

export const FieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: center;

    > * {
      &:first-child {
        order: 2;
      }
    }
  }
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
    cursor: default;
  }

  :hover:not([disabled]) {
    background-color: #f3aaa5;
  }

  :focus {
    outline-style: solid;
    box-shadow: -7px 7px #1f55f5;
  }

  @media (max-width: 1024px) {
    margin: 0.5rem;
  }
`
