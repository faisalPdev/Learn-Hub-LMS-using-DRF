import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import MainWrapper from "./Layouts/MainWrapper";
import PrivateRoute from "./Layouts/PrivateRoute";
import Register from "../src/views/auth/Register";
import Login from "../src/views/auth/Login";
import Logout from "../src/views/auth/Logout";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreateNewPassword from "./views/auth/CreateNewPassword";
import { CartContext } from "./views/plugin/Context";
import Index from "./views/base/Index";
import CourseDetail from "./views/base/CourseDetail";
import Cart from "./views/base/Cart";
import CartId from "./views/plugin/CartId";
import apiInstance from "./utils/axios";
import Checkout from "./views/base/Checkout";
import Success from "./views/base/Success";
import Search from "./views/base/Search";
import ChangePassword from "./views/student/ChangePassword";
import Dashboard from "./views/student/Dashboard";
import Courses from "./views/student/Courses";
import StudentCourseDetail from "./views/student/CourseDetail";
import Wishlist from "./views/student/Wishlist";
import Profile from "./views/student/Profile";
import { ProfileContext } from "./views/plugin/Context";
import useAxios from "./utils/useAxios";
import UserData from "./views/plugin/UserData";
import InstructorDashboard from "./views/instructor/Dashboard";
import CourseCreate from "./views/instructor/CourseCreate";
import InstructorReview from "./views/instructor/Review";
import Students from "./views/instructor/Students";
import Earning from "./views/instructor/Earning";
import Coupon from "./views/instructor/Coupon";
import TeacherNotification from "./views/instructor/TeacherNotification";
import TeacherQuestionAnswer from "./views/instructor/QA";
import CourseEdit from "./views/instructor/CourseEdit";
import InstructorCourses from "./views/instructor/Courses";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    apiInstance.get(`/course/cart-list/${CartId()}/`).then((res) => {
      setCartCount(res.data?.length);
    });

    useAxios()
      .get(`/user/profile-update/${UserData()?.user_id}`)
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
      });
  }, []);

  return (
    <CartContext.Provider value={[cartCount, setCartCount]}>
      <ProfileContext.Provider value={[profile, setProfile]}>
        <BrowserRouter>
          <MainWrapper>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/password-reset" element={<ForgotPassword />} />
              <Route
                path="/create-new-password"
                element={<CreateNewPassword />}
              />

              {/* Base Routes */}
              <Route path="" element={<Index />} />
              <Route path="/course-detail/:slug" element={<CourseDetail />} />
              <Route path="/cart/" element={<Cart />} />
              <Route path="/checkout/:order_oid" element={<Checkout />} />
              <Route path="/payment-success/:order_oid" element={<Success />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/student/change-password/"
                element={<ChangePassword />}
              />

              {/* student route */}

              <Route path="/student/Dashboard/" element={<Dashboard />} />
              <Route path="/student/courses/" element={<Courses />} />
              <Route
                path="/student/courses/:enrollment_id/"
                element={<StudentCourseDetail />}
              />
              <Route path="/student/wishlist/" element={<Wishlist />} />
              <Route path="/student/profile/" element={<Profile />} />

              {/* instructor route */}
              <Route
                path="/instructor/dashboard/"
                element={<InstructorDashboard />}
              />
              <Route
                path="/instructor/create-course/"
                element={<CourseCreate />}
              />
              <Route
                path="/instructor/reviews/"
                element={<InstructorReview />}
              />
              <Route path="/instructor/students/" element={<Students />} />
              <Route path="/instructor/earning/" element={<Earning />} />
              <Route path="/instructor/coupon/" element={<Coupon />} />
              <Route
                path="/instructor/notification/"
                element={<TeacherNotification />}
              />
              <Route
                path="/instructor/question-answer/"
                element={<TeacherQuestionAnswer />}
              />
              <Route
                path="/instructor/edit-course/:course_id/"
                element={<CourseEdit />}
              />

              <Route path="/instructor/courses/" element={<InstructorCourses/>} />

            </Routes>
          </MainWrapper>
        </BrowserRouter>
      </ProfileContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
