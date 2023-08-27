"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"

type Code = string
type CodeContext = {
    codeContext: Code,
    setCodeContext: Dispatch<SetStateAction<Code>>
}

const CodeContext = createContext<CodeContext>(null as any as CodeContext)

export function CodeContextProvider({
    children
}: { children: ReactNode }) {
    const [codeContext, setCodeContext] = useState<Code>("")
    return (
        <CodeContext.Provider value={{
            codeContext,
            setCodeContext
        }}>
            {children}
        </CodeContext.Provider>
    )
}

export function useCodeContext() {
    return useContext(CodeContext)
}