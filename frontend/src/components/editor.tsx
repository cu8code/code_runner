'use client'

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";


import { useCodeContext } from "@/context/codeContext";
import { useSettingsContext } from "@/context/settingsContext";
import { useEffect } from "react";

export default function Editor() {
    const { settings } = useSettingsContext()
    const { codeContext, setCodeContext } = useCodeContext()

    useEffect(() => {
        console.log("rerender");
    },[settings])

    function setMode() {
        switch (settings.lang) {
            case "cpp":
                return "c_cpp"
            case "py":
                return "python"
        }
    }

    return (
        <AceEditor
            mode={setMode()}
            theme="github"
            onChange={(v, _) => {
                setCodeContext(v);
            }}
            name="aceeditor"
            editorProps={{
                $blockScrolling: Infinity,
            }}
            width=""
            height=""
            fontSize={19}
            className="w-full h-full"
            value={codeContext}
        />
    )
}
