import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './default.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';

//components
import AdminToolbar from './components/AdminToolbar';

//hoc
import WithAuth from './hoc/WithAuth';
import WithAdminAuth from './hoc/WithAdminAuth';

//layouts
import HomePageLayout from './layouts/HomePageLayout';
import EmptyLayout from './layouts/EmptyLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';

//pages
import Home from './pages/Homepage';
import Login from './pages/Login';
import Registration  from './pages/Registration';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Products from './pages/Products';


const mapState = ({user}) => ({
  currentUser: user.currentUser
});


const App = props => {
  const { currentUser} = useSelector(mapState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    
  }, [dispatch]);
  
    return(
      <Router>
        <AdminToolbar />
        <Switch>
          
          <Route path={["/","/home"]} exact render={() =>(
            <HomePageLayout>
              <Home/>
            </HomePageLayout>
          )}/>

          <Route path="/sign-up" exact 
            render={() => currentUser ? <Redirect to= '/' /> :
            (
              <EmptyLayout>
                <Registration/>
              </EmptyLayout>
            )}/>

          <Route path="/login" exact 
            render={() => currentUser ? <Redirect to= '/' /> :
            (
              <EmptyLayout>
                <Login/>
              </EmptyLayout>
            )}/>

            <Route path="/recovery" exact 
            render={() => currentUser ? <Redirect to= '/' /> :
            (
              <EmptyLayout>
                <Recovery/>
              </EmptyLayout>
            )}/>

            <Route path="/dashboard" exact 
            render={() => 
            (
              <WithAuth>
                <DashboardLayout>
                  <Dashboard/>
                </DashboardLayout>
              </WithAuth>
            )}/>

            <Route path="/products" exact 
            render={() => 
            (
              <WithAuth>
                <HomePageLayout>
                  <Products/>
                </HomePageLayout>
              </WithAuth>
            )}/>

            <Route path="/products/:filterTypeBF" exact 
            render={() => 
            (
              <WithAuth>
                <HomePageLayout>
                  <Products/>
                </HomePageLayout>
              </WithAuth>
            )}/>

            <Route path="/products/:filterTypeBF/:filterTypeST" exact 
            render={() => 
            (
              <WithAuth>
                <HomePageLayout>
                  <Products/>
                </HomePageLayout>
              </WithAuth>
            )}/>

            <Route path="/admin" exact 
            render={() =>
            (
              <WithAdminAuth>
                <AdminLayout>
                  <Admin/>
                </AdminLayout>
              </WithAdminAuth>

            )}/>

            <Route path="/admin/:filterTypeBF" exact 
            render={() => 
            (
              <WithAdminAuth>
                <AdminLayout>
                  <Admin/>
                </AdminLayout>
              </WithAdminAuth>
            )}/>

            <Route path="/admin/:filterTypeBF/:filterTypeST" exact 
            render={() => 
            (
              <WithAdminAuth>
                <AdminLayout>
                  <Admin/>
                </AdminLayout>
              </WithAdminAuth>
            )}/>


        </Switch>
      </Router>
    );

  
}

export default App;
