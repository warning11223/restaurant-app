import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes} from 'react-router-dom'
import MainContainer from "./components/MainContainer/MainContainer";
import CreateContainer from "./components/CreateContainer/CreateContainer";
import Page404 from "./components/Page404/Page404";

function App() {
  return (
    <div className='w-screen  flex flex-col bg-primary'>
      <Header />
      <main className='mt-16 md:mt-24 px-4 md:px-16 p-8 w-full'>
          <Routes>
              <Route path='/' element={<MainContainer />}/>
              <Route path='/create' element={<CreateContainer />}/>
              <Route path='*' element={<Page404 />}/>
          </Routes>
      </main>
    </div>
  );
}

export default App;
