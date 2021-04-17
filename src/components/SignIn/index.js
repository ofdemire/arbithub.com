import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {emailSignInStart, googleSignInStart} from './../../redux/User/user.actions';

import "./styles.scss";
import Logo from "./../../assests/logotry.png";

const mapState = ({user}) => ({
    currentUser: user.currentUser
}) 


const SignIn = props => { 
    const history = useHistory();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
            resetForm();
            history.push('/');
        }

    }, [currentUser, dispatch, history])

    const resetForm = () => {
        setEmail('');
        setPassword('');

    };

    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(emailSignInStart({email,password}));
    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart());
    }
    
    return (
        <div className="signin">
            <div className="wrap">
                <div className="login">
                    <h1><img src={Logo} alt="logo"/></h1>
                    <form onSubmit={handleSubmit}>

                    <input placeholder="Phone number, or email" type="text" value={email}
                        onChange={e => setEmail(e.target.value)} 
                    name="email" />

                    <input placeholder="Password" type="password" value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    name="password"/>

                    <input className="login_button" type="submit" value="Log In" /><br/>
                    </form>
                    <div className="divider"><b>OR</b></div>
    
    
                    <div className="fbwrapper"><div className="fb">
                        <small onClick={handleGoogleSignIn} >Log in with Google</small>
                    </div>
                    </div>
                    <div className="forgotwrapper"><Link to="/recovery"><div className="forgot"><small>Forgot password?</small></div></Link></div>

                </div>
    
                <div className="infobox">
                    <p>Don't have an account? <a href="https://instagram.com">Sign up</a></p>
                </div>
    
            </div>
    
        </div>
    );

    

}

export default SignIn;