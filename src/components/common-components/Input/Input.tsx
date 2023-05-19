import React, { HTMLAttributes } from "react";
import "./Input.css"

interface IInputProps extends HTMLAttributes<HTMLInputElement> {
    value: string;
    fieldName: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ value, fieldName, onChange, ...rest }: IInputProps) => {
    return (
        <div>
            <label className="label" htmlFor={ fieldName }>{ fieldName }</label>
            <input className="input" value={ value } onChange={ onChange } name={ fieldName } id={ fieldName } { ...rest }/>
        </div>
    );
};

export default React.memo(Input);