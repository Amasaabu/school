import {useState} from 'react'
import axios from 'axios'

const useUpload = () => {
    const [imageName, setimageName] = useState('')
    const fileUploadHandler =async (e)=>{
        try {
        console.log(e.target.files[0].name)  
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        const {data} = await axios.post('/uploads/images', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            console.log(data);
            setimageName(data)
        } catch (error) {
            console.log(error);
        }

    }
    return {
        fileUploadHandler,
        imageName
    }
}

export default useUpload
