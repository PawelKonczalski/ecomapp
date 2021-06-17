import axios from "axios";

export const getSubs = async () => (
    await axios.get(process.env.REACT_APP_SUBS_API)
)

export const getSub = async (slug) => (
    await axios.get(`${process.env.REACT_APP_SUB_API}/${slug}`)
)

export const removeSub = async (slug, authtoken) => (
    await axios.delete(`${process.env.REACT_APP_SUB_API}/${slug}`,
        {
            headers: {
                authtoken
            }
        })
)

export const updateSub = async (slug, sub, authtoken) => (
    await axios.put(`${process.env.REACT_APP_SUB_API}/${slug}`, sub,
        {
            headers: {
                authtoken
            }
        })
)

export const createSub = async (sub, authtoken) => (
    await axios.post(process.env.REACT_APP_SUB_API, sub, {
        headers: {
            authtoken
        }
    })
)