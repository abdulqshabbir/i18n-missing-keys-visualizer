import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { localeList } from "@/utils/const"

type LocaleListPickerProps = {
  locales: string[]
  onChange: (localeCode: string) => void
}

function generateLocaleOptions(locales: string[]) {
  return locales.map((localeCode) => ({
    value: localeCode,
    label:
      localeList.find((l) => l.value === localeCode)?.label ??
      "No Language Name Found",
  }))
}

function LocaleListPicker({ locales, onChange }: LocaleListPickerProps) {
  const localeOptions = locales ? generateLocaleOptions(locales) : localeList
  return (
    <Select
      onValueChange={(localeCode) => onChange(localeCode)}
      defaultValue={locales[0]}
    >
      <SelectTrigger className="w-[180px]" data-testid="locale-picker">
        <SelectValue placeholder="Default Language" />
      </SelectTrigger>
      <SelectContent>
        {localeOptions.map((locale) => {
          return (
            <SelectItem
              data-testid={`locale-${locale.value}`}
              value={locale.value}
              key={locale.value}
            >
              {locale.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export { LocaleListPicker }
