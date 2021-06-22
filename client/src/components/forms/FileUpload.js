import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import {useSelector} from "react-redux";
import {
    MDBBadge,
    MDBContainer,
    MDBInput
} from "mdb-react-ui-kit";

const FileUpload = ({values, setValues, setLoading}) => {
    const {user} = useSelector((state) => ({...state}))
    const fileUploadAndResize = (e) => {
        let files = e.target.files
        let allUploadedFiles = values.images
        if (files) {
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
                    axios.post(process.env.REACT_APP_UPLOAD_IMAGE_API, {image: uri}, {
                        headers: {
                            authtoken: user ? user.token : ''
                        }
                    }).then((res) => {
                        setLoading(false)
                        allUploadedFiles.push(res.data)
                        setValues({...values, images: allUploadedFiles})
                    })
                        .catch(err => {
                            setLoading(false)
                        })
                }, 'base64')
            }
        }
    }

    const handleImageRemove = (public_id) => {
        setLoading(true)
        axios.post(process.env.REACT_APP_REMOVE_IMAGE_API, {public_id}, {
            headers: {
                authtoken: user ? user.token : ''
            }
        }).then((res) => {
            setLoading(false)
            const {images} = values
            let filterImages = images.filter((item) => {
                return item.public_id !== public_id
            })
            setValues({...values, images: filterImages})
        }).catch(err => {
            setLoading(false)
        })
    }

    return (
        <MDBContainer className={'p-0 w-100'}>
            <MDBContainer className={'p-3 d-flex flex-wrap '}>
                {values.images && values.images.map((image) => (
                    <div key={image.url}>
                        <img src={image.url}
                             style={{width: '100px', height: '120px', objectFit: 'cover'}} className={' m-2 rounded'}/>
                        <MDBBadge style={{
                            transform: 'translate(-12px, -8px)',
                            cursor: 'pointer',
                            width: '20px',
                            height: '20px',
                            fontSize: '14px'
                        }} color='danger' notification
                                  pill key={image.public_id} onClick={
                            () => handleImageRemove(image.public_id)
                        }>
                            X
                        </MDBBadge>
                    </div>
                ))}
            </MDBContainer>
            <MDBContainer className='d-flex row w-75 mx-3 px-0'>
                <h5 className='px-0'>Chose file</h5>
                <MDBInput type="file" multiple accept='image/*' onChange={fileUploadAndResize}/>
            </MDBContainer>
        </MDBContainer>
    )
}

export default FileUpload