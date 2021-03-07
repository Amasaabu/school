import React, { useEffect } from 'react'
import {Table} from 'react-bootstrap'
import DeleteButton from '../ui/Button/DeleteButton/delete'
import Grade from '../Results/Grade/grade'
import Remark from './Remark/Remark'
import * as actions from '../../store/actions/index'
import {useSelector, useDispatch} from 'react-redux'
import withErrorHandler from '../../hoc/withErrorHandler'
import * as actionTypes from '../../store/actions/actionTypes'
const LecturerResult = () => {

    const dispatch = useDispatch()
    

    const {Result, success} = useSelector(state =>{
        return {
            Result: state.ResultByLect.result,
            loading: state.ResultByLect.loading,
            success: state.resultDetails.deleteSuccess
        }
    })
   
    useEffect(()=>{
        console.log('use Effect');
        dispatch(actions.getResultByLecturer())
    }, [dispatch,success])

    const deleteFunc = (stud_Id, result_id) => {
        dispatch(actions.deleteResultAdmin(stud_Id, result_id))
        //to set succcess to false and to ensure useEffect runs again
        dispatch({ type: actionTypes.BEFORE_GET_RESULT_ADMIN })
    }
    return (
        <>
          <Table striped bordered hover>
              <thead>
                  <tr>
                      <th>Surname</th>
                      <th>Session</th>
                      <th>Class</th>
                      <th>Score</th>
                      <th>Grade</th>
                      <th>Remark</th>
                  </tr>
              </thead>
              <tbody>
                  {Result.map((it)=>{
                      return (
                          <tr key={it._id}>
                              <td>{it.username}</td>
                              <td>{it.year}</td>
                              <td></td>
                              <td>{it.score}</td>
                              <td><Grade score={it.score}></Grade></td>
                              <td><Remark score={it.score}></Remark></td>
                              <DeleteButton clicked={() => deleteFunc(it.studentReg, it._id)}>Delete</DeleteButton>
                          </tr>
                      )
                  })}
              </tbody>
          </Table>       
        </>
    )
}

export default withErrorHandler(LecturerResult)
