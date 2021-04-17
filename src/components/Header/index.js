import React, { useState } from 'react';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import {FaBars, FaTimes} from "react-icons/fa";
import Logo from "./../../assests/logotry.png"
import Cover from "./../../assests/cover.png"
import { Link } from 'react-router-dom';
import { Button } from './../../Button';
import { signOutUserStart } from './../../redux/User/user.actions';

const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const Header = props => {

    const dispatch = useDispatch();
    const { currentUser} = useSelector(mapState);

    const signOut = () => {
        dispatch(signOutUserStart());
    };

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        }else{
            setButton(true);
        }
    }

    window.addEventListener('resize', showButton);

    return(
        <header className="navbar">
            <div className="navbar-container container">

                {button ? (
                    <Link to='/' className='navbar-logo ' onClick={closeMobileMenu}>
                        <img src={Logo} alt="logo"/>
                    </Link>
                    ) : (
                        <Link to='/' className='navbar-logo__minimized' onClick={closeMobileMenu}>
                            <img src={Cover} alt="logo"/>
                        </Link>
                )}

                <div className="menu-icon" onClick={handleClick} >
                    {click ? <FaTimes /> : <FaBars />}
                </div>

                <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                    <li className="nav-item">
                        {button ? (
                            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}></Link>
                            ) : (
                            <img src={Logo} alt="logo" onClick={closeMobileMenu}/>
                    
                        )}
                    </li>
                    <li className="nav-item">
                        <Link to='/home' className="nav-links" onClick={closeMobileMenu}>Home</Link>
                
                    </li>
                    {/* {currentUser && ( 
                        <li className="nav-item">
                            <Link to='/dashboard' className="nav-links" onClick={closeMobileMenu}>My Account</Link>
                        </li>
                    )} */}
                    {currentUser && ( 
                    <li className="nav-item">
                        <Link to='/products/undefined/undefined' className="nav-links" onClick={closeMobileMenu}>
                            Products
                        </Link>
                    </li>
                    )}

                    {!currentUser && (    
                        <li className="nav-item">
                            <Link to='/login' className="nav-links" onClick={closeMobileMenu}>
                                Log In
                            </Link>
                        </li>
                    )}

                    {!currentUser && (
                        <li className="nav-btn">
                            {button ? (
                                <Link to='/sign-up' className="btn-link" onClick={closeMobileMenu}>
                                    <Button buttonStyle='btn--outline'>SIGN UP</Button>
                                </Link>
                                ) : (
                                <Link to='/sign-up' className="btn-link" onClick={closeMobileMenu}>
                                    <Button buttonStyle='btn--outline' buttonSize='btn--mobile'>SIGN UP</Button>
                                </Link>
                            )}  
                        </li>
                    )}

                    {currentUser && ( 
                        <li className="nav-item">
                        <span className="nav-links" onClick={() => {signOut(); closeMobileMenu();}}>Log Out</span>
                        </li>
                    )}

                </ul>

                
            </div>
            <br/>

        </header>
    );
};

Header.defaultProps = {
    currentUser: null
}



export default Header;