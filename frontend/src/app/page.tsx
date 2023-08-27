import { EditorArea } from "../components/editorArea";
import { OutputandInputArea } from "../components/questionBar";
import LangSelectionBar from "@/components/langSelectionBar";
import { InputContextProvider } from "@/context/inputContext";
import { CodeContextProvider } from "@/context/codeContext";
import { OutputContextProvider } from "@/context/outputContext";


export default function Home() {
  return (
    <main id="main_e" className="flex h-screen flex-col">
      <div className="flex flex-ro h-full">
        <LangSelectionBar />
        <div className="flex flex-row h-full w-full">
          <InputContextProvider>
            <CodeContextProvider>
              <OutputContextProvider>
                <EditorArea />
                <OutputandInputArea />
              </OutputContextProvider>
            </CodeContextProvider>
          </InputContextProvider>
        </div>
      </div>
    </main>
  )
}
