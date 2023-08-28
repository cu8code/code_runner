'use client'

import { useSettingsContext } from "@/context/settingsContext";
import Image from "next/image";
import cpp_img from "@/img/cpp.svg"
import py_img from "@/img/python.svg"

export default function LangSelectionBar() {
  const { settings, dispathSettings } = useSettingsContext()
  const active_style = "bg-slate-100 shadow-xl dark:shadow-white dark:bg-slate-700 dark:shadow-md "

  return (
    <ul className="flex flex-col h-full w-32 items-center justify-center gap-2 dark:bg-slate-900">
      <button
        className={"flex w-20 h-20 border p-1 items-center justify-center rounded-2xl"+ " " + (settings.lang === "cpp" ? active_style : "")}
        onClick={() => {
          dispathSettings({
            action: "lang",
            value: "cpp"
          })
        }}
      >
        <Image
          alt="cpp"
          src={cpp_img}
          className="dark:invert" />
      </button>
      <button
        className={"flex w-20 h-20 border p-1 items-center justify-center rounded-2xl"+ " " + (settings.lang === "py" ? active_style : "")}
        onClick={() => {
          dispathSettings({
            action: "lang",
            value: "py"
          })
        }}
      >
        <Image
          alt="cpp"
          src={py_img}
          className="dark:invert" />
      </button>
    </ul>
  )
}