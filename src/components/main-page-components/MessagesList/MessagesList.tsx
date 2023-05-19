import React from "react";
import "./MessagesList.css";
import Message from "../Message/Message";
import { TMessage } from "../../../types/MessageType/MessageType";

interface IMessagesProps {
    messages: TMessage[];
}

const MessagesList = ({ messages }: IMessagesProps) => {
    return (
        <div className="messages-list">
            { messages.map((item: TMessage) =>
                <Message key={ item.timestamp } message={ item }/>
            ) }
        </div>
    );
};

export default React.memo(MessagesList);