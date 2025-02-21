import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const Navbar = ({ children }: Props) => {
  return (
    <div style={{ backgroundColor: 'red' }}>
      <div className='nav'>
        <div className='logo'>
          <Link className='nav-link' to='/'>
            Lennythedev
          </Link>
        </div>
        <div>
          <div className='nav-links'>
            <div className='nav-item'>
              <Link className='nav-link' to='/'>
                Home
              </Link>
            </div>
            <div className='nav-item'>
              <Link className='nav-link' to='/skills'>
                Skills
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Navbar;
