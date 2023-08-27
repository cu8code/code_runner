"use client"

import { useSettingsContext } from "@/context/settingsContext"
import { useEffect } from "react"

export function ThemeToggleButton() {
    const { settings, dispathSettings } = useSettingsContext()

    useEffect(() => {
        const root = document.querySelector("html")
        if (root === null) {
            return
        }
        switch (settings.theme) {
            case "dark":
                root.classList.add("dark")
                break
            case "light":
                root.classList.remove("dark")
                break
        }
    }, [settings.theme])

    return (
        <button
            className="p-1 bg-blue-500 text-white h-10 w-16 items-center justify-center overflow-hidden"
            onClick={() => {
                dispathSettings({
                    action: "theme",
                    value: settings.theme === "dark" ? "light" : "dark"
                })
            }}>Theme</button>
    )
}