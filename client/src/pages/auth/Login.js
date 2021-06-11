import React, {useEffect, useState} from "react";
import {MDBBtn, MDBContainer, MDBIcon, MDBInput, MDBSpinner} from "mdb-react-ui-kit";
import {auth, googleAuthProvider} from "../../firebase";
import {toast} from "react-toastify";
import {createOrUpdateUser} from "../../functions/auth";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function Login({history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({...state}));
    let dispatch = useDispatch();

    useEffect(() => {
        if (user && user.token) {
            history.push('/')
        }
    }, [user])

    const roleBasedRedirect = (res) => {
        if(res.data.role === 'admin'){
            history.push('/admin/dashboard')
        } else {
            history.push('/user/dashboard')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()
            createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id
                        }
                    })
                    roleBasedRedirect(res)
                })
                .catch()
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    }

    const handleGoogleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider).then(async (result) => {
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult()
            createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        name: res.data.name,
                        email: res.data.email,
                        token: idTokenResult.token,
                        role: res.data.role,
                        _id: res.data._id
                    }
                })
            roleBasedRedirect(res)
        })
        .catch()
        }).catch((err) => toast.error(err.message));
    }

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <MDBInput type='email' label='Enter your email' value={email} onChange={e => setEmail(e.target.value)}
                      autoFocus/>
            <MDBInput type='password' label='Enter password' value={password} className='mt-3'
                      onChange={e => setPassword(e.target.value)}/>
            <MDBBtn type='button' rounded className='mt-3 w-100' onClick={handleSubmit}
                    disabled={!email || password < 6}>
                <MDBIcon className='me-2' icon='envelope' size='lg'/>
                Login with Email / Password
            </MDBBtn>
        </form>
    )

    return (
        <MDBContainer className='p-5'>
            <div className='d-flex flex-row justify-content-center'>
                <div className='w-50'>
                    {loading ? (<h4 className='text-danger'>Login... <MDBSpinner grow role='status'/></h4>) : (
                        <h4>Login</h4>)}
                    {loginForm()}
                    <MDBBtn type='button' rounded className='mt-3 w-100' onClick={handleGoogleLogin}
                            color='secondary'>
                        <MDBIcon className='me-2' icon='envelope' size='lg'/>
                        Login with Google
                    </MDBBtn>
                    <Link to='forgot/password'
                          className='d-flex justify-content-end mt-3 text-danger text-decoration-underline'>Forgot
                        password</Link>
                </div>
            </div>
        </MDBContainer>
    )
}

export default Login