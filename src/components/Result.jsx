import { useSteps } from '../context/steps-context'

import { PairContainer, Header, PairItem, Image } from '../styles/Result'

export default function Result() {
  const [steps] = useSteps()

  const values = Object.values(steps)

  if (!values.length) return <Image src='undraw_coming_home.svg' alt='house-img'/>

  return (
    <PairContainer>
      <Header>Date</Header>
      <Header>Rent amount(€)</Header>
      {values.map((value, index) => (<PairItem key={index}>{value}</PairItem>))}
    </PairContainer>
  )
}
