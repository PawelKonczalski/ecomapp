import React, {useState, useEffect} from "react";
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {MDBBtn, MDBContainer, MDBInput} from "mdb-react-ui-kit";

function ForgotPassword({history}) {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        if (user && user.token) {
            history.push('/')
        }
    }, [user, history])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_FORGOTPASSWORD_REDIRECT,
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email, config).then(() => {
            setEmail('');
            setLoading(false);
            toast.success('Check your e-amil for password reset link')
        }).catch((error) => {
            setLoading(false);
            toast.error(error.message);
        })
    }

    return (
        <MDBContainer className='p-5 w-50'>
            {loading ? <h4 className='text-danger'>Loading</h4> : <h4>Forgot Password</h4>}
            <form onSubmit={handleSubmit}>
                <MDBInput type='email' value={email} onChange={e => setEmail(e.target.value)} label='Type your email'
                          className='mt-3' autoFocus/>
                <MDBBtn type='submit' rounded className='mt-3 w-25' disabled={!email}>Submit</MDBBtn>
            </form>
        </MDBContainer>);
}

export default ForgotPassword