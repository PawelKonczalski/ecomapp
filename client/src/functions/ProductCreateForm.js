import React from "react";
import {MDBBtn, MDBContainer, MDBInputGroup, MDBInputGroupElement} from "mdb-react-ui-kit";

const ProductCreateForm = ({handleSubmit, handleChange, values}) => {
    const {title, slug, description, price, categories, category, subs, quantity, images, shipment, shipping, languages,
        language, brands, brand} = values

    return (
        <form onSubmit={handleSubmit}>
            <MDBInputGroup className='py-2 w-75'>
                <MDBInputGroupElement type='text' name='title' value={title} placeholder='Title'
                                      onChange={handleChange}/>
            </MDBInputGroup>
            <MDBInputGroup className='py-2 w-75'>
                <MDBInputGroupElement type='text' name='description' value={description}
                                      placeholder='Description' onChange={handleChange}/>
            </MDBInputGroup>
            <MDBInputGroup className='py-2 w-25'>
                <MDBInputGroupElement type='number' name='price' value={price} placeholder='Price'
                                      onChange={handleChange}/>
            </MDBInputGroup>
            <MDBInputGroup className='py-2 w-25'>
                <MDBInputGroupElement type='number' name='quantity' value={quantity}
                                      placeholder='Quantity' onChange={handleChange}/>
            </MDBInputGroup>
            <MDBInputGroup>
                <MDBContainer className='p-0 py-3'>
                    <h5>Shipping</h5>
                    <select name="shipping" className='form-control w-50 bg-info text-white'
                            onChange={handleChange} defaultValue={'default'}>
                        <option value='default' disabled>Please select</option>
                        {shipment.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                </MDBContainer>
            </MDBInputGroup>
            <MDBInputGroup>
                <MDBContainer className='p-0 py-3'>
                    <h5>Language</h5>
                    <select name="language" className='form-control w-50 bg-info text-white'
                            onChange={handleChange} defaultValue={'default'}>
                        <option value='default' disabled>Please select</option>
                        {languages.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                </MDBContainer>
            </MDBInputGroup>
            <MDBInputGroup>
                <MDBContainer className='p-0 py-3'>
                    <h5>Brands</h5>
                    <select name="brand" className='form-control w-50 bg-info text-white'
                            onChange={handleChange} defaultValue={'default'}>
                        <option value='default' disabled>Please select</option>
                        {brands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                </MDBContainer>
            </MDBInputGroup>
            <MDBContainer className='w-100 m-0 px-0 my-3'>
                <h5>Categories</h5>
                <select name="category" id="" className='form-control w-50 bg-info text-white'
                        onChange={handleChange} defaultValue={'default'}>
                    <option value='default' disabled>Please select</option>
                    {categories.length > 0 && categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.slug}</option>))}
                </select>
            </MDBContainer>
            <MDBBtn type='submit' rounded className='w-25 my-3'>Save</MDBBtn>
        </form>
    )
}
export default ProductCreateForm