import React from "react";
import {MDBBtn, MDBInputGroup, MDBInputGroupElement} from "mdb-react-ui-kit";

const CategoryForm = ({handleSubmit, setName, loading, name, header}) => (
    <form onSubmit={handleSubmit} className='px-0 mb-3'>
        <label className='form-label px-3 text-black'>
            Name
        </label>
        <MDBInputGroup className='w-75 px-3'>
            {loading ? <h4 className='text-danger'>Loading...</h4> :
                <MDBInputGroupElement type='text' onChange={(e) => setName(e.target.value)} value={name}
                                      placeholder={header} autoFocus required/>}
            <MDBBtn type='submit' disabled={loading} outline>Save</MDBBtn>
        </MDBInputGroup>
    </form>
)

export default CategoryForm