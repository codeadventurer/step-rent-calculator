import { StepsProvider } from './context/steps-context'
import Calculator from './components/Calculator'
import Result from './components/Result'

import { Container } from './styles/App'

function App() {
  return (
    <StepsProvider>
      <Container>
        <Calculator />
        <Result />
      </Container>
    </StepsProvider>
  )
}

export default App
