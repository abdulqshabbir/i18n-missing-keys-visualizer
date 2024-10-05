import { Check } from "lucide-react"
import { DocumentHead } from "@/components/DocumentHead/DocumentHead"
import { DragAndDrop } from "@/components/DragAndDrop/DragAndDrop"
import { Footer } from "@/components/Footer/Footer"
import { Header } from "@/components/Header/Header"
import { HeroText } from "@/components/HeroText/HeroText"
import { type Dispatch, type SetStateAction } from "react"
import { type MissingKey } from "@/types"

type FilesNotParsedViewProps = {
  isDoneParsing: boolean
  setNumberOfMissingKeys: Dispatch<SetStateAction<number>>
  setNumberOfFilledKeys: Dispatch<SetStateAction<number>>
  setMissingKeys: Dispatch<SetStateAction<MissingKey[]>>
  setFilesParsed: Dispatch<SetStateAction<string[]>>
  setIsDoneParsing: Dispatch<SetStateAction<boolean>>
  filesParsed: string[]
}

function FilesNotParsedView({
  isDoneParsing,
  setNumberOfMissingKeys,
  setNumberOfFilledKeys,
  setMissingKeys,
  setFilesParsed,
  setIsDoneParsing,
  filesParsed,
}: FilesNotParsedViewProps) {
  return (
    <>
      <DocumentHead />
      <main className="text-primarym mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-8 font-normal">
        <Header />
        <div className="grid grid-cols-1 place-items-center gap-8 rounded-lg bg-purple-200 p-16 lg:grid-cols-[5fr_1fr] lg:px-8">
          <HeroText />
          <DragAndDrop
            isDoneParsing={isDoneParsing}
            setNumberOfMissingKeys={setNumberOfMissingKeys}
            setNumberOfFilledKeys={setNumberOfFilledKeys}
            setMissingKeys={setMissingKeys}
            setFilesParsed={setFilesParsed}
            setIsDoneParsing={setIsDoneParsing}
            filesParsed={filesParsed}
          />
        </div>
        <Features />
        <Footer />
      </main>
    </>
  )
}
function Features() {
  return (
    <>
      <div className="flex flex-col gap-8 text-">
        <h3 className="text-lg font-bold">Built to Simplify Workflows</h3>
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex flex-col lg:w-1/2">
            <p>
              React i18n missing keys visualizer is a tool to help your
              organization simplify workflows when you have dedicated
              translators who need to quickly locate missing keys.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row">
            <ul className="flex flex-col justify-center">
              <div className="flex gap-4">
                <Check />
                <li>Free to use</li>
              </div>
              <div className="flex gap-4">
                <Check />
                <li>Drag &apos;n drop for folders or individual JSON files</li>
              </div>
              <div className="flex gap-4">
                <Check />
                <li>Quickly locate missing keys</li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
export { FilesNotParsedView }
