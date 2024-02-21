import { ReactNode } from 'react'

const TagsLayout = ({ children , modal }: { children: ReactNode, modal:ReactNode }) => {
    return (
        <>
            {children}
            {modal}
        </>
    )
}

export default TagsLayout;
