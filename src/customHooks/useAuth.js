import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const useAuth = props => {
    const {currentUser} = useSelector(mapState);
    const history = useHistory();

    useEffect(() => {
        console.log("hello")
        console.log(currentUser)

        console.log("hello")

        if(!currentUser){
            history.push('/');
        }

    }, [currentUser, history]);

    console.log(currentUser)

    return currentUser;
};

export default useAuth;