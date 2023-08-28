"use client"

import { useCodeContext } from "@/context/codeContext"
import { useInputContext } from "@/context/inputContext"
import { useOutputContext } from "@/context/outputContext"
import { useSettingsContext } from "@/context/settingsContext"

import run_img from "@/img/run.svg"
import Image from "next/image"

type data = {
    lang: "py" | "cpp",
    input: string[],
    code: string[]
}

export function RunButton() {
    const { settings } = useSettingsContext()
    const { codeContext } = useCodeContext()
    const { inputContext } = useInputContext()
    const { setOutputContext } = useOutputContext()

    async function submit() {
        const url = process.env.backend_url as string

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            lang: settings.lang,
            input: inputContext.split("\n"),
            code: codeContext.split("\n")
        } as data);

        var requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        const res = await fetch(url, requestOptions)
        console.log(res.url);
        
        const text = await JSON.parse(await res.text())
        setOutputContext(text.output)
    }

    return (
        <button onClick={() => submit()} className="p-2 items-center justify-center overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-900 dark:shadow-md dark:shadow-white">
            <Image alt="run" src={run_img} height={40} width={40} className="dark:invert" />
        </button>
    )
}
