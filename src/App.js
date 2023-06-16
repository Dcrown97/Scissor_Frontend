import React, { useState } from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import "./index.css";
import Login from './Auth/Login';
import Register from './Auth/Register';
import HomePage from './LandingPage/Homepage';
import Theme from './LandingPage/Components/Theme';
import Dashboard from './Profile/Dashboard';
import { UserContext } from './Context';
import CustomUrlPage from './Profile/CustomUrlPage';
import AnalyticsPage from './Profile/AnalyticsPage';
import VisitPage from './Profile/VisitPage';
import UrlHistory from './Profile/UrlHistory';
import PrivateRoutes from './PrivateRoutes ';

function App() {
  const [user, setUser] = useState(0);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ChakraProvider theme={Theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<PrivateRoutes />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/custom_url' element={<CustomUrlPage />} />
              <Route path='/analytics' element={<AnalyticsPage />} />
              <Route path='/visit/:id' element={<VisitPage />} />
              <Route path='/link_history' element={<UrlHistory />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default App;
