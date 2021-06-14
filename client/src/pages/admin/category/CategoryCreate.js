import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {MDBContainer} from "mdb-react-ui-kit";

const CategoryCreate = () => (
    <MDBContainer className='p-0' fluid>
        <div className='d-flex'>
            <div className='w-25'>
                <AdminNav/>
            </div>
            <div className='d-flex justify-content-center align-items-center w-75'>category create</div>
        </div>
    </MDBContainer>
)


export default CategoryCreate