import React from "react";
import {MDBBtn, MDBInputGroup, MDBInputGroupElement} from "mdb-react-ui-kit";

const CategoryForm = ({handleSubmit, setName, loading, name}) => (
    <form onSubmit={handleSubmit} className='px-0 mb-3'>
        <label className='form-label px-3'>
            Name
        </label>
        <MDBInputGroup className='w-75 px-3'>
            {loading ? <h4 className='text-danger'>Loading...</h4> :
                <MDBInputGroupElement type='text' onChange={(e) => setName(e.target.value)} value={name}
                                      placeholder="Category name" autoFocus required/>}
            <MDBBtn type='submit' disabled={loading} outline>Save</MDBBtn>
        </MDBInputGroup>
    </form>
)

export default CategoryForm