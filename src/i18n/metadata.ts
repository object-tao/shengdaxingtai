import translations from "./translations.json" with { type: "json" }
import { type Language, languages, localizedPath } from "./locale.ts"
export const pageCatalog = [
  {
    "path": "/",
    "component": "HomePage",
    "title": "首页",
    "description": "以现代化监管仓为枢纽，整合跨境运输、仓储装卸、报关报检与外贸代理，为企业提供高效可靠的一站式跨境物流解决方案。"
  },
  {
    "path": "/about",
    "component": "AboutPage",
    "title": "关于我们",
    "description": "立足新疆塔城，服务中国与亚欧市场双向流通，持续构筑高效、便捷、安全的跨境物流服务生态。"
  },
  {
    "path": "/business",
    "component": "BusinessPage",
    "title": "主营业务",
    "description": "从监管仓储、国际运输到报关报检，让每一票货物都拥有清晰、高效、可追踪的专业服务。"
  },
  {
    "path": "/business/bonded-warehouse",
    "component": "BondedWarehousePage",
    "title": "海关监管仓",
    "description": "以现代化基础设施与智能监管体系，为跨境货物提供安全、高效、合规的仓储周转服务。"
  },
  {
    "path": "/business/china-europe-route",
    "component": "ChinaEuropeRoutePage",
    "title": "中欧卡航",
    "description": "依托新疆口岸区位优势，构筑链接中国、中亚与欧洲市场的稳定跨境运输通道。"
  },
  {
    "path": "/business/international-logistics",
    "component": "InternationalLogisticsPage",
    "title": "国际物流",
    "description": "以专业运力、协作网络和数字化管理，为企业提供门到门的一站式国际物流服务。"
  },
  {
    "path": "/business/customs-clearance",
    "component": "CustomsClearancePage",
    "title": "报关报检",
    "description": "专业关务团队覆盖一般贸易与跨境电商模式，为货物高效合规通关提供全流程支持。"
  },
  {
    "path": "/contact",
    "component": "ContactPage",
    "title": "联系我们",
    "description": "告诉我们您的运输需求，专业团队将为您制定适配业务场景的一站式跨境物流方案。"
  }
] as const
const dictionary = translations as Record<string, Record<"en" | "ru" | "tr", string>>
export function pageMetadata(path: string, language: Language) {
  const page = pageCatalog.find(page => page.path === path) ?? pageCatalog[0]
  const translate = (source: string) => language === "zh" ? source : dictionary[source][language]
  return {
    title: `${translate(page.title)} | ${language === "zh" ? "盛大兴泰" : "Shengda Xingtai"}`,
    description: translate(page.description),
    canonical: `https://shengdaxingtai.com${localizedPath(page.path, language).replace(/\/$/, "")}/`,
    alternatives: languages.map(lang => ({ language: lang, url: `https://shengdaxingtai.com${localizedPath(page.path, lang).replace(/\/$/, "")}/` })),
  }
}
