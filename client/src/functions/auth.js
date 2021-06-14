import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API, {}, {
        headers: {
            authtoken,
        }
    })
}

export const currentUser = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_CURRENT_USER_API, {}, {
        headers: {
            authtoken,
        }
    })
}

export const currentAdmin = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_ADMIN_API, {}, {
        headers: {
            authtoken,
        }
    })
}

