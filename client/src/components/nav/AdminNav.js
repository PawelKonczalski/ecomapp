import React from "react";
import {Link} from 'react-router-dom'
import {MDBContainer, MDBNavbar} from "mdb-react-ui-kit";

const AdminNav = () => (
    <MDBNavbar className='shadow-0'>
        <MDBContainer className='w-50'>
            <Link to='dashboard' className='py-2 text-uppercase w-100'>Dashboard</Link>
            <Link to='product' className='py-2 text-uppercase w-100'>Product</Link>
            <Link to='products' className='py-2 text-uppercase w-100'>Products list</Link>
            <Link to='category' className='py-2 text-uppercase w-100'>Category</Link>
            <Link to='sub' className='py-2 text-uppercase w-100'>Sub category</Link>
            <Link to='discounts' className='py-2 text-uppercase w-100'>Discounts</Link>
            <Link to='/user/password' className='py-2 text-uppercase w-100'>Password</Link>
        </MDBContainer>
    </MDBNavbar>
)

export default AdminNav