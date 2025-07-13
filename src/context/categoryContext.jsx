import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let categoryContext = createContext(0)


export default function categoryContextProvider({ children }) {
    const [category, setCategory] = useState([])

    async function showAllCategories() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')

            setCategory(data.data)
            console.log(data.data);
        } catch (error) {
            setCategory(error.response.data.message)
        }
    }

    useEffect(() => {
        showAllCategories()
    }, [])

    return <>
        <categoryContext.Provider value={{ showAllCategories, category }}>
            {children}

        </categoryContext.Provider>
    </>
}
