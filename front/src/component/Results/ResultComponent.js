import React, { useEffect } from 'react'
import classes from './result.module.css'
import Grade from '../Results/Grade/grade'
import Remark from './Remark/Remark'
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/actions/index'
import DeleteButton from '../ui/Button/DeleteButton/delete'
import withErrorHandler from '../../hoc/withErrorHandler'

const ResultComponent = (props) => {
    const head = ['Course', 'Session', 'Score', 'Grade', 'Remarks'].map((it) => <th key={it}>{it}</th>)
    const data = useSelector((state) => {
        return {
            username: state.resultDetails.username,
            studentReg: state.resultDetails.studentReg,
            result: state.resultDetails.result,
            class: state.resultDetails.class,
            session: state.resultDetails.session,
            profileType: state.userProfile.profileData.profileType,
            success: state.resultDetails.deleteSuccess
        }
    })
    const session_id = props.location.search.split('=')[1]

    const dispatch = useDispatch()

    useEffect(() => {     
        if (data.profileType==='student') {
            dispatch(actions.getResultStudent(session_id))
        } else if(data.profileType === 'admin') {
            dispatch(actions.getResultAdmin(props.match.params.id,session_id))
        }
    }, [dispatch, props.match.params.id,session_id, data.profileType, data.success])

    const deleteFunc = (stud_Id, result_id )=>{
        dispatch(actions.deleteResultAdmin(stud_Id, result_id))
    }
    
    const tableContent = data.result.map((record) => {
        return (
            <>
            <tr key={record.subject.subjectName}>
                <td>{record.subject.subjectName}</td>
                <td>{data.session.year}</td>
                <td>{record.score}</td>
                <td><Grade score={record.score} /></td>
                <td><Remark score={record.score} /></td>
                {data.profileType==='admin'?<DeleteButton clicked={()=>deleteFunc(data.studentReg, record._id)}>Delete</DeleteButton>:null}
            </tr>
            </>
        )
    })

    
    return (
        <div className={classes.results}>
            <h2 className={classes.header}>STUDENT RESULT</h2>
            <div><p style={{ display: 'inline'}}>Username: </p><h5 style={{ display: 'inline'}}>{data.username}</h5></div>
            <div><p style={{ display: 'inline' }}>Student Number: </p><p style={{ display: 'inline' }}>{data.studentReg}</p> </div>
            <div><p style={{ display: 'inline' }}>Current Class: </p><p style={{ display: 'inline' }}>{data.class}</p> </div>
            <table style={{marginTop: '20px'}}>
                <thead>
                    <tr>
                        {head}
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        </div>
    )
}

export default withErrorHandler(ResultComponent)
