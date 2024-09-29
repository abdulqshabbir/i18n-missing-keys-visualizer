import { Check, Drum, FolderUp } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { type DragAndDropProps } from "@/types";

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

function findNumberOfFilledOrMissingKeysRecurse(
  obj: Record<string, unknown>,
  count = { filledKeys: 0, missingKeys: 0 },
) {
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
      findNumberOfFilledOrMissingKeysRecurse(
        obj[key] as Record<string, unknown>,
        count,
      );
    }
  }
  return count;
}
function DragAndDrop({
  isDoneParsing,
  setNumberOfMissingKeys,
  setNumberOfFilledKeys,
  setMissingKeys,
  filesParsed,
  setFilesParsed,
  setIsDoneParsing,
}: DragAndDropProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setNumberOfFilledKeys(0);
      setNumberOfMissingKeys(0);
      setMissingKeys([]);
      setIsDoneParsing(false);
      setFilesParsed(() => []);
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

          const { filledKeys, missingKeys } =
            findNumberOfFilledOrMissingKeysRecurse(translationFileAsObject);

          setFilesParsed((prev) => [...prev, file.name]);
          setMissingKeys((prevMissingKeys) => [
            ...prevMissingKeys,
            ...keys.map((key) => ({ file: file.name, missingKey: key })),
          ]);
          setNumberOfFilledKeys((prev) => prev + filledKeys);
          setNumberOfMissingKeys((prev) => prev + missingKeys);
          setIsDoneParsing(true);
        };
      });
    },
    [
      setFilesParsed,
      setIsDoneParsing,
      setMissingKeys,
      setNumberOfFilledKeys,
      setNumberOfMissingKeys,
    ],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed ${isDragActive ? "border-purple-500" : "border-purple-500"} flex h-64 w-64 items-center justify-center p-12 ${isDragActive ? "bg-purple-200" : "bg-primary"} rounded-lg text-md text-secondary`}
    >
      <input {...getInputProps()} data-testid="dropzone" />
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
                Drag &apos;n Drop or click here to upload folders or JSON files
              </p>
            </div>
          )}
        </>
      )}
      <div className="flex items-center justify-center text-secondary lg:w-2/3">
        {isDoneParsing && (
          <div className="flex flex-col items-center justify-center gap-4 text-sm text-gray-400">
            <Check size={60} className="text-green-500" />
            <p className="text-center">
              {filesParsed.length} JSON Files accepted!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export { DragAndDrop };
