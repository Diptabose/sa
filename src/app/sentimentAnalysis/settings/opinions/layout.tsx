import { ReactNode } from 'react'

const OpinionsLayout = ({ children , modal }: { children: ReactNode , modal:ReactNode}) => {
    return (
        <>
            {children}
            {modal}
        </>
    )
}

export default OpinionsLayout;
