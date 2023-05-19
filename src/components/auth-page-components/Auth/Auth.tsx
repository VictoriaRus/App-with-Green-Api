import React, { useCallback, useEffect, useState } from "react";
import "./Auth.css";
import Input from "../../common-components/Input/Input";
import Button from "../../common-components/Button/Button";
import { useNavigate } from "react-router";

const initialAuthForm = { idInstance: "", apiTokenInstance: "" };

const Auth = () => {
    const [auth, setAuth] = useState(initialAuthForm);
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        isAuth && navigate("/main", { replace: true });
    }, [isAuth, navigate]);

    const onAuthFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }, []);

    const onAuth = useCallback(() => {
        fetch(`https://api.green-api.com/waInstance${ auth.idInstance }/getStateInstance/${ auth.apiTokenInstance }`, {
            method: "GET",
        })
            .then(response => response.text())
            .then(result => {
                console.log(result);
                sessionStorage.setItem("user-id", auth.idInstance);
                sessionStorage.setItem("user-token", auth.apiTokenInstance);
                setIsAuth(true);
            })
            .catch(error => console.log("error", error));
    }, [auth.idInstance, auth.apiTokenInstance]);

    return (
        <div>
            <div className="auth-title">Для входа введите свои учетные данные из системы GREEN-API
                (idInstance, apiTokenInstance)
            </div>
            <Input value={ auth.idInstance } onChange={ onAuthFormChange } fieldName="idInstance"
                   placeholder="Your idInstance"/>
            <Input value={ auth.apiTokenInstance } onChange={ onAuthFormChange } fieldName="apiTokenInstance"
                   placeholder="Your apiTokenInstance"/>
            <div>
                <Button onClick={ onAuth } text="Войти"/>
            </div>
        </div>
    );
};

export default Auth;