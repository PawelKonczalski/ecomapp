import React, {useState} from "react";
import {MDBContainer, MDBInputGroupElement, MDBInputGroup, MDBInputGroupText, MDBBtn} from "mdb-react-ui-kit";
import UserNav from "../../components/nav/UserNav";
import {auth} from "../../firebase";
import {toast} from "react-toastify";

const Password = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setPassword('')
        setConfirmPassword('')
        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false)
                toast.success('Password updated')
            })
            .catch(err => {
                setLoading(false)
                toast.error(err.message)
            })
    }

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <MDBInputGroup>
                <MDBInputGroupText>Your Password</MDBInputGroupText>
                {loading ? undefined : <MDBInputGroupElement type='password' placeholder='Enter new password'
                                                             onChange={e => setPassword(e.target.value)}
                                                             value={password}/>}
                {loading ? undefined : <MDBInputGroupElement type='password' placeholder='Confirm new password'
                                                             onChange={e => setConfirmPassword(e.target.value)}
                                                             value={confirmPassword}/>}
                <MDBBtn type='submit' disabled={password !== confirmPassword || password.length < 6}
                        outline>Submit</MDBBtn>
            </MDBInputGroup>
        </form>
    )

    return (
        <MDBContainer className='p-0' fluid>
            <div className='d-flex'>
                <div className=''>
                    <UserNav/>
                </div>
                <div className='row align-self-center'>
                    {loading ? <h4 className='text-danger mb-3'>Loading...</h4> :
                        <h4 className='mb-3'>Password update</h4>}
                    {passwordUpdateForm()}
                </div>
            </div>
        </MDBContainer>
    )
}

export default Password
