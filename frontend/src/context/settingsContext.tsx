"use client"

import { Dispatch, ReactNode, useContext, useReducer } from "react"
import { createContext } from "react"


type Lang = "py" | "cpp"
type Theme = "dark" | "light"
type Settings = {
    lang: Lang,
    theme: Theme,
}

type SettingsAction = {
    action: "lang", value: Lang
}
    |
{
    action: "theme", value: Theme
}

const initSettings: Settings = {
    lang: "py",
    theme: (() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return "dark"
        } else {
            return "light"
        }
    })() as Theme
}

console.log(initSettings);

type SettingsContext = {
    settings: Settings,
    dispathSettings: Dispatch<SettingsAction>
}
const SettingsContext = createContext<SettingsContext>(null as any as SettingsContext)

function reducer(state: Settings, action: SettingsAction): Settings {
    switch (action.action) {
        case "lang":
            return {
                lang: action.value,
                theme: state.theme
            }
        case "theme":
            const root = document.querySelector("#root")
            if (root) {
                root.classList.toggle("dark")
            }
            return {
                lang: state.lang,
                theme: action.value
            }
    }
}

export function SettingsContextProvider(
    {
        children
    }: {
        children: ReactNode
    }
) {
    const [settings, dispathSettings] = useReducer(reducer, initSettings)

    return (
        <SettingsContext.Provider value={{
            settings,
            dispathSettings
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettingsContext() {
    return useContext(SettingsContext)
}