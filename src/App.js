import { StepsProvider } from './context/steps-context'
import Calculator from './components/Calculator'
import Result from './components/Result'

import { Container, BackgroundContainer } from './styles/App'

function App() {
  return (
    <StepsProvider>
      <BackgroundContainer>
        <Container>
          <Calculator />
          <Result />
        </Container>
      </BackgroundContainer>
    </StepsProvider>
  )
}

export default App
