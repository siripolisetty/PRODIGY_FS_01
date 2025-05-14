import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Register from './Register';
import Login from './Login';
import MyProfile from './myprofile';

export const store = createContext();

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <store.Provider value={[token, setToken]}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
      </BrowserRouter>
    </store.Provider>
  );
};

export default App;