import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={ <Navigate replace to="/auth"/> }/>
            <Route path="/auth" element={ <AuthPage /> }/>
            <Route path="/main" element={ <MainPage /> }/>
        </Routes>
    );
}

export default App;