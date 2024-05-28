import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';



function LogoutPage() {
    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const [redirect, setRedirect] = useState(false);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [role, setRole] = useState('');

    // Function to clear authentication state and redirect after 3 seconds
    const logOut = () => {
        setAuth({ user, pwd, role });
        setTimeout(() => {
            setRedirect(true);
        }, 3000);
    };

    useEffect(() => {
        logOut();
    }, []);

    if (redirect) {
        navigate('/');
    }

    return (
        <div>
            <h1>Logging Out...</h1>
            <p>Gracias por usar labTEC</p>
        </div>
    );
}

export default LogoutPage;