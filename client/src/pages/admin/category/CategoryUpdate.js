import React, {useState, useEffect} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {
    MDBBtn,
    MDBContainer,
    MDBInputGroup,
    MDBInputGroupElement
} from "mdb-react-ui-kit";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {getCategory, updateCategory} from "../../../functions/category";


const CategoryUpdate = ({history, match}) => {
    const {user} = useSelector(state => ({...state}))
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
            getCategory(match.params.slug)
                .then((c) => setName(c.data.slug))
    }, [match])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateCategory(match.params.slug, {name}, user.token)
            .then((res) => {
                setLoading(false)
                setName('')
                toast.success(`"${res.data.slug}" is updated`)
                history.push('/admin/category')
            })
            .catch((err) => {
                setLoading(false)
                if (err.response.status === 400) {
                    toast.error(err.response.data)
                }
            })
    }

    const CategoryForm = () => (
        <form onSubmit={handleSubmit} className='px-0'>
            <label className='form-label px-3'>
                Name
            </label>
            <MDBInputGroup className='w-75 px-3'>
                {loading ? <h4 className='text-danger'>Loading...</h4> :
                    <MDBInputGroupElement type='text' onChange={(e) => setName(e.target.value)} value={name}
                                          placeholder="Category name" autoFocus required/>}
                <MDBBtn type='submit' disabled={loading} outline>Update</MDBBtn>
            </MDBInputGroup>
        </form>
    )

    return (
        <MDBContainer className='p-0' fluid>
            <div className='d-flex'>
                <div className='w-25'>
                    <AdminNav/>
                </div>
                <div className='d-flex row w-75'>
                    <h4 className=' my-4 text-uppercase'>Update category</h4>
                    {CategoryForm()}
                </div>
            </div>
        </MDBContainer>
    )
}

export default CategoryUpdate