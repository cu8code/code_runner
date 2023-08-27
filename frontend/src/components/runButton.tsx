"use client"

import { useCodeContext } from "@/context/codeContext"
import { useInputContext } from "@/context/inputContext"
import { useOutputContext } from "@/context/outputContext"
import { useSettingsContext } from "@/context/settingsContext"

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
        const url = process.env.backend_url === undefined ? "" : process.env.backend_url

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
        const text = await JSON.parse(await res.text())
        
        setOutputContext(text.output)
    }

    return (
        <button onClick={() => submit()} className="p-1 bg-blue-500 text-white h-10 w-14 items-center justify-center overflow-hidden">Run</button>
    )
}
