import HeaderContainer from "./styledHeader"
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderContainer>
      <ul>
        <li><Link to='/'>Cadastro</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
      </ul>
    </HeaderContainer>
  )
}

export default Header;