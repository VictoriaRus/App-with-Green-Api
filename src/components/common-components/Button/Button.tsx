import React from "react";
import "./Button.css";

interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    text: string;
}

const Button = ({ text, ...rest }: IButtonProps) => {
    return (
        <button className="button" { ...rest }>{ text }</button>
    );
};

export default React.memo(Button);