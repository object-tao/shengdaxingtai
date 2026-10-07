export const languages = ["zh", "en", "ru", "tr"] as const
export type Language = typeof languages[number]
export const languageNames: Record<Language, string> = { zh: "中文", en: "English", ru: "Русский", tr: "Türkçe" }
export function isLanguage(value: string): value is Language {
  return languages.some(language => language === value)
}
export function getLanguage(): Language {
  const segment = window.location.pathname.split("/")[1]
  return isLanguage(segment) ? segment : "zh"
}
export function stripLanguage(path: string): string {
  return path.replace(/^\/(zh|en|ru|tr)(?=\/|$)/, "").replace(/\/$/, "") || "/"
}
export function localizedPath(path: string, language: Language): string {
  const suffixAt = path.search(/[?#]/)
  const pathname = suffixAt < 0 ? path : path.slice(0, suffixAt)
  const suffix = suffixAt < 0 ? "" : path.slice(suffixAt)
  const clean = stripLanguage(pathname)
  return `/${language}${clean === "/" ? "/" : clean}${suffix}`
}
export function rememberLanguage(language: Language) {
  try { localStorage.setItem("site-language", language) } catch { /* Storage may be disabled. */ }
}
export function preferredLanguage(): Language {
  try {
    const saved = localStorage.getItem("site-language")
    if (saved && isLanguage(saved)) return saved
  } catch { /* Default to Chinese when storage is unavailable. */ }
  return "zh"
}
