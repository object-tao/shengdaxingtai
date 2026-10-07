import { Link as RouterLink, type LinkProps } from "react-router"
import translations from "./translations.json"
import { getLanguage, languages, languageNames, localizedPath, rememberLanguage } from "./locale"
export { getLanguage, stripLanguage } from "./locale"
const dictionary = translations as Record<string, Record<"en" | "ru" | "tr", string>>
export function t(source: string): string {
  const language = getLanguage()
  if (language === "zh") return source
  const translated = dictionary[source]?.[language]
  if (!translated) throw new Error(`Missing ${language} translation: ${source}`)
  return source.endsWith("有限公司") ? `${source} / ${translated}` : translated
}
export function Link({ to, ...props }: LinkProps) {
  const target = typeof to === "string" && to.startsWith("/") ? localizedPath(to, getLanguage()) : to
  // Load translated static metadata together with the page's language catalog.
  return <RouterLink {...props} to={target} reloadDocument />
}
const switchLabels = { zh: "切换语言", en: "Change language", ru: "Выбрать язык", tr: "Dil seçin" }
export function LanguageSwitcher() {
  const current = getLanguage()
  return <label className="language-switcher">
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c4 4 4 14 0 18M12 3c-4 4-4 14 0 18" />
    </svg>
    <select aria-label={switchLabels[current]} value={current} onChange={event => {
      const language = event.target.value as typeof current
      rememberLanguage(language)
      window.location.assign(localizedPath(window.location.pathname, language) + window.location.search + window.location.hash)
    }}>
      {languages.map(language => <option key={language} value={language} lang={language}>{languageNames[language]}</option>)}
    </select>
  </label>
}
