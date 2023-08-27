'use client'

import { useSettingsContext } from "@/context/settingsContext";

export default function LangSelectionBar() {
    const { settings, dispathSettings } = useSettingsContext()
    const active_style = "bg-slate-700 text-cyan-50"
  
    return (
      <ul className="flex flex-col h-full w-32 items-center justify-center border gap-2">
        <button
          className={"flex w-20 h-20 border p-1 items-center justify-center " + (settings.lang === "cpp" ? active_style : "")}
          onClick={() => {
            dispathSettings({
              action: "lang",
              value: "cpp"
            })
          }}
        >
          <div>Cpp</div>
        </button>
        <button
          className={"flex w-20 h-20 border p-1 items-center justify-center " + (settings.lang === "py" ? active_style : "")}
          onClick={() => {
            dispathSettings({
              action: "lang",
              value: "py"
            })
          }}
        >
          <div>Python</div>
        </button>
      </ul>
    )
  }