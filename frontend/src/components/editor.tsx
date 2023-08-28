'use client'

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";


import { useCodeContext } from "@/context/codeContext";
import { useSettingsContext } from "@/context/settingsContext";

export default function Editor() {
    const { settings } = useSettingsContext()
    const { codeContext, setCodeContext } = useCodeContext()

    function setMode() {
        switch (settings.lang) {
            case "cpp":
                return "c_cpp"
            case "py":
                return "python"
        }
    }

    function setTheme(){
        switch (settings.theme) {
            case "dark":
                return "one_dark"
            case "light":
                return "github"
        }
    }

    return (
        <AceEditor
            mode={setMode()}
            theme={setTheme()}
            onChange={(v, _) => {
                setCodeContext(v);
            }}
            name="aceeditor"
            editorProps={{
                $blockScrolling: Infinity,
                $enableMultiselect: true,
                $enableBlockSelect: true,
            }}
            width=""
            height=""
            fontSize={19}
            className="w-full h-full"
            value={codeContext}
        />
    )
}
