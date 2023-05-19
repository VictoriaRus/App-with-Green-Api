import React, { HTMLAttributes } from "react";
import "./Search.css";

interface IInputProps extends HTMLAttributes<HTMLInputElement> {
    value: string;
    fieldName: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, fieldName, onChange, ...rest }: IInputProps) => {
    return (
        <>
            <label className="label-search" htmlFor={ fieldName }>Ввидите номер телефона получателя:</label>
            <input className="search" value={ value } onChange={ onChange } name={ fieldName } id={ fieldName } { ...rest }/>
            {
                value && (
                    <p className="label-search">Номер получателя: { value }</p>
                )
            }
        </>
    );
};

export default Search;