import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import profileReducer from './store/reducer/userProfile'
import {getListReducer, searchProfileUserReducer} from './store/reducer/searchReducer'
import {LecturerReducer, StudentListReducer, subjectListReducer, getAcademicSessionReducer} from './store/reducer/FetchingList'
import {submitResultReducer, getResultReducer, getResultByLecturerReducer} from './store/reducer/Result'
import updateReducer from './store/reducer/updateReducer'
import {newSessionReducer} from './store/reducer/postItems'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const rootReducer = combineReducers({
  userProfile: profileReducer,
  lecturer: LecturerReducer,
  searchItem: searchProfileUserReducer,
  updatedDetails: updateReducer,
  studentList: StudentListReducer,
  subjectList: subjectListReducer,
  result: submitResultReducer,
  resultDetails: getResultReducer,
  academicSessions: getAcademicSessionReducer,
  sessionState: newSessionReducer,
  userList: getListReducer,
  ResultByLect: getResultByLecturerReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
