import React,{useState, useEffect} from 'react'
import {Form, Modal, Spinner, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../../../../store/actions/index'
import Input from '../../../input/input'
import classes from './lectPublish'
import withErrorHAndler from '../../../.././../hoc/withErrorHandler'

const LectPublish = () => {
    const [formItems, setFormItems] = useState({
        session: {
            label: 'Session',
            value: '',
            options: [],
            type: 'select'
        },
        studentName: {
            label: 'Student Name:',
            value: '',
            options: [],
            type: 'select'
        },
        subject: {
            label: 'Subject:',
            options: [],
            value: '',
            type: 'select'
        }
    })

    const [score, setScore] = useState({
        value: 0,
        error: '',
        check: {
            minScore: 0,
            maxScore: 100
        }
    })

    const dispatch = useDispatch()

    const { studentsArray, subjectsArray, loading, submitedResult, AcademicSession } = useSelector(state => {
        return {
            studentsArray: state.studentList.students,
            subjectsArray: state.subjectList.subjects,
            loading: state.result.loading,
            submitedResult: state.result.submited,
            AcademicSession: state.academicSessions.sessions
        }
    })

    //studentList
    useEffect(() => {
        if (formItems.studentName.options.length === 0) {
            dispatch(actions.getStudent())
        }
    }, [formItems.studentName.options, dispatch])

    useEffect(() => {
        const users = studentsArray.map((it) => {
            return { displayValue: it.username, value: it._id }
        })
        setFormItems((data) => {
            return {
                ...data,
                studentName: {
                    ...data.studentName,
                    options: [{ displayValue: '--select--', value: '' }, ...users]
                }
            }
        })

    }, [studentsArray])



    // subjectList
    useEffect(() => {
        if (formItems.subject.options.length === 0) {
            dispatch(actions.getSubjectByLecturer())
        }
    }, [formItems.subject.options, dispatch])

    useEffect(() => {
        // console.log(subjectsArray);
        const subjects = subjectsArray.map((it) => {
            return { displayValue: it.subjectName, value: it._id }
        })
        setFormItems((data) => {
            return {
                ...data,
                subject: {
                    ...data.subject,
                    options: [{ displayValue: '--select--', value: '' }, ...subjects]
                }
            }
        })
    }, [subjectsArray])



    //   academic session
    useEffect(() => {
        if (formItems.session.options.length === 0) {
            dispatch(actions.getAcademicSession())
        }
    }, [formItems.session.options, dispatch])

    useEffect(() => {
        const session = AcademicSession.map((it) => {
            return { displayValue: it.year, value: it._id }
        })
        setFormItems((data) => {
            return {
                ...data,
                session: {
                    ...data.session,
                    options: [{ displayValue: '--select--', value: '' }, ...session]
                }
            }
        })
    }, [AcademicSession])

    const submitHandler = () => {
        const data = {
            owner: formItems.studentName.value,
            session: formItems.session.value,
            scores: [
                { score: score.value, subject: formItems.subject.value }
            ]
        }
        console.log(data);
        dispatch(actions.submitResultAdmin(data))
    }

    const form = (
        <Form>
            {Object.keys(formItems).map((it) => {
                return (
                    <Form.Group key={it}>
                        <Form.Label className={classes.label}>{formItems[it].label}</Form.Label>
                        <Form.Control
                            onChange={(event) => {
                                const val = event.target.value
                                setFormItems({
                                    ...formItems,
                                    [it]: {
                                        ...formItems[it],
                                        value: val
                                    }
                                }
                                )
                            }}
                            as={formItems[it].type}>{formItems[it].options.map((elem) => {
                                return (<option key={elem.value} value={elem.value}>{elem.displayValue}</option>)
                            })}
                        </Form.Control>
                    </Form.Group>
                )
            })}
        </Form>
    )

    const checkForError = (input) => {
        if (parseInt(input) > parseInt(score.check.maxScore)) {
            setScore({
                ...score,
                error: `Score can not be more than ${score.check.maxScore}`
            })
        } else if (parseInt(input) < parseInt(score.check.minScore)) {
            setScore({
                ...score,
                error: `Score can not be less than ${score.check.minScore}`
            })
        }
        else {
            setScore({
                ...score,
                error: ''
            })
        }

    }

    const [showModal, setshowModal] = useState(false)
    useEffect(() => {
        if (submitedResult) {
            setshowModal(true)
        }
        return () => {
            dispatch(actions.submitResultReset())
        }
    }, [submitedResult, dispatch])

    const hideModal = () => {
        setshowModal(false)
    }
    const modal = (<Modal onHide={hideModal} variant='primary' show={showModal}>
        <Modal.Header closeButton>
            <Modal.Title>Result submited</Modal.Title>
        </Modal.Header>
        <Modal.Body>This result has benn submited, to edit go to results!</Modal.Body>
    </Modal>
    )
    return (
        <>
            {modal}
            {loading ? <Spinner variant='info' animation='border'>Loading</Spinner> : null}
            {form}
            <Input value={score.value}
                changed={(event) => {
                    const val = event.target.value
                    checkForError(val)
                    setScore((data) => {
                        return {
                            ...data,
                            value: val
                        }
                    })
                }} Type='number'
                label='Input Score Below'></Input>
            <small style={{ color: 'red', marginTop: '10px', display: 'block' }}>{score.error && score.error}</small>

            <Button variant='danger' onClick={submitHandler}>Publish</Button>
        </>
    )
}

export default withErrorHAndler(LectPublish)
