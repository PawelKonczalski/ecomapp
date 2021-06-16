import React from "react";
import {MDBInput} from "mdb-react-ui-kit";

const LocalSearch = ({ search, setSearch}) => {
    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.value.toLowerCase())
    }

    return (
        <MDBInput label='Search item' type='search' value={search} onChange={handleSearch}/>
    )
}

export default LocalSearch