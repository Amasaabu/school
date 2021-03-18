import Header from './component/header/header';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Auth from './component/Authentication/Auth'
import Profile from './component/Profile/StudentProfile/profile';
import Logout from './component/Logout/logout'
import AdminProfile from './component/screens/AdminScreen/AdminScreen'
import StudentScreen from './component/screens/StudentScreen/StudentScreen'
import LecturerScreen from './component/screens/lecturerScreen/lecturerscren'
import Reset from './component/ResetPassword/resetPassword'
import PasswordForm from './component/ResetPassword/PasswordForm';

const App=()=> {
  return (
    <BrowserRouter>
        <Header />
        <main>
          <Switch>
         <Route exact path='/' component={Auth}/>
         <Route path='/profile' component={Profile}/>
          <Route path='/reset' component={Reset} />
         <Route path='/adminProfile' component={AdminProfile}/>
         <Route path='/logout' component={Logout}/>
         <Route path='/studentScreen' component={StudentScreen}/>
          <Route path='/LecturerScreen' component={LecturerScreen} />
          <Route path='/PasswordForm/:id' component={PasswordForm} />
         </Switch>
        </main>
        
    </BrowserRouter>
  )
}

export default App;
