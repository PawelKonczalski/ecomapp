import React from "react";
import AdminNav from "../../components/nav/AdminNav";
import {MDBContainer} from "mdb-react-ui-kit";

const AdminDashboard = () => {
    return (
        <MDBContainer className='p-0 d-flex' fluid>
            <MDBContainer className='w-25'>
                <AdminNav/>
            </MDBContainer>
            <MDBContainer className='d-flex row w-75'>
              <h4 className={'my-4 ps-3 text-uppercase'}>Admin Dashboard</h4>
            </MDBContainer>
        </MDBContainer>
    )
}


export default AdminDashboard