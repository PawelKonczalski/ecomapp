import React, {useState, useEffect} from "react";
import {MDBBtn, MDBContainer, MDBInput} from "mdb-react-ui-kit";
import {auth} from "../../firebase";
import {toast} from "react-toastify";

function RegisterComplete({history}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('E-mail and password is required')
            return;
        } else if (password.length < 6) {
            toast.error('Password must be at least 6 characters long')
            return;
        } else if (password !== passwordConfirm) {
            toast.error('Passwords are different please enter the same passwords')
            return;
        } else {
            try {
                const result = await auth.signInWithEmailLink(
                    email,
                    window.location.href);
                if (result.user.emailVerified) {
                    window.localStorage.removeItem('emailForRegistration');
                    let user = auth.currentUser;
                    await user.updatePassword(password);
                    const idTokenResult = await user.getIdTokenResult();
                    history.push('/')
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <MDBInput type='email' label='Enter your email' value={email} disabled/>
            <MDBInput type='password' label='Password' className='mt-3' value={password}
                      onChange={e => setPassword(e.target.value)} autoFocus/>
            <MDBInput type='password' label='Confirm Password' className='mt-3' value={passwordConfirm}
                      onChange={e => setPasswordConfirm(e.target.value)}/>
            <MDBBtn type='submit' rounded className='mt-3'>Complete Registration</MDBBtn>
        </form>
    )

    return (
        <MDBContainer className='p-5'>
            <div className='d-flex flex-row justify-content-center'>
                <div className='w-50'>
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </MDBContainer>
    )
}

export default RegisterComplete