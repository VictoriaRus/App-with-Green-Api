import React from "react";
import "./AuthPage.css"
import Auth from "../../components/auth-page-components/Auth/Auth";

const AuthPage = () => {
    return (
        <div className="auth-page">
            <div className="container-auth">
                <div className="logo">green chat</div>
                <div className="landing-window">
                    <h1 className="landing-title">Используйте GreenChat в своём браузере</h1>
                    <Auth />
                </div>
            </div>
        </div>
    );
};

export default AuthPage;