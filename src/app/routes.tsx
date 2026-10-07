import { createBrowserRouter, Navigate, useLocation } from "react-router"
import { languages, localizedPath, preferredLanguage, getLanguage } from "../i18n/locale"
import { pageCatalog } from "../i18n/metadata"
function LegacyRedirect() {
  const location = useLocation()
  const language = location.pathname === "/" ? preferredLanguage() : "zh"
  return <Navigate to={localizedPath(location.pathname, language) + location.search + location.hash} replace />
}
function UnknownPage() { return <Navigate to={localizedPath("/", getLanguage())} replace /> }
export const router = createBrowserRouter([
  ...languages.flatMap(language => pageCatalog.map(page => ({
    path: localizedPath(page.path, language),
    lazy: async () => {
      const pages = await import("./Site")
      return { Component: pages[page.component] }
    },
  }))),
  ...pageCatalog.map(page => ({ path: page.path, element: <LegacyRedirect /> })),
  { path: "*", element: <UnknownPage /> },
])
