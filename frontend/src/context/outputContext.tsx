'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


type OutputContext = {
    outputContext: string,
    setOutputContext: Dispatch<SetStateAction<string>>
}

const OutputContext = createContext<OutputContext>(null as any as OutputContext)


export function OutputContextProvider({
    children
}: { children: ReactNode }) {
    const [outputContext, setOutputContext] = useState<string>("")
    return (
        <OutputContext.Provider value={{
            outputContext,
            setOutputContext
        }}>
            {children}
        </OutputContext.Provider>
    )
}

export function useOutputContext() {
    return useContext(OutputContext)
}