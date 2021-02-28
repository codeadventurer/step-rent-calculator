import { useState } from 'react'

import Calculator from './components/Calculator'
import Result from './components/Result'

import { Container } from './styles/App'

function App() {
  const [steps, setSteps] = useState({})

  const handleSubmit = (rentSteps) => {
    setSteps(rentSteps)
  }

  return (
    <Container>
      <Calculator onSubmit={handleSubmit} />
      <Result steps={steps} />
    </Container>
  )
}

export default App
