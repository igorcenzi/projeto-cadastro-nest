import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100%;
  background-color: #6024F2;
  padding: 12px 24px;
  margin-bottom: 20px;

  ul{
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;

    a{
      color: white;
      text-decoration: none;
      
      :hover{
        color: #AAAAAA;
      }
    }
  }
`
export default HeaderContainer;