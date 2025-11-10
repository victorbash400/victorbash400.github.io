import type { FC } from "react";
import logo from "../../assets/Perfil.jpeg";

const Header: FC = () => {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header__inner">
          <div className="header__brand">
            <img src={logo} alt="Victor Bash" className="header__avatar" />
            <div className="header__info">
              <span className="header__name">Victor Bash</span>
              <span className="header__tagline">Full-Stack Developer</span>
            </div>
          </div>
          <nav className="header__nav">
            <a className="nav-link" href="https://github.com/victorbash400" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="nav-link" href="https://devpost.com/victorbash400780" target="_blank" rel="noreferrer">
              Devpost
            </a>
            <a className="nav-link nav-link--primary" href="mailto:victorbash400@gmail.com">
              Contact Me
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
