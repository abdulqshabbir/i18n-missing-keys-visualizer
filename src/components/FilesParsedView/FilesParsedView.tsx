import ReactConfetti from "react-confetti"
import { DocumentHead } from "@/components/DocumentHead/DocumentHead"
import { DragAndDrop } from "@/components/DragAndDrop/DragAndDrop"
import { Footer } from "@/components/Footer/Footer"
import { Header } from "@/components/Header/Header"
import { HeroText } from "@/components/HeroText/HeroText"
import { useState, type Dispatch, type SetStateAction } from "react"
import { type MissingKey } from "@/types"
import { Info, Check, X } from "lucide-react"
import { useWindowSize } from "react-use"
import { LocaleListPicker } from "@/components/LocalePicker/LocalePicker"
import { DEFAULT_LOCALE, localeCodeToLabelMap } from "@/utils/const"

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
  missingKeys: MissingKey[]
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
  missingKeys,
}: FilesParsedView) {
  const { width, height } = useWindowSize(1000, 1000)
  return (
    <>
      {numberOfMissingKeys === 0 && (
        <ReactConfetti width={width} height={height} data-testid="confetti" />
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
        <div className="flex flex-col gap-8 text-primary">
          <SummaryOfFiles filesParsed={filesParsed} />
          <SummaryOfNumberOfFilledAndMissingKeys
            numberOfMissingKeys={numberOfMissingKeys}
            numberOfFilledKeys={numberOfFilledKeys}
          />
          <SummaryOfMissingKeys missingKeys={missingKeys} />
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
      <div className="text-sm text-primary">
        {filesParsed.length} file{filesParsed.length !== 1 ? "s" : ""} parsed
      </div>
      <div className="flex flex-wrap gap-4">
        {filesParsed.map((file, idx) => (
          <div
            className="rounded-sm bg-gray-100 px-2 py-1 text-sm text-primary"
            key={`file-${idx}`}
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
        <p>Summary of keys: </p>
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

const groupMissingKeysByLocale = (missingKeys: MissingKey[]) => {
  return missingKeys.reduce(
    (acc: Record<string, MissingKey[]>, missingKey: MissingKey) => {
      const missingKeyLocale = missingKey.locale ?? DEFAULT_LOCALE
      if (acc[missingKeyLocale]) {
        acc[missingKeyLocale].push(missingKey)
      } else {
        acc[missingKeyLocale] = [missingKey]
      }
      return acc
    },
    {},
  )
}

const groupMissingKeysByFileName = (missingKeys: MissingKey[]) => {
  return missingKeys.reduce(
    (acc: Record<string, MissingKey[]>, missingKey: MissingKey) => {
      const missingKeyFile = missingKey.file
      if (acc[missingKeyFile]) {
        acc[missingKeyFile].push(missingKey)
      } else {
        acc[missingKeyFile] = [missingKey]
      }
      return acc
    },
    {},
  )
}

function SummaryOfMissingKeys({ missingKeys }: { missingKeys: MissingKey[] }) {
  const groupedMissingKeys = groupMissingKeysByLocale(missingKeys)
  const [languageSelected, setLanguageSelected] = useState<string>(
    Object.keys(groupedMissingKeys)[0] ?? DEFAULT_LOCALE,
  )
  const generateUniqueKey = (
    file: string,
    key: string,
    locale: string | null,
  ) => `${file}-${key}-${locale}`

  const onlyDefaultLocale =
    Object.keys(groupedMissingKeys).length === 1 &&
    Object.keys(groupedMissingKeys)[0] === DEFAULT_LOCALE

  const atLeastOneMissingKey = missingKeys.length > 0

  const missingKeysGroupedByFileName = groupMissingKeysByFileName(
    missingKeys.filter((mk) => mk.locale === languageSelected),
  )

  const IS_DEFAULT_LOCALE = languageSelected === DEFAULT_LOCALE

  if (missingKeys.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-8">
      {(!onlyDefaultLocale || atLeastOneMissingKey) && (
        <div className="flex justify-between items-center">
          <div className="text-primary text-md font-bold">
            {IS_DEFAULT_LOCALE ? (
              <>Missing Keys</>
            ) : (
              <>Missing Keys in {localeCodeToLabelMap[languageSelected]}</>
            )}
          </div>
          <div>
            <LocaleListPicker
              onChange={(l) => setLanguageSelected(l)}
              locales={Object.keys(groupedMissingKeys)}
            />
          </div>
        </div>
      )}
      {Object.keys(missingKeysGroupedByFileName).map((fileName) => (
        <div key={fileName} className="flex flex-col gap-4">
          <div className="text-md">{fileName}</div>
          <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg">
            {(missingKeysGroupedByFileName[fileName] ?? []).map(
              (missingKey: MissingKey) => (
                <div
                  key={generateUniqueKey(
                    missingKey.file,
                    missingKey.missingKey,
                    missingKey.locale,
                  )}
                  data-testid={`missing-key-${missingKey.missingKey}`}
                  className="flex flex-row gap-4"
                >
                  <X className="text-red-400" />
                  <div
                    key={generateUniqueKey(
                      missingKey.file,
                      missingKey.missingKey,
                      missingKey.locale,
                    )}
                    className="text-sm"
                  >
                    {missingKey.missingKey}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export { FilesParsedView }
