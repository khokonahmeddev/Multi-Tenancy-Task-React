import React from "react";
import ChildenComponent from "./ChildenComponent";
import {UserContext} from "./UserContext";

const myApp = () => {
    const contextValue = {name: 'John Doe', age: 30};
    return (
        <UserContext.Provider value={contextValue}>
            <div className="container mt-5">
                <ChildenComponent/>
            </div>
        </UserContext.Provider>
    )
}

export default myApp