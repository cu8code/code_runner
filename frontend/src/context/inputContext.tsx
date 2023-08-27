"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react"

type Input = string
type InputContext = {
    inputContext: Input,
    setInputContext: Dispatch<SetStateAction<Input>>
}

const InputContext = createContext<InputContext>(null as any as InputContext)

export function InputContextProvider({
    children
}: { children: ReactNode }) {
    const [inputContext, setInputContext] = useState<Input>("")
    return (
        <InputContext.Provider value={{
            inputContext,
            setInputContext
        }}>
            {children}
        </InputContext.Provider>
    )
}

export function useInputContext() {
    return useContext(InputContext)
}