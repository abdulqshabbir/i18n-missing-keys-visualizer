import { Check, Drum, FolderUp, X } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type MissingKey = {
  file: string;
  missingKey: string;
};

type GroupedKeys = Record<string, string[]>;

export default function Home() {
  const [isDoneParsing, setIsDoneParsing] = useState(false);
  const [missingKeys, setMissingKeys] = useState<MissingKey[]>([]);
  const [numberOfFilledKeys, setNumberOfFilledKeys] = useState(0);
  const [numberOfMissingKeys, setNumberOfMissingKeys] = useState(0);
  const [filesParsed, setFilesParsed] = useState<string[]>([])

  const groupedKeys = missingKeys.reduce(
    (groupedKeys: GroupedKeys, key: MissingKey) => {
      if (!groupedKeys[key.file]) {
        groupedKeys[key.file] = [];
      }
      // @ts-expect-error - groupedKeys[key] is defined
      groupedKeys[key.file].push(key.missingKey);
      return groupedKeys;
    },
    {},
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setNumberOfFilledKeys(() => 0)
    setNumberOfMissingKeys(() => 0);
    setMissingKeys(() => [])
    setIsDoneParsing(false)
    setFilesParsed(() => [])
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onloadend = () => {

        const jsonFile = reader.result;
        if (typeof jsonFile !== "string") {
          return;
        }

        const translationFileAsObject =
          isJsonString(jsonFile) &&
          (JSON.parse(jsonFile) as unknown as Record<string, unknown>);

        if (!translationFileAsObject) return;

        const keys = findMissingKeysRecurse(translationFileAsObject);

        const { filledKeys, missingKeys } = findNumberOfFilledOrMissingKeysRecurse(
          translationFileAsObject,
        );

        setFilesParsed(prev => ([...prev, file.name]))
        setMissingKeys((prevMissingKeys) => [
          ...prevMissingKeys,
          ...keys.map((key) => ({ file: file.name, missingKey: key })),
        ]);
        setNumberOfFilledKeys(prev => prev + filledKeys);
        setNumberOfMissingKeys(prev => prev + missingKeys);
        setIsDoneParsing(true);
      };
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <Head>
        <title>i18n Missing Keys Visualizer</title>
        <meta
          name="description"
          content="Visualize Missing Keys for React i18n projects"
        />
        <link rel="icon" href="/key.png" />
      </Head>
      <main className="flex min-h-screen flex-col font-normal text-primary">
        <div className="flex min-h-48 flex-col gap-8 bg-gradient-to-br from-purple-500 to-red-500 pb-12 lg:flex-row">
          <div className="lg:w1/3 flex flex-col gap-12 text-wrap p-12 pr-0 pt-8">
            <div className="flex items-center gap-4 text-md">
              <Image
                src="/key-no-bg.png"
                alt="logo"
                className="rounded-xl bg-white"
                width={40}
                height={40}
              />
              <p>Missing Keys Visualizer</p>
            </div>
            <h1 className="text-xl font-bold leading-tight">
              Find React i18n Keys easily
            </h1>
            <h3 className="text-md">
              React i18n missing keys visualizer is a tool for developers and
              non-developers to quickly identify missing keys in their i18n JSON
              files.
            </h3>
          </div>
          <div className="flex items-center justify-center text-secondary lg:w-2/3">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed ${isDragActive ? "border-purple-500" : "border-purple-500"} flex h-64 w-64 items-center justify-center p-12 ${isDragActive ? "bg-purple-200" : "bg-primary"} rounded-lg text-md text-secondary`}
            >
              <input {...getInputProps()} />
              {!isDoneParsing && (
                <>
                  {isDragActive ? (
                    <div className="flex flex-col items-center justify-center gap-4 text-sm text-gray-400">
                      <Drum size={60} />
                      <p>Drop the goods!</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4 text-sm text-gray-400">
                      <FolderUp size={60} />
                      <p>
                        Drag &apos;n Drop or click here to upload folders or
                        JSON files
                      </p>
                    </div>
                  )}
                </>
              )}
              {isDoneParsing && (
                <div className="flex flex-col items-center justify-center gap-4 text-sm text-gray-400">
                  <Check size={60} className="text-green-500" />
                  <p className="text-center">{filesParsed.length} JSON Files accepted!</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {isDoneParsing && (
          <div className="flex flex-col gap-8 p-12 text-secondary">
            <div className="text-md text-secondary font-bold">Summary:</div>
            <div className="text-sm text-secondary">{filesParsed.length} file{filesParsed.length !== 1 ? "s" : ""} parsed</div>
            <div className="flex gap-4 flex-wrap">
              {filesParsed.map((file) => <div className="text-sm text-secondary px-2 py-1 bg-gray-100 rounded-sm" key={file}>{file}</div>)}
            </div>
            <div className="flex flex-col gap-4 rounded-lg bg-gray-100 p-4">
              <div className="flex gap-4">
                <Check className="text-green-500" />
                <p>{numberOfFilledKeys} keys filled!</p>
              </div>
              <div className="flex gap-4">
                <X className="text-red-400" />
                <p>{numberOfMissingKeys} keys missing</p>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              {Object.keys(groupedKeys).map((fileName) => (
                <div key={fileName} className="flex flex-col gap-4">
                  <div className="text-md font-bold">{fileName}</div>
                  <div className="flex flex-col gap-2">
                    {/* @ts-expect-error grouped keys defined*/}
                    {groupedKeys[fileName].map((key) => (
                      <div
                        key={`${fileName}-${key}`}
                        className="flex items-center gap-4"
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
          </div>
        )}
        {!isDoneParsing && (
          <div className="flex flex-col gap-8 p-12 text-secondary">
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
                <div className="flex flex-col justify-center">
                  <div className="flex gap-4">
                    <Check />
                    <p>Free to use</p>
                  </div>
                  <div className="flex gap-4">
                    <Check />
                    <p>
                      Drag &apos;n drop for folders or individual JSON files
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Check />
                    <p>Quickly locate missing keys</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="flex flex-col items-center justify-center p-12 text-secondary">
          <div className="text-md">Missing Keys Visualizer</div>
          <div className="text-sm text-gray-500">
            Built with ❤️ by{" "}
            <a target="_blank" href="https://github.com/abdulqshabbir">
              Abdul Shabbir
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}

function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function findMissingKeysRecurse(
  obj: Record<string, unknown>,
  missingKeys: string[] = [],
  prefix = "",
): string[] {
  const keys = Object.keys(obj);

  for (const key of keys) {
    // This is a leaf nod
    if (typeof obj[key] === "string") {
      if (obj[key] === "") {
        missingKeys.push(!prefix ? key : `${prefix}.${key}`);
      }
    } else {
      // This is a nested object
      findMissingKeysRecurse(
        obj[key] as Record<string, unknown>,
        missingKeys,
        !prefix ? key : `${prefix}.${key}`,
      );
    }
  }

  return missingKeys;
}


function findNumberOfFilledOrMissingKeysRecurse(obj: Record<string, unknown>, count = { filledKeys: 0, missingKeys: 0 }) {
  const keys = Object.keys(obj);
  for (const key of keys) {
    // This is a leaf nod
    if (typeof obj[key] === "string") {
      if (obj[key] !== "") {
        count.filledKeys = count.filledKeys + 1;
      } else {
        count.missingKeys = count.missingKeys + 1;
      }
    } else {
      // This is a nested object
      findNumberOfFilledOrMissingKeysRecurse(obj[key] as Record<string, unknown>, count);
    }
  }
  return count;
}
