import { createBrowserRouter, Navigate } from "react-router"

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { HomePage } = await import("./Site")
      return { Component: HomePage }
    },
  },
  {
    path: "/about",
    lazy: async () => {
      const { AboutPage } = await import("./Site")
      return { Component: AboutPage }
    },
  },
  {
    path: "/business",
    lazy: async () => {
      const { BusinessPage } = await import("./Site")
      return { Component: BusinessPage }
    },
  },
  {
    path: "/business/bonded-warehouse",
    lazy: async () => {
      const { BondedWarehousePage } = await import("./Site")
      return { Component: BondedWarehousePage }
    },
  },
  {
    path: "/business/china-europe-route",
    lazy: async () => {
      const { ChinaEuropeRoutePage } = await import("./Site")
      return { Component: ChinaEuropeRoutePage }
    },
  },
  {
    path: "/business/international-logistics",
    lazy: async () => {
      const { InternationalLogisticsPage } = await import("./Site")
      return { Component: InternationalLogisticsPage }
    },
  },
  {
    path: "/business/customs-clearance",
    lazy: async () => {
      const { CustomsClearancePage } = await import("./Site")
      return { Component: CustomsClearancePage }
    },
  },
  {
    path: "/contact",
    lazy: async () => {
      const { ContactPage } = await import("./Site")
      return { Component: ContactPage }
    },
  },
  { path: "*", element: <Navigate to="/" replace /> },
])
