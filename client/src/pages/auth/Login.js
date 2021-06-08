import React, {useState} from "react";
import {MDBBtn, MDBContainer, MDBIcon, MDBInput} from "mdb-react-ui-kit";
import {auth} from "../../firebase";
import {toast} from "react-toastify";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password)

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
                    <h4>Logi</h4>
                    {loginForm()}
                </div>
            </div>
        </MDBContainer>
    )
}

export default Login