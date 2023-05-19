import React, { useState } from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import HomePage from './LandingPage/Homepage';
import Theme from './LandingPage/Components/Theme';
import Dashboard from './Profile/Dashboard';
import { UserContext } from './Context';

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
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default App;
