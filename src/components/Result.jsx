import { useSteps } from '../context/steps-context'

import { PairContainer, Header, PairItem } from '../styles/Result'

export default function Result() {
  const [steps] = useSteps()

  const values = Object.values(steps)

  if (!values.length) return null

  return (
    <PairContainer>
      <Header>Date</Header>
      <Header>Rent amount(€)</Header>
      {values.map((value, index) => (<PairItem key={index}>{value}</PairItem>))}
    </PairContainer>
  )
}
