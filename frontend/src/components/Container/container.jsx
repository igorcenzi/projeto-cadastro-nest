import StyledContainer from "./styledContainer"

const Container = ({children}) => {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  )
}
export default Container