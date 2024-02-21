"use client"
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react'

const SettingsUserLayout = ({ children, modal }: {
    children: ReactNode,
    modal: ReactNode,
}) => {

    const pathname = usePathname();
    const isCreatedUser = pathname.includes('create_user');
    return (
        <>
            {children}
            {isCreatedUser ? modal : null}
        </>
    )
}

export default SettingsUserLayout
