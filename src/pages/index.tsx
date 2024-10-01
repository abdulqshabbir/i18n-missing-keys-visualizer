import { Check, X } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import { type MissingKey } from "@/types";
import { DragAndDrop } from "../components/DragAndDrop/DragAndDrop";

type GroupedKeys = Record<string, string[]>;

export default function Home() {
  const [isDoneParsing, setIsDoneParsing] = useState<boolean>(false);
  const [missingKeys, setMissingKeys] = useState<MissingKey[]>([]);
  const [numberOfFilledKeys, setNumberOfFilledKeys] = useState<number>(0);
  const [numberOfMissingKeys, setNumberOfMissingKeys] = useState<number>(0);
  const [filesParsed, setFilesParsed] = useState<string[]>([]);
  const { width, height } = useWindowSize(1000, 1000);

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
      <main className="text-primarym mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-8 font-normal">
        <div className="flex items-center gap-4 text-md text-purple-800">
          <Image
            src="/key-no-bg.png"
            alt="logo"
            className="rounded-md"
            width={40}
            height={40}
          />
          <h1 className="px-4 py-6 text-md font-bold">
            Missing Keys Visualizer
          </h1>
        </div>
        <div className="grid grid-cols-1 place-items-center gap-8 rounded-lg bg-purple-200 p-16 lg:grid-cols-[5fr_1fr] lg:px-8">
          <div className="flex flex-col gap-4 text-wrap">
            <h1 className="text-xl font-bold leading-tight text-purple-800">
              Find React i18n Keys easily
            </h1>
            <h3 className="text-md text-purple-800">
              React i18n missing keys visualizer is a tool for developers and
              translators to quickly identify missing keys in their i18n JSON
              files.
            </h3>
          </div>
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
        {isDoneParsing && numberOfMissingKeys === 0 && (
          <ReactConfetti width={width} height={height} />
        )}
        {isDoneParsing && (
          <div className="flex flex-col gap-8 text-secondary">
            <div className="text-md font-bold text-secondary">Summary:</div>
            <div className="text-sm text-secondary">
              {filesParsed.length} file{filesParsed.length !== 1 ? "s" : ""}{" "}
              parsed
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
          </div>
        )}
        {!isDoneParsing && (
          <div className="flex flex-col gap-8 text-secondary">
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

        <footer className="flex flex-col items-center justify-center text-secondary">
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
