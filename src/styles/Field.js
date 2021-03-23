import styled from 'styled-components'

export const FieldContainer = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;

  @media (max-width: 1024px) {
    width: 100%;
  }
`

export const Label = styled.label`
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
`

export const Input = styled.input`
  border: 2px solid #1f55f5;
  box-shadow: -5px 5px #1f55f5;
  background-color: #f6e2e2;
  height: 2rem;
  padding: 0 0.5rem;
  color: #1f55f5;
  font-size: 1.2rem;
  font-family: 'Lato';
  -moz-appearance: textfield;

  [type='number'] {
    -moz-appearance: textfield;
  }

  :focus {
    outline-style: solid;
    box-shadow: -7px 7px #1f55f5;
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(21%) sepia(95%) saturate(4379%) hue-rotate(227deg)
      brightness(100%) contrast(92%);
  }

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`

export const Select = styled.select`
  border: 2px solid #1f55f5;
  box-shadow: -5px 5px #1f55f5;
  background-color: #f6e2e2;
  height: 2.2rem;
  padding: 0 0.5rem;
  color: #1f55f5;
  font-size: 1.2rem;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 0;

  :focus {
    outline-style: solid;
    box-shadow: -7px 7px #1f55f5;
  }
`
