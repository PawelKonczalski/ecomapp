import React from "react";
import {MDBContainer} from "mdb-react-ui-kit";
import UserNav from "../../components/nav/UserNav";

const UserDashboard = () => (
    <MDBContainer className='p-0' fluid>
        <div className='d-flex'>
            <div className=''>
                <UserNav/>
            </div>
            <div className='d-flex justify-content-center align-items-center w-75'>user dashboard</div>
        </div>
    </MDBContainer>
)

export default UserDashboard