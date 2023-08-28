"use client"

import { useSettingsContext } from "@/context/settingsContext"
import Image from "next/image"
import { useEffect } from "react"

import theme_img from "@/img/theme.svg"

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
            className="p-2 text-white items-center justify-center overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-900 dark:shadow-md dark:shadow-white"
            onClick={() => {
                dispathSettings({
                    action: "theme",
                    value: settings.theme === "dark" ? "light" : "dark"
                })
            }}><Image  alt="theme" src={theme_img} width={40} height={40} className="dark:invert"/></button>
    )
}