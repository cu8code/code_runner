'use client'

import { useInputContext } from "@/context/inputContext"
import { useOutputContext } from "@/context/outputContext"

export function OutputandInputArea() {
    const { inputContext, setInputContext } = useInputContext()
    const { outputContext } = useOutputContext()
    return (
        <div className='flex flex-col w-1/2 bg-slate-50 h-full p-1'>
            <div className="flex flex-col h-2/3 border-t-slate-50 border-r-slate-50 border-l-slate-50 border-b-slate-950 border p-1 whitespace-pre-line">
                <div>Output</div>

                <div>{outputContext}</div>
            </div>
            <div className="flex flex-col h-1/3 p-1 gap-2">
                <div>Input</div>
                <textarea wrap="soft"
                    className="flex h-full w-full border"
                    value={inputContext}
                    onChange={(e) => {
                        setInputContext(e.target.value)
                    }} />
            </div>
        </div>
    )
}