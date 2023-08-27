import Editor from "./editor";
import { RunButton } from "./runButton";
import { ThemeToggleButton } from "./themeToggleButton";


export function EditorArea() {
    return (
        <div className='w-2/3 h-full rounded-md flex flex-col overflow-hidden bg-white border p-1'>
            <div className="flex flex-row h-10 items-center border justify-between p-1">
                <div>Editor</div>
                <div className="flex flex-row gap-4">
                    <RunButton />
                    <ThemeToggleButton />
                </div>
            </div>
            <Editor />
        </div>
    )
}

