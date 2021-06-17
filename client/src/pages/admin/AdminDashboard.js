import React from "react";
import AdminNav from "../../components/nav/AdminNav";
import {MDBContainer} from "mdb-react-ui-kit";

const AdminDashboard = () => (
    <MDBContainer className='p-0 d-flex' fluid>
            <MDBContainer className='w-25'>
                <AdminNav/>
            </MDBContainer>
            <MDBContainer className='d-flex row w-75'>
                admin dashboard
            </MDBContainer>
    </MDBContainer>
)


export default AdminDashboard