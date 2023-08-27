import { SettingsContextProvider, useSettingsContext } from "@/context/settingsContext";
import { EditorArea } from "../components/editorArea";
import { NavBar } from "../components/navbar";
import { OutputandInputArea } from "../components/questionBar";
import LangSelectionBar from "@/components/langSelectionBar";
import { InputContextProvider } from "@/context/inputContext";
import { CodeContextProvider } from "@/context/codeContext";
import { OutputContextProvider } from "@/context/outputContext";


export default function Home() {
  return (
    <SettingsContextProvider>
      <main className="flex h-screen flex-col">
        <NavBar />
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
    </SettingsContextProvider>
  )
}
