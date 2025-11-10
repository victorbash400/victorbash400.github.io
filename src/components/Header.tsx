import type { FC } from "react";
import avatar from "../../assets/Perfil.jpeg";
import codeGif from "../../assets/icons8-code.gif";

const Header: FC = () => {
  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header__inner">
          <a className="site-header__brand" href="#top" aria-label="Victor Bash home">
            <span className="site-header__logo">
              <img src={avatar} alt="Victor Bash" />
            </span>
            <span className="site-header__title">Victorbash</span>
          </a>

          <div className="site-header__right-group">
            <div className="site-header__gif">
              <img src={codeGif} alt="Animated coding icon" style={{ width: '45px', height: 'auto' }} />
            </div>

            <nav className="site-header__nav" aria-label="Primary">
              <span className="site-header__pill">TypeScript</span>
              <span className="site-header__pill">Python</span>
              <span className="site-header__pill">Rust</span>
              <span className="site-header__pill">C</span>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
