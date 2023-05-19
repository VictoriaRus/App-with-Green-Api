import React from "react";
import "./Message.css";
import { TMessage } from "../../../types/MessageType/MessageType";

interface IMessageProps {
    message: TMessage;
}

const Message = ({ message }: IMessageProps) => {
    return (
        <div>
            <div className={ message.type === "outgoing" ? "message message-send" : "message message-get" }>
                { message.textMessage }
            </div>
        </div>
    );
};

export default React.memo(Message);