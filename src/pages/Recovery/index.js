import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Logo from "./../../assests/logotry.png";
import { resetPasswordStart, resetUserState } from './../../redux/User/user.actions';
import "./styles.scss";


const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
});


const Recovery = props => {
    const history  = useHistory();
    const dispatch = useDispatch();

    const {resetPasswordSuccess, userErr} = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(resetPasswordSuccess){
            dispatch(resetUserState());
            history.push('/login');
        }

    }, [resetPasswordSuccess, dispatch, history]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length > 0){
            setErrors(userErr);
        }

    }, [userErr]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPasswordStart({ email }));
    }

        return (
            <div className="signin">
                <div className="wrap">
                    <div className="login">
                    
                        <h1><img src={Logo} alt="logo"/></h1>

                        <p className="trouble">Trouble Logging In?</p>

                        <p className="troubled">Enter your email, or phone and we'll send you a link to get back into your account.</p>

                        <form onSubmit={handleSubmit}>
                        {errors.length > 0 && (
                            <ul>
                                {errors.map((e, index) => {
                                    return (
                                        <li key={index}>
                                            {e}
                                        </li>
                                    );
                                } )}
                            </ul>
                        )}
                        <input placeholder="Phone number, or email" type="text" name="email" value={email} 
                            onChange={e => setEmail(e.target.value)} />

                        <input className="login_button" type="submit" value="Send Login Link" /><br/>
                        </form>
                        <div className="divider"><b>OR</b></div>
    
                        <div className="fbwrapper"><div className="fb">
                            <small>Create New Account</small>
                        </div>
                        </div>
    
                    </div>
    
                    <div className="backTo">
      
                        <p>Back To Login</p>
      
                    </div>
    
                </div>
    
            </div>
        );

    }




export default Recovery;