import React from 'react';
/* import ReactDOM from "react-dom/client"; */
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import CourseDetail from './CourseDetail';
import Courses from './Courses';
import CreateCourse from './CreateCourse';
import Header from './Header';
import UpdateCourse from './UpdateCourse';
import UserSignIn from './UserSignIn';
import UserSignUp from './UserSignUp';
import UserSignOut from './UserSignOut';
import PrivateRoute from './PrivateRoute';
import NotFound from './NotFound';
import Forbidden from './Forbidden';
import UnhandledError from './UnhandledError';

import withContext from '../Context';

const CoursesWithContext = withContext(Courses)
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut)
const CourseDetailWithContext = withContext(CourseDetail);
const HeaderWithContext = withContext(Header);
const PrivateRouteWithContext = withContext(PrivateRoute);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
      <HeaderWithContext />
      <Routes>
        <Route path="/" element={<CoursesWithContext />} />
        <Route element={<PrivateRouteWithContext />}>
          <Route path="/courses/create" element={<CreateCourseWithContext />} />
          <Route path="/courses/:id/update" element={<UpdateCourseWithContext />} />
        </Route>
        <Route path="/courses/:id" element={<CourseDetailWithContext />} />
        <Route path="/signin" element={<UserSignInWithContext />} />
        <Route path="/signup" element={<UserSignUpWithContext />} />
        <Route path="/signout" element={<UserSignOutWithContext />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/error" element={<UnhandledError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
