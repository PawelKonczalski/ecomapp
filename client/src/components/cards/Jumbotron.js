import React from "react";
import Typewriter from 'typewriter-effect';
import {MDBContainer} from "mdb-react-ui-kit";

const Jumbotron = ({text}) => (
    <MDBContainer fluid className={'d-flex w-100 justify-content-center align-items-center text-danger h1 bg-light'} style={{height: '200px'}}>
        <Typewriter options={{
            strings: text,
            autoStart: true,
            loop: true
        }}/>
    </MDBContainer>
)


export default Jumbotron