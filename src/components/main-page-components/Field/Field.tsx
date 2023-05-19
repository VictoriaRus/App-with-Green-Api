import React from "react";
import "./Field.css"

interface IFieldProps {
    innerRef: any;
}

const Field = ({ innerRef }: IFieldProps) => {
    return (
        <div contentEditable="true" className="field-input" ref={ innerRef }/>
    );

};

export default React.memo(Field);