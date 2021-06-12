import React from "react";
import {Link} from 'react-router-dom'
import {MDBContainer, MDBNavbar, MDBNavbarItem} from "mdb-react-ui-kit";

const UserNav = () => (
    <MDBNavbar className='shadow-0'>
        <MDBContainer className='w-50'>
            <MDBNavbarItem tag='a' className='py-2 text-uppercase'>
                <Link to='dashboard'>Dashboard</Link>
            </MDBNavbarItem>
            <MDBNavbarItem tag='a' className='py-2 text-uppercase'>
                <Link to='password'>Password</Link>
            </MDBNavbarItem>
            <MDBNavbarItem tag='a' className='py-2 text-uppercase'>
                <Link to='wishlist'>Wishlist</Link>
            </MDBNavbarItem>
        </MDBContainer>
    </MDBNavbar>
)

export default UserNav