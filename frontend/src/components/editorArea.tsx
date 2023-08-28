import Editor from "./editor";
import { RunButton } from "./runButton";
import { ThemeToggleButton } from "./themeToggleButton";


export function EditorArea() {
    return (
        <div className='w-2/3 h-full flex flex-col overflow-hidden bg-white'>
            <div className="flex flex-row h-10 items-center justify-between">
                <div className="p-1">Editor</div>
                <div className="flex flex-row gap-4">
                    <RunButton />
                    <ThemeToggleButton />
                </div>
            </div>
            <Editor />
        </div>
    )
}

