import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Login from './pages/Components/Login';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Payment from './pages/Components/Payment/Payment';
import Info from './pages/Info';
import BusinessDetails from './components/Tables/BusinessDetails';
import Businesses from './components/Tables/Businesses';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* Login and Signup routes should be outside the DefaultLayout */}



        <Route
          index
          path="/"
          element={
            <>
              <PageTitle title="Login " />
              <Login />
            </>
          }
        />
        <Route
          //  index
          path="/info"
          element={
            <>
              <PageTitle title="Info " />
              <Info />
              {/* <h1>asdasdl</h1> */}

            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup " />
              <SignUp />
            </>
          }
        />


        <Route element={<DefaultLayout />}>
          <Route
            path='/dashboard'
            element={
              <>
                <PageTitle title=" Dashboard " />
                <ECommerce />
              </>
            }
          />

          <Route
            path="/calendar"
            element={
              <>
                <PageTitle title="Calendar " />
                <Calendar />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile " />
                <Profile />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements " />
                <FormElements />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout " />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/business"
            element={
              <>
                <PageTitle title="Business" />
                <Tables />
              </>
            }
          />

          <Route
            path="/BusinessDetails"
            element={
              <>
                <PageTitle title="Business Details" />
                <Businesses />
               
              </>
            }
          />

          <Route
            path="/payment"
            element={
              <>
                <PageTitle title="Payment" />
                <Payment />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings " />
                <Settings />
              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart " />
                <Chart />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts " />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons " />
                <Buttons />
              </>
            }
          />

        </Route>

      </Routes>
      <ToastContainer
        position="top-center"
        className="custom-toast-container"
        bodyClassName="custom-toast-body"
      />
    </>
  );
}

export default App;
