import React from "react";
import {Link} from 'react-router-dom'
import {MDBContainer, MDBNavbar} from "mdb-react-ui-kit";

const UserNav = () => (
    <MDBNavbar className='shadow-0'>
        <MDBContainer className='w-50'>
                <Link to='dashboard' className='py-2 text-uppercase w-100'>Dashboard</Link>
                <Link to='password' className='py-2 text-uppercase w-100'>Password</Link>
                <Link to='wishlist' className='py-2 text-uppercase w-100'>Wishlist</Link>
        </MDBContainer>
    </MDBNavbar>
)

export default UserNav