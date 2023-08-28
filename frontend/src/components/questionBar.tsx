'use client'

import { useInputContext } from "@/context/inputContext"
import { useOutputContext } from "@/context/outputContext"
import { useEffect } from "react"

export function OutputandInputArea() {
    const { inputContext, setInputContext } = useInputContext()
    const { outputContext, setOutputContext } = useOutputContext()

    useEffect(() => {
        const url = process.env.backend_url as string
        const requestOptions: RequestInit = {
            method: "GET",
        };
        (async () => {
            try {
                setOutputContext("connecting to the backend")
                console.log(await fetch(url, requestOptions))
                setOutputContext("connected to the backend")
            } catch (_) {
                setOutputContext("failed to connect to the backend")
            }
        })()

    }, [])
    return (
        <div className='flex flex-col w-1/3 bg-slate-100 h-full p-2 dark:bg-slate-800 dark:text-white'>
            <div className="flex flex-col h-2/3  whitespace-pre-line">
                <div className="font-mono text-base pr-1">Output</div>

                <div>{outputContext}</div>
            </div>
            <div className="flex flex-col h-1/3 gap-2 text-black dark:text-white">
                <div className="font-mono text-base pr-2">Input</div>
                <textarea wrap="soft"
                    className="flex h-full w-full dark:bg-slate-900"
                    value={inputContext}
                    onChange={(e) => {
                        setInputContext(e.target.value)
                    }} />
            </div>
        </div>
    )
}