import React, { useState} from 'react'
import Input from '../input/input'
import {Button, Spinner, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler'
// import SearchResult from './SearchResult/searchresult'


const SearchProfile = (props) => {
    const [searchForm, setSearchForm] = useState({
        searchBy: {
            type: 'Select',
            default: '--Select--',
            label: 'Search For',
            options: ['student', 'lecturer']
        },
        class: {
            type: 'Input',
            label: 'Class',
            placeHolder: 'Enter Students class if Applicable',
            value: ''
        }
    })

    const form = Object.keys(searchForm).map((it)=>{
        return(
            <Input 
            key={it}
            Type={searchForm[it].type}
            value={searchForm[it].value}
            label={searchForm[it].label}
            placeHolder={searchForm[it].placeHolder}
            default={searchForm[it].default}
            options={searchForm[it].options}
            changed={(event)=>{
                const val = event.target.value
                setSearchForm({
                    ...searchForm,
                    [it]: {
                        ...searchForm[it],
                        value: val
                    }
                })
            }}/>
        )
    })
    const dispatch = useDispatch()

    const submitHandler = ()=>{
        const data = {
            searchBy: searchForm.searchBy.value
        }
    
        dispatch(actions.getGroup(data))
    }
    const {loading, userList} = useSelector(state=>{
        return {
            loading: state.userList.loading,
            userList: state.userList.list
        }
       
    })
    const toEditProfile =(username)=>{
        props.history.push(`/adminprofile/getprofile/edit/${username}?searchBy=${searchForm.searchBy.value}`)
        
    }
    const userData = userList.map((it, index)=>{
        return (
            <tr key={index} onClick={()=>toEditProfile(it.username)}>
                <td>{index+1}</td>
                <td>{it.class}</td>
                <td>{it.username}</td>
            </tr>
        )
    })

    return (
        <div>
            {loading ? <Spinner animation="grow" variant="success"></Spinner>:null}
            {form}
            <Button onClick={()=>submitHandler()} 
            variant='danger' style={{marginTop: '20px', marginBottom: '30px'}}>Search</Button>
            <Table bordered striped style={{ backgroundColor: '#f5f5f5', width: '600px'}}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Class</th>
                        <th>Surname</th>
                    </tr>
                </thead>
                <tbody>
                    {userData}
                </tbody>
           </Table>
        </div>
    )
}

export default withErrorHandler(SearchProfile)
