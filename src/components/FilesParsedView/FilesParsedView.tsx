import ReactConfetti from "react-confetti"
import { DocumentHead } from "@/components/DocumentHead/DocumentHead"
import { DragAndDrop } from "@/components/DragAndDrop/DragAndDrop"
import { Footer } from "@/components/Footer/Footer"
import { Header } from "@/components/Header/Header"
import { HeroText } from "@/components/HeroText/HeroText"
import { useState } from "react"
import { type MissingKey } from "@/types"
import { Info, Check, X, Edit2 } from "lucide-react"
import { useWindowSize } from "react-use"
import { LocaleListPicker } from "@/components/LocalePicker/LocalePicker"
import { DEFAULT_LOCALE, localeCodeToLabelMap } from "@/utils/const"
import { EditableJSONBuffer } from "@/components/JSONEditor/JSONEditor"
import { useAtomValue } from "jotai"
import {
  filesAtom,
  missingKeysAtom,
  numberOfFilledKeysAtom,
  numberOfMissingKeysAtom,
} from "@/atoms"
import { type FileWithPath } from "react-dropzone"

function FilesParsedView() {
  const { width, height } = useWindowSize(1000, 1000)
  const numberOfMissingKeys = useAtomValue(numberOfMissingKeysAtom)
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
          <DragAndDrop />
        </div>
        <div className="flex flex-col gap-8 text-primary">
          <SummaryOfNumberOfFilledAndMissingKeys />
          <SummaryOfFiles />
          <SummaryOfMissingKeys />
        </div>
        <Footer />
      </main>
    </>
  )
}

function SummaryOfFiles() {
  const [editingFile, setEditingFile] = useState(false)
  const filesParsed = useAtomValue(filesAtom)
  const [selectedFilePath, setSelectedFilePath] = useState<string | undefined>()

  const missingKeys = useAtomValue(missingKeysAtom)
  const missingKeysGroupedByFileName = groupMissingKeysByFileName(missingKeys)
  const numberOFMissingKeysByFile = (fileName: string) =>
    missingKeysGroupedByFileName[fileName]?.length ?? 0
  return (
    <>
      <div className="flex flex-wrap gap-4">
        {filesParsed.map((file: FileWithPath, idx) => (
          <div
            className="rounded-sm bg-gray-100 px-2 py-1 text-sm text-primary flex items-center gap-2"
            key={`file-${idx}`}
          >
            {file.name}
            {numberOFMissingKeysByFile(file.name) > 0 ? (
              <X className="text-red-500" />
            ) : (
              <Check className="text-green-500" />
            )}
            <button
              onClick={() => {
                if (!file.path) return
                setSelectedFilePath(file.path)
                setEditingFile(true)
              }}
              className="text-blue-500 hover:text-blue-700"
              data-testid={`edit-file-${file.name}`}
            >
              <Edit2 size={16} />
            </button>
          </div>
        ))}
      </div>
      {editingFile && selectedFilePath && (
        <EditableJSONBuffer
          selectedFilePath={selectedFilePath}
          onClose={() => setEditingFile(false)}
        />
      )}
    </>
  )
}

function SummaryOfNumberOfFilledAndMissingKeys() {
  const numberOfFilledKeys = useAtomValue(numberOfFilledKeysAtom)
  const numberOfMissingKeys = useAtomValue(numberOfMissingKeysAtom)
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

function SummaryOfMissingKeys() {
  const missingKeys = useAtomValue(missingKeysAtom)
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
