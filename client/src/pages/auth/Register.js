import React, {useState} from "react";
import {MDBBtn, MDBContainer, MDBInput} from "mdb-react-ui-kit";
import {auth} from "../../firebase";
import {toast} from "react-toastify";

function Register() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`E-mail is send to ${email}. Click the link to complete your registration`);
        window.localStorage.setItem('emailForRegistration', email);
        setEmail('')
    }

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <MDBInput type='email' label='Enter your email' value={email} onChange={e => setEmail(e.target.value)}
                      autoFocus/>
            <MDBBtn type='submit' rounded className='mt-2'>Register</MDBBtn>
        </form>
    )

    return (
        <MDBContainer className='p-5'>
            <div className='d-flex flex-row justify-content-center'>
                <div className='w-50'>
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </MDBContainer>
    )
}

export default Register