import './App.css';
import './global.css';
import React from 'react';
import Header from './header/Header';
import { NextUIProvider } from "@nextui-org/react";
import FooterComponent from './footer/Footer';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import HomeComponent from './pages/Home';
import AuthorComponent from './pages/Author';
import PaperComponent from './pages/Paper';
import AuthorDetail from './pages/AuthorDetail';
import PaperDetail from './pages/PaperDetail';



function App() {
  const [currentMenu, setCurrentMenu] = React.useState(window.location.pathname.substring(1) || "home");
  console.log("currentMenu: ", currentMenu);
  // set currentMenu to the current page 

  return (
    <NextUIProvider>
      <div className="App">
        <BrowserRouter>
          <header className="App-header">
            <Header currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />
          </header>
          <div className="App-body">
            <Routes>
              <Route path="/" element={<HomeComponent />} />
              <Route path="/author" element={<AuthorComponent />} />
              <Route path="/paper" element={<PaperComponent />} />
              <Route path="/paper/:id" element={<PaperDetail />} />
              <Route path="/author/:id" element={<AuthorDetail />} />
              <Route path="*" element={<p>Current Menu: {currentMenu}</p>} />
            </Routes>
          </div>
        </BrowserRouter>

        <footer className="App-footer">
          <FooterComponent />
        </footer>
      </div>
    </NextUIProvider>
  );
}

export default App;
