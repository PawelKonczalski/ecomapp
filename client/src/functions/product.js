import axios from "axios";

export const createProduct = async (product, authtoken) => (
    await axios.post(process.env.REACT_APP_PRODUCT_API, product, {
        headers: {
            authtoken
        }
    })
)

export const getProductsByCount = async (count) => (
    await axios.get(`${process.env.REACT_APP_GET_PRODUCTS_API}/${count}`)
)

export const removeProduct = async (slug, authtoken) => (
    await axios.delete(`${process.env.REACT_APP_PRODUCT_API}/${slug}`, {
        headers: {
            authtoken
        }
    })
)