import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Alert} from 'react-bootstrap'

const WithError=(Component)=>{
    const ErrorWrapper = props => {
    const [error, setError] = useState(null);
    
    const requestInterseptors = axios.interceptors.request.use(req=>{
        setError(null)
        return req
    })
        const responseInterceptors =axios.interceptors.response.use(req=>req, err=>{
            if (err.response.data.message){
                setError(err.response.data.message)
                // return Promise.reject('error')
            } else {
                setError(err.response.data)
                // return Promise.reject('error')
            }
        })


    useEffect(()=>{
        return ()=>{
            axios.interceptors.request.eject(responseInterceptors)
            axios.interceptors.response.eject(requestInterseptors)
        }
    }, [requestInterseptors, responseInterceptors])

        const alert = <div>
            <Alert variant='success' onClose={() => setError(null)} dismissible>
                <Alert.Heading>
                    Oh! Snap Something went Wrong
            </Alert.Heading>
                <p>
                    {error}
                </p>
            </Alert>
        </div>
       
        return(
            <>
                {error?alert: null}
                <Component {...props}/>
            </>
        )
    }
    return ErrorWrapper
}
    

export default WithError