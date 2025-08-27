import React, { ReactElement } from "react";
import LoginForm from "./components/LoginForm";


export default async function page(): Promise<ReactElement> {
    return <div className="h-[calc(100vh-3rem)]"><LoginForm></LoginForm></div>;
}