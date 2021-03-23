import styled from 'styled-components'

export const PairContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 40%;

  @media (max-width: 1024px) {
    width: 60%;
  }

  @media (max-width: 600px) {
    width: 70%;
  }
`

export const Header = styled.h3`
  width: 50%;
  margin-bottom: 0.5rem;
  font-weight: 900;
`

export const PairItem = styled.p`
  width: 50%;
  margin: 0.5rem 0;
`
export const Image = styled.img`
  height: 40%;
  width: 40%;

  @media (max-width: 1024px) {
    height: 80%;
    width: 80%;
  }
`
