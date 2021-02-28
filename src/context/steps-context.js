import { createContext, useContext, useState, useMemo } from 'react'

const StepsContext = createContext()

function useSteps() {
  const context = useContext(StepsContext)
  if (!context) {
    throw new Error(`useSteps must be used within a StepsProvider`)
  }
  return context
}

function StepsProvider(props) {
  const [steps, setSteps] = useState({})
  const value = useMemo(() => [steps, setSteps], [steps])

  return <StepsContext.Provider value={value} {...props} />
}

export { StepsProvider, useSteps }
