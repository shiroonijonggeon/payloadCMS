import { redirect } from 'next/navigation';
import React, { FC, ReactNode } from 'react';
import { getUser } from './actions/getUser';
import Navbar from './components/Navbar';


interface TemplateProps {
    children: ReactNode;
    }

    const Template: FC<TemplateProps> = async ({ children }) => {
    const user = await getUser();
    if (!user) {
        redirect('/login');
        return null; // This line is necessary to satisfy TypeScript, but will never be reached due to redirect
    }
    return <div>
        <Navbar></Navbar>
        {children}</div>; 
    }

export default Template;
