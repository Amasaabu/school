import React, {useEffect} from 'react'
import {Table, Spinner} from 'react-bootstrap'
import classes from './lecturers.module.css'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../store/actions/index'
import withErrorHandler from '../../hoc/withErrorHandler'

const Lecturers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getLecturers())
    }, [dispatch])

    const {lecturers, loading} = useSelector((state)=>{
        return {
            lecturers: state.lecturer.lectData,
            loading: state.lecturer.loading
        }
    })
    const spinner = loading?<Spinner animation="grow" variant="success" />:null

    const content = lecturers.map((it, index)=>{
        return(
            <tr key={index}>
                <td>{index+1}</td>
                {Object.keys(it).map((x)=>{
                return (
                    <>
                    <td>{it[x].map((y)=>{
                        return (
                            <>
                            {y[0]}
                            <br/>
                            </>
                        )
                    })}</td>
                    <td>{x}</td>
                    </>
                )
            })}</tr>
        )
    })
    return (
        <>
        <div className={classes.spinner}>{spinner}</div>
        <div className={classes.table}>
            <Table size='md' hover border='true'>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Subject</th>
                        <th>Lecturer</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </Table>
        </div>
        </>
    )
}

export default withErrorHandler(Lecturers)