import ReactConfetti from "react-confetti"
import { DocumentHead } from "../DocumentHead/DocumentHead"
import { DragAndDrop } from "../DragAndDrop/DragAndDrop"
import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import { HeroText } from "../HeroText/HeroText"
import { type Dispatch, type SetStateAction } from "react"
import { type MissingKey } from "../../types"
import { type GroupedKeys } from "../../pages"
import { Info, Check, X } from "lucide-react"
import { useWindowSize } from "react-use"

type FilesParsedView = {
  isDoneParsing: boolean
  setNumberOfMissingKeys: Dispatch<SetStateAction<number>>
  setNumberOfFilledKeys: Dispatch<SetStateAction<number>>
  setMissingKeys: Dispatch<SetStateAction<MissingKey[]>>
  setFilesParsed: Dispatch<SetStateAction<string[]>>
  setIsDoneParsing: Dispatch<SetStateAction<boolean>>
  filesParsed: string[]
  numberOfMissingKeys: number
  numberOfFilledKeys: number
  groupedKeys: GroupedKeys
}

function FilesParsedView({
  isDoneParsing,
  setNumberOfMissingKeys,
  setNumberOfFilledKeys,
  setMissingKeys,
  setFilesParsed,
  setIsDoneParsing,
  filesParsed,
  numberOfMissingKeys,
  numberOfFilledKeys,
  groupedKeys,
}: FilesParsedView) {
  const { width, height } = useWindowSize(1000, 1000)
  return (
    <>
      {numberOfMissingKeys === 0 && (
        <ReactConfetti width={width} height={height} />
      )}
      <DocumentHead />
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-8 font-normal">
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
        <div className="flex flex-col gap-8 text-secondary">
          <SummaryOfFiles filesParsed={filesParsed} />
          <SummaryOfNumberOfFilledAndMissingKeys
            numberOfMissingKeys={numberOfMissingKeys}
            numberOfFilledKeys={numberOfFilledKeys}
          />
          <SummaryOfMissingKeys groupedKeys={groupedKeys} />
        </div>
        <Footer />
      </main>
    </>
  )
}
function SummaryOfFiles({ filesParsed = [] }: { filesParsed: string[] }) {
  return (
    <>
      <div className="text-md font-bold">Summary:</div>
      <div className="text-sm text-secondary">
        {filesParsed.length} file{filesParsed.length !== 1 ? "s" : ""} parsed
      </div>
      <div className="flex flex-wrap gap-4">
        {filesParsed.map((file) => (
          <div
            className="rounded-sm bg-gray-100 px-2 py-1 text-sm text-secondary"
            key={file}
          >
            {file}
          </div>
        ))}
      </div>
    </>
  )
}
function SummaryOfNumberOfFilledAndMissingKeys({
  numberOfFilledKeys,
  numberOfMissingKeys,
}: {
  numberOfFilledKeys: number
  numberOfMissingKeys: number
}) {
  return (
    <div className="flex gap-4 rounded-lg bg-gray-100 p-4">
      <div className="flex gap-4">
        <Info className="text-gray-400" />
        <p>Ssmmary of keys: </p>
      </div>
      <div className="flex gap-4">
        <Check className="text-green-500" />
        <p>{numberOfFilledKeys} keys filled!</p>
      </div>
      <div className="flex gap-4">
        <X className="text-red-400" />
        <p>{numberOfMissingKeys} keys missing</p>
      </div>
    </div>
  )
}
function SummaryOfMissingKeys({ groupedKeys }: { groupedKeys: GroupedKeys }) {
  return (
    <div className="flex flex-col gap-8">
      {Object.keys(groupedKeys).map((fileName) => (
        <div key={fileName} className="flex flex-col gap-4">
          <div className="text-md font-bold">{fileName}</div>
          <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg">
            {/* @ts-expect-error grouped keys defined*/}
            {groupedKeys[fileName].map((key) => (
              <div
                key={`${fileName}-${key}`}
                className="flex items-center gap-4"
                data-testid={`missing-key-${key}`}
              >
                <X className="text-red-400" />
                <div key={key} className="text-sm">
                  {key}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export { FilesParsedView }
