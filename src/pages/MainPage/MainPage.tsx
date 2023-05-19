import React, { useCallback, useEffect, useRef, useState } from "react";
import { IIncomingMessage, IOutgoingMessage, TMessage } from "../../types/MessageType/MessageType";
import { useNavigate } from "react-router";
import "./ManePage.css"
import Field from "../../components/main-page-components/Field/Field";
import User from "../../components/main-page-components/User/User";
import Search from "../../components/main-page-components/Search/Search";
import MessagesList from "../../components/main-page-components/MessagesList/MessagesList";
import Button from "../../components/common-components/Button/Button";

const MainPage = () => {
    const navigate = useNavigate();

    const userId = sessionStorage.getItem("user-id");
    const token = sessionStorage.getItem("user-token");

    const text = useRef<any>(null);
    const [phone, setPhone] = useState<string>("");
    const [messages, setMessages] = useState([] as TMessage[]);
    const [receiptId, setReceiptId] = useState<number>();
    const [end, setEnd] = useState(false);

    useEffect(() => {
        if (!userId || !token) {
            navigate("/auth", { replace: true });
        }
    }, [navigate, userId, token]);

    const onAuthFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    }, []);

    const send = useCallback(async () => {
        await fetch(`https://api.green-api.com/waInstance${ sessionStorage.getItem("user-id") }/sendMessage/${ sessionStorage.getItem("user-token") }`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "chatId": `${ phone }@c.us`,
                "message": `${ text.current.innerHTML }`
            })
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                text.current.innerHTML = "";
            })
            .catch(error => console.log("error", error));
    }, [phone]);

    const getMessage = useCallback(async (chat: string, id: string) => {
        await fetch(`https://api.green-api.com/waInstance${ sessionStorage.getItem("user-id") }/getMessage/${ sessionStorage.getItem("user-token") }`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "chatId": chat,
                "idMessage": id,
            })
        })
            .then(response => response.json())
            .then((result: IIncomingMessage | IOutgoingMessage) => {
                setMessages([...messages, result]);
            })
            .catch(error => console.log("error", error));
    }, [messages]);

    const getNotified = useCallback(async () => {
        console.log("getNotified");
        await fetch(`https://api.green-api.com/waInstance${ sessionStorage.getItem("user-id") }/receiveNotification/${ sessionStorage.getItem("user-token") }`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(result => {
                if (result) {
                    setReceiptId(result.receiptId);
                    return result;
                } else {
                    setEnd(true);
                }
            })
            .then(result => {
                if (result?.body?.messageData?.textMessageData?.textMessage) {
                    const chatId = result.body.senderData.chatId;
                    const idMessage = result.body.idMessage;
                    const chat = +chatId.split("").slice(0, 12).join("");
                    if (chat === +phone) {
                        getMessage(chatId, idMessage);
                    }
                }
                if (result?.body?.messageData?.extendedTextMessageData?.text) {
                    const chatId = result.body.senderData.chatId;
                    const idMessage = result.body.idMessage;
                    const chat = +chatId.split("").slice(0, 12).join("");
                    if (chat === +phone) {
                        getMessage(chatId, idMessage);
                    }
                }
            })
            .catch(error => console.log("error", error));
    }, [getMessage, phone]);

    const delNotified = useCallback(() => {
        console.log("delNotified");
        fetch(`https://api.green-api.com/waInstance${ sessionStorage.getItem("user-id") }/deleteNotification/${ sessionStorage.getItem("user-token") }/${ receiptId }`, {
            method: "DELETE",
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log("error", error));
    }, [receiptId]);

    const run = useCallback(async () => {
        await getNotified();
        if (end) return;
        await run();
    }, [end, getNotified]);

    const sendMessage = useCallback(async () => {
        if (text.current.innerHTML && phone) {
            await send();
            await run();
        }
    }, [phone, run, send]);

    useEffect(() => {
        if (receiptId) {
            delNotified();
        }
    }, [receiptId, delNotified]);

    return (
        <div className="main-page">
            <div className="main-container">
                <div className="main-wrap">
                    <div className="col-1">
                        <User/>
                        <Search fieldName="search" value={ phone } onChange={ onAuthFormChange } placeholder="375290000000"/>
                    </div>
                    <div className="col-2">
                        <div className="chat-header">Получатель { phone }</div>
                        <div className="chat">
                            <MessagesList messages={ messages }/>
                        </div>
                        <div className="field">
                            <Field innerRef={ text }/>
                            <Button text="Отправить" onClick={ sendMessage }/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;