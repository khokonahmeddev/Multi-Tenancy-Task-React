import React, {useContext} from "react";
import {UserContext} from "./UserContext";
const ChildenComponent = () => {
    const context = useContext(UserContext);

    return (
        <div>
            <h1>Name: {context.name}</h1>
            <h1>Age: {context.age}</h1>
        </div>
    );
};

export default ChildenComponent;