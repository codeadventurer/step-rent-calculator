import styled from 'styled-components'

export const BackgroundContainer = styled.div`
  background-color: #f6e2e2;
  min-height: 100vh;
  padding: 0 5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 5rem 0.5rem;
  }

  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1200px;

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`
