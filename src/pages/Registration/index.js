import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { signUpUserStart } from './../../redux/User/user.actions'
import {useHistory} from 'react-router-dom';
import Logo from "./../../assests/logotry.png";
import "./styles.scss";

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const Registration = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {currentUser, userErr} = useSelector(mapState);

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(currentUser) {
            reset();
            history.push('/');
        }
    }, [currentUser, dispatch, history]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length > 0){
            setErrors(userErr);
        }

    }, [userErr]);

    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    };



    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }));
    }


    return (
        <div className="signin">
            <div className="wrap">
                <div className="sign-up">
                    <h1><img src={Logo} alt="logo"/></h1>

                    <input className="login_button" type="submit" value="Log in with Google" />
                    <div className="divider"><b>OR</b></div>
                    <form onSubmit={handleSubmit}>

                    <input placeholder="Mobile Number or Email" type="text" value={email} name="email" 
                        onChange={e => setEmail(e.target.value)} />

                    <input placeholder="Full Name" type="text" value={displayName} name="displayName" 
                        onChange={e => setDisplayName(e.target.value)} />

                    <input placeholder="Password" type="password" value={password} name="password" 
                        onChange={e => setPassword(e.target.value)}/>

                    <input placeholder="Confirm Password" type="password" value={confirmPassword} name="confirmPassword" 
                        onChange={e => setConfirmPassword(e.target.value)}/>

                    <input className="login_button addPadding" type="submit" value="Sign up" /><br/>
                    </form>
                    <small>By signing up, you agree to our Terms and Data Policy.</small>

                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) =>{
                                return(
                                    <li key={index}>
                                        {err}
                                    </li>

                                );
                            })}
                        </ul>
                    )}
    
                </div>
    
                <div className="infobox">
                    <p>Have an account? <a href="https://instagram.com">Log in</a></p>
                </div>
    
            </div>
    
        </div>
    );

}



export default Registration;