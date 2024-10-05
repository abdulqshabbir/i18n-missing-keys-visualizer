const DEFAULT_LOCALE = "default"

const originalLocaleList = [
  {
    value: "af",
    label: "Afrikaans (General)",
  },
  {
    value: "af_ZA",
    label: "Afrikaans",
  },
  {
    value: "ar",
    label: "Arabic (General)",
  },
  {
    value: "ar_AR",
    label: "Arabic",
  },
  {
    value: "as",
    label: "Assamese (General)",
  },
  {
    value: "as_IN",
    label: "Assamese",
  },
  {
    value: "az",
    label: "Azerbaijani (General)",
  },
  {
    value: "az_AZ",
    label: "Azerbaijani",
  },
  {
    value: "be",
    label: "Belarusian (General)",
  },
  {
    value: "be_BY",
    label: "Belarusian",
  },
  {
    value: "bg",
    label: "Bulgarian (General)",
  },
  {
    value: "bg_BG",
    label: "Bulgarian",
  },
  {
    value: "bn",
    label: "Bengali (General)",
  },
  {
    value: "bn_IN",
    label: "Bengali",
  },
  {
    value: "br",
    label: "Breton (General)",
  },
  {
    value: "br_FR",
    label: "Breton",
  },
  {
    value: "bs",
    label: "Bosnian (General)",
  },
  {
    value: "bs_BA",
    label: "Bosnian",
  },
  {
    value: "ca",
    label: "Catalan (General)",
  },
  {
    value: "ca_ES",
    label: "Catalan",
  },
  {
    value: "cb",
    label: "Sorani Kurdish (General)",
  },
  {
    value: "cb_IQ",
    label: "Sorani Kurdish",
  },
  {
    value: "co",
    label: "Corsican (General)",
  },
  {
    value: "co_FR",
    label: "Corsican",
  },
  {
    value: "cs",
    label: "Czech (General)",
  },
  {
    value: "cs_CZ",
    label: "Czech",
  },
  {
    value: "cx",
    label: "Cebuano (General)",
  },
  {
    value: "cx_PH",
    label: "Cebuano",
  },
  {
    value: "cy",
    label: "Welsh (General)",
  },
  {
    value: "cy_GB",
    label: "Welsh",
  },
  {
    value: "da",
    label: "Danish (General)",
  },
  {
    value: "da_DK",
    label: "Danish",
  },
  {
    value: "de",
    label: "German (General)",
  },
  {
    value: "de_DE",
    label: "German",
  },
  {
    value: "el",
    label: "Greek (General)",
  },
  {
    value: "el_GR",
    label: "Greek",
  },
  {
    value: "en",
    label: "English (General)",
  },
  {
    value: "en_GB",
    label: "English (UK)",
  },
  {
    value: "en_UD",
    label: "English (Upside Down)",
  },
  {
    value: "en_US",
    label: "English (US)",
  },
  {
    value: "es",
    label: "Spanish (General)",
  },
  {
    value: "es_ES",
    label: "Spanish (Spain)",
  },
  {
    value: "es_LA",
    label: "Spanish",
  },
  {
    value: "et",
    label: "Estonian (General)",
  },
  {
    value: "et_EE",
    label: "Estonian",
  },
  {
    value: "eu",
    label: "Basque (General)",
  },
  {
    value: "eu_ES",
    label: "Basque",
  },
  {
    value: "fa",
    label: "Persian (General)",
  },
  {
    value: "fa_IR",
    label: "Persian",
  },
  {
    value: "ff",
    label: "Fulah (General)",
  },
  {
    value: "ff_NG",
    label: "Fulah",
  },
  {
    value: "fi",
    label: "Finnish (General)",
  },
  {
    value: "fi_FI",
    label: "Finnish",
  },
  {
    value: "fo",
    label: "Faroese (General)",
  },
  {
    value: "fo_FO",
    label: "Faroese",
  },
  {
    value: "fr",
    label: "French (General)",
  },
  {
    value: "fr_CA",
    label: "French (Canada)",
  },
  {
    value: "fr_FR",
    label: "French (France)",
  },
  {
    value: "fy",
    label: "Frisian (General)",
  },
  {
    value: "fy_NL",
    label: "Frisian",
  },
  {
    value: "ga",
    label: "Irish (General)",
  },
  {
    value: "ga_IE",
    label: "Irish",
  },
  {
    value: "gl",
    label: "Galician (General)",
  },
  {
    value: "gl_ES",
    label: "Galician",
  },
  {
    value: "gn",
    label: "Guarani (General)",
  },
  {
    value: "gn_PY",
    label: "Guarani",
  },
  {
    value: "gu",
    label: "Gujarati (General)",
  },
  {
    value: "gu_IN",
    label: "Gujarati",
  },
  {
    value: "ha",
    label: "Hausa (General)",
  },
  {
    value: "ha_NG",
    label: "Hausa",
  },
  {
    value: "he",
    label: "Hebrew (General)",
  },
  {
    value: "he_IL",
    label: "Hebrew",
  },
  {
    value: "hi",
    label: "Hindi (General)",
  },
  {
    value: "hi_IN",
    label: "Hindi",
  },
  {
    value: "hr",
    label: "Croatian (General)",
  },
  {
    value: "hr_HR",
    label: "Croatian",
  },
  {
    value: "hu",
    label: "Hungarian (General)",
  },
  {
    value: "hu_HU",
    label: "Hungarian",
  },
  {
    value: "hy",
    label: "Armenian (General)",
  },
  {
    value: "hy_AM",
    label: "Armenian",
  },
  {
    value: "id",
    label: "Indonesian (General)",
  },
  {
    value: "id_ID",
    label: "Indonesian",
  },
  {
    value: "is",
    label: "Icelandic (General)",
  },
  {
    value: "is_IS",
    label: "Icelandic",
  },
  {
    value: "it",
    label: "Italian (General)",
  },
  {
    value: "it_IT",
    label: "Italian",
  },
  {
    value: "ja",
    label: "Japanese (General)",
  },
  {
    value: "ja_JP",
    label: "Japanese",
  },
  {
    value: "ja_KS",
    label: "Japanese (Kansai)",
  },
  {
    value: "jv",
    label: "Javanese (General)",
  },
  {
    value: "jv_ID",
    label: "Javanese",
  },
  {
    value: "ka",
    label: "Georgian (General)",
  },
  {
    value: "ka_GE",
    label: "Georgian",
  },
  {
    value: "kk",
    label: "Kazakh (General)",
  },
  {
    value: "kk_KZ",
    label: "Kazakh",
  },
  {
    value: "km",
    label: "Khmer (General)",
  },
  {
    value: "km_KH",
    label: "Khmer",
  },
  {
    value: "kn",
    label: "Kannada (General)",
  },
  {
    value: "kn_IN",
    label: "Kannada",
  },
  {
    value: "ko",
    label: "Korean (General)",
  },
  {
    value: "ko_KR",
    label: "Korean",
  },
  {
    value: "ku",
    label: "Kurdish (General)",
  },
  {
    value: "ku_TR",
    label: "Kurdish (Kurmanji)",
  },
  {
    value: "lt",
    label: "Lithuanian (General)",
  },
  {
    value: "lt_LT",
    label: "Lithuanian",
  },
  {
    value: "lv",
    label: "Latvian (General)",
  },
  {
    value: "lv_LV",
    label: "Latvian",
  },
  {
    value: "mg",
    label: "Malagasy (General)",
  },
  {
    value: "mg_MG",
    label: "Malagasy",
  },
  {
    value: "mk",
    label: "Macedonian (General)",
  },
  {
    value: "mk_MK",
    label: "Macedonian",
  },
  {
    value: "ml",
    label: "Malayalam (General)",
  },
  {
    value: "ml_IN",
    label: "Malayalam",
  },
  {
    value: "mn",
    label: "Mongolian (General)",
  },
  {
    value: "mn_MN",
    label: "Mongolian",
  },
  {
    value: "mr",
    label: "Marathi (General)",
  },
  {
    value: "mr_IN",
    label: "Marathi",
  },
  {
    value: "ms",
    label: "Malay (General)",
  },
  {
    value: "ms_MY",
    label: "Malay",
  },
  {
    value: "mt",
    label: "Maltese (General)",
  },
  {
    value: "mt_MT",
    label: "Maltese",
  },
  {
    value: "my",
    label: "Burmese (General)",
  },
  {
    value: "my_MM",
    label: "Burmese",
  },
  {
    value: "nb",
    label: "Norwegian (bokmal) (General)",
  },
  {
    value: "nb_NO",
    label: "Norwegian (bokmal)",
  },
  {
    value: "ne",
    label: "Nepali (General)",
  },
  {
    value: "ne_NP",
    label: "Nepali",
  },
  {
    value: "nl",
    label: "Dutch (General)",
  },
  {
    value: "nl_BE",
    label: "Dutch (België)",
  },
  {
    value: "nl_NL",
    label: "Dutch",
  },
  {
    value: "nn",
    label: "Norwegian (nynorsk) (General)",
  },
  {
    value: "nn_NO",
    label: "Norwegian (nynorsk)",
  },
  {
    value: "or",
    label: "Oriya (General)",
  },
  {
    value: "or_IN",
    label: "Oriya",
  },
  {
    value: "pa",
    label: "Punjabi (General)",
  },
  {
    value: "pa_IN",
    label: "Punjabi",
  },
  {
    value: "pl",
    label: "Polish (General)",
  },
  {
    value: "pl_PL",
    label: "Polish",
  },
  {
    value: "ps",
    label: "Pashto (General)",
  },
  {
    value: "ps_AF",
    label: "Pashto",
  },
  {
    value: "pt",
    label: "Portuguese (General)",
  },
  {
    value: "pt_BR",
    label: "Portuguese (Brazil)",
  },
  {
    value: "pt_PT",
    label: "Portuguese (Portugal)",
  },
  {
    value: "qz",
    label: "Burmese (General)",
  },
  {
    value: "qz_MM",
    label: "Burmese",
  },
  {
    value: "ro",
    label: "Romanian (General)",
  },
  {
    value: "ro_RO",
    label: "Romanian",
  },
  {
    value: "ru",
    label: "Russian (General)",
  },
  {
    value: "ru_RU",
    label: "Russian",
  },
  {
    value: "rw",
    label: "Kinyarwanda (General)",
  },
  {
    value: "rw_RW",
    label: "Kinyarwanda",
  },
  {
    value: "sc",
    label: "Sardinian (General)",
  },
  {
    value: "sc_IT",
    label: "Sardinian",
  },
  {
    value: "si",
    label: "Sinhala (General)",
  },
  {
    value: "si_LK",
    label: "Sinhala",
  },
  {
    value: "sk",
    label: "Slovak (General)",
  },
  {
    value: "sk_SK",
    label: "Slovak",
  },
  {
    value: "sl",
    label: "Slovenian (General)",
  },
  {
    value: "sl_SI",
    label: "Slovenian",
  },
  {
    value: "so",
    label: "Somali (General)",
  },
  {
    value: "so_SO",
    label: "Somali",
  },
  {
    value: "sq",
    label: "Albanian (General)",
  },
  {
    value: "sq_AL",
    label: "Albanian",
  },
  {
    value: "sr",
    label: "Serbian (General)",
  },
  {
    value: "sr_RS",
    label: "Serbian",
  },
  {
    value: "sv",
    label: "Swedish (General)",
  },
  {
    value: "sv_SE",
    label: "Swedish",
  },
  {
    value: "sw",
    label: "Swahili (General)",
  },
  {
    value: "sw_KE",
    label: "Swahili",
  },
  {
    value: "sz",
    label: "Silesian (General)",
  },
  {
    value: "sz_PL",
    label: "Silesian",
  },
  {
    value: "ta",
    label: "Tamil (General)",
  },
  {
    value: "ta_IN",
    label: "Tamil",
  },
  {
    value: "te",
    label: "Telugu (General)",
  },
  {
    value: "te_IN",
    label: "Telugu",
  },
  {
    value: "tg",
    label: "Tajik (General)",
  },
  {
    value: "tg_TJ",
    label: "Tajik",
  },
  {
    value: "th",
    label: "Thai (General)",
  },
  {
    value: "th_TH",
    label: "Thai",
  },
  {
    value: "tl",
    label: "Filipino (General)",
  },
  {
    value: "tl_PH",
    label: "Filipino",
  },
  {
    value: "tr",
    label: "Turkish (General)",
  },
  {
    value: "tr_TR",
    label: "Turkish",
  },
  {
    value: "tz",
    label: "Tamazight (General)",
  },
  {
    value: "tz_MA",
    label: "Tamazight",
  },
  {
    value: "uk",
    label: "Ukrainian (General)",
  },
  {
    value: "uk_UA",
    label: "Ukrainian",
  },
  {
    value: "ur",
    label: "Urdu (General)",
  },
  {
    value: "ur_PK",
    label: "Urdu",
  },
  {
    value: "uz",
    label: "Uzbek (General)",
  },
  {
    value: "uz_UZ",
    label: "Uzbek",
  },
  {
    value: "vi",
    label: "Vietnamese (General)",
  },
  {
    value: "vi_VN",
    label: "Vietnamese",
  },
  {
    value: "zh",
    label: "Chinese (General)",
  },
  {
    value: "zh_CN",
    label: "Chinese (Simplified)",
  },
  {
    value: "zh_HK",
    label: "Chinese (Hong Kong)",
  },
  {
    value: "zh_TW",
    label: "Chinese (Traditional)",
  },
  {
    value: DEFAULT_LOCALE,
    label: "Default Language",
  },
]

type Option = {
  label: string
  value: string
}

const localeList = originalLocaleList.reduce(
  (acc: Option[], locale: Option) => {
    acc.push(locale)
    if (locale.value.includes("_")) {
      acc.push({
        ...locale,
        value: locale.value.replace("_", "-"),
      })
    }
    return acc
  },
  [],
)

const localeMap = localeList.reduce((acc: Record<string, string>, locale) => {
  acc[locale.value] = locale.value
  return acc
}, {})

const localeCodeToLabelMap = localeList.reduce(
  (acc: Record<string, string>, locale) => {
    if (locale.value !== DEFAULT_LOCALE) {
      acc[locale.value] = locale.label
    }
    return acc
  },
  {},
)

export { localeList, localeMap, DEFAULT_LOCALE, localeCodeToLabelMap }
