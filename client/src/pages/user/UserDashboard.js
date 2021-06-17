import React from "react";
import {MDBContainer} from "mdb-react-ui-kit";
import UserNav from "../../components/nav/UserNav";

const UserDashboard = () => (
    <MDBContainer className='p-0 d-flex' fluid>
        <MDBContainer className='w-25'>
                <UserNav/>
        </MDBContainer>
        <MDBContainer className='d-flex row w-75'>
            user dashboard
        </MDBContainer>
    </MDBContainer>
)

export default UserDashboard