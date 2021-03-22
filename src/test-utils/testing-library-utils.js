import { render } from '@testing-library/react'
import { StepsProvider } from '../context/steps-context'

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: StepsProvider, ...options })

// re-export everything from

export * from '@testing-library/react'

//overwrite render method
export { renderWithContext as render }
