import React, {useState} from "react";
import firebase from "firebase";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBCollapse
} from 'mdb-react-ui-kit';

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    let dispatch = useDispatch();
    let {user} = useSelector((state) => ({...state}));
    let history = useHistory();

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
        history.push('/login')
    }

    return (
        <>
            <MDBNavbar expand='lg' dark bgColor='primary'>
                <MDBContainer fluid>
                    <Link to="/" className="navbar-brand active">
                        <MDBIcon icon='fas fa-home pe-2'/>
                        Home
                    </Link>
                    <MDBNavbarToggler
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <MDBIcon icon='bars' size='lg'/>
                    </MDBNavbarToggler>
                    <MDBCollapse navbar show={showMenu}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                            {user && (
                            <MDBNavbarItem className={showMenu ? '' : 'ms-auto'}>
                                <MDBDropdown>
                                    <MDBDropdownToggle tag='a' className='nav-link'>
                                        <MDBIcon icon='cog pe-2'/>
                                        {user.email && user.email.split('@')[0]}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem>
                                            <MDBDropdownLink href='#'>option 1</MDBDropdownLink>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem>
                                            <MDBDropdownLink href='#'>option 2</MDBDropdownLink>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem>
                                            <MDBDropdownLink href='#' onClick={logout}>Logout</MDBDropdownLink>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            )}
                            {!user && (
                                <MDBNavbarItem className={showMenu ? '' : 'ms-auto'}>
                                    <Link to='login' className='nav-link'>
                                        <MDBIcon icon='fas fa-sign-in-alt pe-2'/>
                                        Login
                                    </Link>
                                </MDBNavbarItem>
                            )}
                            {!user && (
                                <MDBNavbarItem>
                                    <Link to='register' className='nav-link'>
                                        <MDBIcon icon='far fa-registered pe-2'/>
                                        Register
                                    </Link>
                                </MDBNavbarItem>
                            )}
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    )
}

export default Header