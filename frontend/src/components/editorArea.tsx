import Editor from "./editor";
import { RunButton } from "./runButton";
import { ThemeToggleButton } from "./themeToggleButton";


export function EditorArea() {
    return (
        <div className='w-2/3 h-full flex flex-col overflow-hidden bg-slate-50 text-black dark:dark:bg-slate-800 dark:text-white'>
            <div className="flex flex-row h-20 items-center justify-between">
                <div className="pl-3 font-mono italic text-2xl">Code Runner</div>
                <div className="flex flex-row gap-4 p-1 dark:text-white">
                    <RunButton />
                    <ThemeToggleButton />
                </div>
            </div>
            <Editor />
        </div>
    )
}

