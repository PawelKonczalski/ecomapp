import React from "react";
import {
    MDBBtn,
    MDBBtnGroup,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBContainer
} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";

const AdminProductCart = ({product, handleRemove}) => {
    const {title, description, images, slug} = product
    return (
        <MDBContainer className={'d-flex'} style={{width: '360px'}}>
            <MDBCard background='primary' className={'my-3'} style={{maxWidth: '22rem'}}>
                <MDBCardImage style={{maxHeight: '264px', objectFit: 'cover'}}
                              src={images && images.length ? images[0].url : 'https://placeimg.com/640/480/people'} position='top' alt='...'/>
                <MDBCardBody>
                    <MDBCardTitle className={'text-white'}>{title}</MDBCardTitle>
                    <MDBCardText className={'text-white'}>
                        {`${description && description.substring(0, 50)}...`}
                    </MDBCardText>
                    <MDBBtnGroup className={'w-100'} shadow='0'>
                       <Link className={'ripple ripple-surface btn btn-warning '} to={`/admin/product/${slug}`} >
                           Edit
                           {/*<MDBBtn color='warning'>Edit</MDBBtn>*/}
                       </Link>
                        <MDBBtn color='danger' onClick={() => handleRemove(slug)}>Delete</MDBBtn>
                    </MDBBtnGroup>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    )
}

export default AdminProductCart