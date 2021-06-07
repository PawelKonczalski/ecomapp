import React, {useState} from "react";
import {Link} from "react-router-dom";
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

    const handleActive = (ele) => {
        if ((ele.target.classList[0] === 'navbar-brand' || ele.target.classList[0] === 'nav-link') && ele.target.classList[ele.target.classList.length - 1] !== 'active') {
            document.querySelector('.active').classList.remove('active')
            ele.target.classList.add('active')
        } else if (ele.target.classList[0] === 'fa' && ele.target.parentElement.classList[ele.target.classList.length - 1] !== 'active'){
            document.querySelector('.active').classList.remove('active')
            ele.target.parentElement.classList.add('active')
        }
    }

    return (
        <>
            <MDBNavbar expand='lg' dark bgColor='primary'>
                <MDBContainer fluid>
                    <Link to="/" className="navbar-brand active" onClick={handleActive}>
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
                            <MDBNavbarItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle tag='a' className='nav-link'>
                                        <MDBIcon icon='cog pe-2'/>
                                        Username
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem>
                                            <MDBDropdownLink href='#'>option 1</MDBDropdownLink>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem>
                                            <MDBDropdownLink href='#'>option 2</MDBDropdownLink>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>
                            <MDBNavbarItem className={showMenu ? '' : 'ms-auto'}>
                                <Link to='login' className='nav-link' onClick={handleActive}>
                                    <MDBIcon icon='fas fa-sign-in-alt pe-2'/>
                                    Login
                                </Link>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <Link to='register' className='nav-link' onClick={handleActive}>
                                    <MDBIcon icon='far fa-registered pe-2'/>
                                    Register
                                </Link>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    )
}

export default Header