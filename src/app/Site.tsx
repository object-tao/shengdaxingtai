import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import { useLocation } from "react-router"
import { Link, t, LanguageSwitcher, getLanguage, stripLanguage } from "../i18n"
import { rememberLanguage } from "../i18n/locale"
import { pageMetadata } from "../i18n/metadata"
import companyLogo from "../imports/grandxingtai-logo.png"
import baktuEntrance from "../imports/warehouse/baktu-entrance.jpg"
import freightYard from "../imports/warehouse/freight-yard.jpg"
import inspectionLane from "../imports/warehouse/inspection-lane.jpg"
import parkOverview from "../imports/warehouse/park-overview.jpg"

type IconName = "arrow" | "box" | "check" | "chevron" | "clipboard" | "globe" | "mail" | "map" | "menu" | "rail" | "shield" | "truck" | "warehouse" | "x"

const icons: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  box: (
    <>
      <path d="m21 8-9-5-9 5 9 5 9-5Z" />
      <path d="m3 8 9 5 9-5M12 13v9" />
      <path d="m21 8v9l-9 5-9-5V8" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  clipboard: (
    <>
      <path d="M9 5h6M9 3h6v4H9z" />
      <path d="M7 5H5v16h14V5h-2M8 12h8M8 16h6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  map: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  rail: (
    <>
      <rect x="5" y="3" width="14" height="14" rx="3" />
      <path d="M8 17 6 21M16 17l2 4M8 21h8M8 7h8M8 11h.01M16 11h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  warehouse: (
    <>
      <path d="m3 10 9-6 9 6v11H3zM7 21v-7h10v7M7 10h.01M12 10h.01M17 10h.01" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
}

function Icon({
  name,
  className = "size-5",
}: {
  name: IconName
  className?: string
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  )
}

const navItems = [
  { label: t("首页"), href: "/" },
  { label: t("关于我们"), href: "/about" },
  { label: t("主营业务"), href: "/business" },
  { label: t("联系我们"), href: "/contact" },
]

type PageName = "home" | "about" | "business" | "contact" | "service"
type ServiceSlug =
  | "bonded-warehouse"
  | "china-europe-route"
  | "international-logistics"
  | "customs-clearance"

const pageHeaders: Record<"about" | "business" | "contact", { eyebrow: string; title: string; text: string }> = {
  about: {
    eyebrow: t("ABOUT GRAND XINGTAI"),
    title: t("以实力链接亚欧，以专业赢得信赖"),
    text: t("立足新疆塔城，服务中国与亚欧市场双向流通，持续构筑高效、便捷、安全的跨境物流服务生态。"),
  },
  business: {
    eyebrow: t("INTEGRATED LOGISTICS"),
    title: t("贯通全链路的跨境物流能力"),
    text: t("从监管仓储、国际运输到报关报检，让每一票货物都拥有清晰、高效、可追踪的专业服务。"),
  },
  contact: {
    eyebrow: t("WORK WITH US"),
    title: t("携手盛大兴泰，共拓亚欧新机遇"),
    text: t("告诉我们您的运输需求，专业团队将为您制定适配业务场景的一站式跨境物流方案。"),
  },
}

const services = [
  {
    slug: "bonded-warehouse" as ServiceSlug,
    number: "01",
    icon: "warehouse" as IconName,
    title: t("海关监管仓"),
    english: t("BONDED WAREHOUSE"),
    description:
      t("现代化海关监管区，集仓储、装卸、分拣、查验于一体，让每一票货物安全、高效周转。"),
    features: [t("5.1万吨仓储容量"), t("海关联网智能监管"), t("装卸报关一体化")],
  },
  {
    slug: "china-europe-route" as ServiceSlug,
    number: "02",
    icon: "rail" as IconName,
    title: t("中欧卡航"),
    english: t("CHINA–EUROPE ROUTE"),
    description:
      t("立足巴克图口岸，覆盖中亚、俄罗斯、白俄罗斯及欧洲，提供多品类整车与门到门中欧卡航运输服务。"),
    features: [t("一带一路核心通道"), t("中亚欧洲多点覆盖"), t("全程节点可追踪")],
  },
  {
    slug: "international-logistics" as ServiceSlug,
    number: "03",
    icon: "truck" as IconName,
    title: t("国际物流"),
    english: t("GLOBAL LOGISTICS"),
    description:
      t("专业车队与全球协作网络，为客户定制公路、铁路及多式联运的一站式跨境运输方案。"),
    features: [t("7×24小时物流响应"), t("智能路线规划"), t("门到门全链路服务")],
  },
  {
    slug: "customs-clearance" as ServiceSlug,
    number: "04",
    icon: "clipboard" as IconName,
    title: t("报关报检"),
    english: t("CUSTOMS CLEARANCE"),
    description:
      t("熟悉海关政策与业务流程，覆盖一般贸易和跨境电商，帮助企业提升通关效率、降低运营成本。"),
    features: [t("专业关务团队"), "9610 / 9710 / 9810 / 1210 / 0110", t("单证与合规支持")],
  },
]

const serviceDetails: Record<
  ServiceSlug,
  {
    eyebrow: string
    title: string
    summary: string
    statement: string
    metrics: { value: string; label: string }[]
    capabilities: { title: string; text: string }[]
    process: string[]
  }
> = {
  "bonded-warehouse": {
    eyebrow: t("BONDED WAREHOUSE"),
    title: t("海关监管仓"),
    summary: t("以现代化基础设施与智能监管体系，为跨境货物提供安全、高效、合规的仓储周转服务。"),
    statement:
      t("公司于2015年投资1.2亿元建设现代化、标准化海关监管仓库，2017年正式投入运营。依托巴克图口岸，整合常温仓储、分区控温冷库、装卸分拣及9610跨境电商查验线，提供仓储与通关协同服务。"),
    metrics: [
      { value: "16,713㎡", label: t("现代化仓储面积") },
      { value: t("5.1万吨"), label: t("规划货物存储量") },
      { value: t("287个"), label: t("高清智能监控点位") },
    ],
    capabilities: [
      { title: t("常温与控温仓储"), text: t("配置常温仓与分区控温冷库，适配百货、电商包裹、果蔬生鲜及机械设备等货物。") },
      { title: t("智能监管"), text: t("联动电子地磅与智能卡口，实现车辆、货物和单证数据实时上传。") },
      { title: t("装卸与分拣作业"), text: t("专业设备与团队协同完成换装、分拣、贴标、打托等作业，衔接仓储、查验与报关流程。") },
      { title: t("安全管理"), text: t("标准化库位和全域监控体系，为每一票货物提供可靠保障。") },
    ],
    process: [t("预约入区"), t("单证核验"), t("货物入仓"), t("智能监管"), t("查验放行"), t("装车出区")],
  },
  "china-europe-route": {
    eyebrow: t("CHINA–EUROPE ROUTE"),
    title: t("中欧卡航"),
    summary: t("依托新疆口岸区位优势，构筑链接中国、中亚与欧洲市场的稳定跨境运输通道。"),
    statement:
      t("立足巴克图口岸，提供覆盖中亚、俄罗斯、白俄罗斯及欧洲的多品类整车运输与门到门方案。从国内集货、口岸换装到境外交付，调度与关务团队协同跟进，衔接跨境干线与末端配送。"),
    metrics: [
      { value: t("13–17天"), label: t("中欧干线参考时效") },
      { value: t("7×24小时"), label: t("全程物流响应") },
      { value: t("多国覆盖"), label: t("中亚及欧洲网络") },
    ],
    capabilities: [
      { title: t("亚欧门到门线路"), text: t("立足巴克图口岸，覆盖中亚、俄罗斯、白俄罗斯及欧洲，衔接国内产业带与境外目的地。") },
      { title: t("多品类整车运输"), text: t("服务常规百货、果蔬农产品、电池储能、机械设备及汽车等品类，结合货物属性匹配运输与申报方案。") },
      { title: t("全程可视"), text: t("GPS定位与关键节点反馈，让运输进度清晰透明。") },
      { title: t("口岸与境外协同"), text: t("关务团队跟进中哈口岸环节，联动境外伙伴，衔接换装、清关与末端交付。") },
    ],
    process: [t("需求评估"), t("线路规划"), t("国内集货"), t("口岸通关"), t("跨境干线"), t("境外交付")],
  },
  "international-logistics": {
    eyebrow: t("GLOBAL LOGISTICS"),
    title: t("国际物流"),
    summary: t("以专业运力、协作网络和数字化管理，为企业提供门到门的一站式国际物流服务。"),
    statement:
      t("围绕客户供应链需求，提供整车、零担、拼箱、整柜及多式联运方案。为物流同行提供出国前后一站式配套：全国货源可在口岸集结，衔接换装、仓储、关务与境外运输，减少跨环节沟通与周转。"),
    metrics: [
      { value: t("门到门"), label: t("一站式服务范围") },
      { value: t("全链路"), label: t("运输节点管理") },
      { value: t("定制化"), label: t("多场景运输方案") },
    ],
    capabilities: [
      { title: t("专业运力"), text: t("自有与协作车队灵活调配，满足普货、大宗及高时效运输需求。") },
      { title: t("灵活运力调度"), text: t("结合车型、外车调度与目的地要求，匹配整车或多车分拨方案，支持专线共享与多家拼车。") },
      { title: t("口岸集货与配套"), text: t("承接全国货源口岸集结，提供查验、包装、换装、分拣、贴标与打托等配套，衔接仓储和境外运输。") },
      { title: t("应急响应"), text: t("专业团队全天候跟进，及时处理在途异常和计划调整。") },
    ],
    process: [t("需求沟通"), t("方案报价"), t("上门提货"), t("国际运输"), t("在途跟踪"), t("签收回单")],
  },
  "customs-clearance": {
    eyebrow: t("CUSTOMS CLEARANCE"),
    title: t("报关报检"),
    summary: t("专业关务团队覆盖一般贸易与跨境电商模式，为货物高效合规通关提供全流程支持。"),
    statement:
      t("熟悉口岸政策、商品归类与申报流程，提供单证审核、报关申报、查验协调及检验检疫服务，并支持9610、9710、9810、1210及0110报关模式，覆盖跨境电商与一般贸易业务。"),
    metrics: [
      { value: "9610", label: t("跨境电商零售出口") },
      { value: "9710", label: t("跨境电商B2B出口") },
      { value: "9810", label: t("跨境电商海外仓") },
      { value: "1210", label: t("保税跨境贸易电子商务") },
      { value: "0110", label: t("一般贸易") },
    ],
    capabilities: [
      { title: t("单证预审"), text: t("提前核对合同、发票、装箱单及申报要素，降低退单风险。") },
      { title: t("规范申报"), text: t("专业处理商品归类、价格申报和贸易方式匹配。") },
      { title: t("口岸查验协调"), text: t("关务团队协同场站与运输伙伴，跟进中哈口岸申报、查验、检疫及异常处置，保持业务信息畅通。") },
      { title: t("电商通关"), text: t("支持清单核放、汇总申报及海外仓出口等业务链路。") },
    ],
    process: [t("资料提交"), t("单证预审"), t("规范申报"), t("海关审单"), t("查验检疫"), t("通关放行")],
  },
}

const warehousePhotos = [
  {
    src: freightYard,
    alt: t("盛大兴泰监管仓大型货运场站航拍实景"),
    title: t("现代化货运场站"),
    text: t("规范化车辆停放与调度区域"),
  },
  {
    src: parkOverview,
    alt: t("盛大兴泰监管仓园区及办公楼航拍全景"),
    title: t("综合监管园区"),
    text: t("仓储、办公与作业区域协同布局"),
  },
  {
    src: inspectionLane,
    alt: t("盛大兴泰监管仓货运车辆智能查验通道"),
    title: t("智能查验通道"),
    text: t("车辆有序入区，关键节点全程管控"),
  },
  {
    src: baktuEntrance,
    alt: t("巴克图口岸盛大兴泰监管仓入口实景"),
    title: t("巴克图口岸监管仓"),
    text: t("依托口岸区位，连接中国与亚欧市场"),
  },
]

const stats = [
  { value: "1.2", unit: t("亿元"), label: t("公司投资") },
  { value: "16,713", unit: "㎡", label: t("现代化仓储面积") },
  { value: "7", unit: t("万㎡"), label: t("建设设备场") },
  { value: "5.1", unit: t("万吨"), label: t("货物存储量") },
]

const subsidiaries = [
  t("新疆盛大隆腾国际货运代理有限公司"),
  t("新疆盛大物流供应链有限公司"),
  t("新疆欧亚盛大电子商务有限公司"),
  t("新疆腾飞果业有限公司"),
  t("新疆聚隆报关服务有限公司"),
  t("塔城市坤元拓达物流供应链有限公司"),
]

const commerceModels = [
  { code: "9610", title: t("跨境贸易电子商务"), text: t("小包直邮 · 快递专线") },
  { code: "9710", title: t("跨境电商 B2B 直接出口"), text: t("整柜拼箱 · 批量出口") },
  { code: "9810", title: t("跨境电商出口海外仓"), text: t("海外备货 · 高效履约") },
]

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      className={`logo ${light ? "logo-light" : ""}`}
      to="/"
      aria-label={t("盛大兴泰首页")}
    >
      <img src={companyLogo} alt={t("盛大兴泰 GRANDXINGTAI")} />
    </Link>
  )
}

function PageHero({ page }: { page: "about" | "business" | "contact" }) {
  const content = pageHeaders[page]
  return (
    <section className="page-hero">
      <div className="page-hero-grid" aria-hidden="true" />
      <div className="container relative z-10">
        <p>{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <span>{content.text}</span>
      </div>
    </section>
  )
}

function ServiceHero({ service }: { service: ServiceSlug }) {
  const content = serviceDetails[service]
  return (
    <section className="page-hero service-page-hero">
      <div className="page-hero-grid" aria-hidden="true" />
      <div className="container relative z-10">
        <p>{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <span>{content.summary}</span>
        <div className="service-breadcrumb">
          <Link to="/">{t("首页")}</Link>
          <Icon name="chevron" />
          <Link to="/business">{t("主营业务")}</Link>
          <Icon name="chevron" />
          <strong>{content.title}</strong>
        </div>
      </div>
    </section>
  )
}

function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string
  title: string
  text?: string
  light?: boolean
}) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span />
        {eyebrow}
      </div>
      <h2 className={light ? "text-white" : "text-navy"}>{title}</h2>
      {text && (
        <p className={light ? "text-white/65" : "text-slate-500"}>{text}</p>
      )}
    </div>
  )
}

export default function SitePage({ page, service }: { page: PageName; service?: ServiceSlug }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.hash === "#subsidiaries") {
      document.getElementById("subsidiaries")?.scrollIntoView({ behavior: "instant" })
    }
  }, [location.pathname, location.hash])

  useEffect(() => {
    const language = getLanguage()
    document.documentElement.lang = language === "zh" ? "zh-CN" : language
    rememberLanguage(language)
    const metadata = pageMetadata(stripLanguage(location.pathname), language)
    document.title = metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description)
  }, [location.pathname])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="overflow-hidden">
      <header className="site-header">
        <div className="container flex h-full items-center justify-between">
          <Logo />
          <nav
            className="hidden items-center gap-6 xl:flex"
            aria-label={t("主导航")}
          >
            {navItems.map((item) => {
              const isActive =
                stripLanguage(location.pathname) === item.href ||
                (item.href === "/business" && stripLanguage(location.pathname).startsWith("/business/"))

              if (item.href === "/business") {
                return (
                  <div className="nav-dropdown" key={item.href}>
                    <Link
                      className={isActive ? "nav-link active" : "nav-link"}
                      to={item.href}
                    >
                      {item.label}
                      <Icon name="chevron" />
                    </Link>
                    <div className="nav-dropdown-panel">
                      <div className="nav-dropdown-heading">
                        <span>{t("OUR BUSINESS")}</span>
                        <strong>{t("主营业务")}</strong>
                      </div>
                      {services.map((business) => (
                        <Link
                          className="nav-dropdown-item"
                          to={`/business/${business.slug}`}
                          key={business.slug}
                        >
                          <span>
                            <Icon name={business.icon} />
                          </span>
                          <p>
                            <strong>{business.title}</strong>
                            <small>{business.english}</small>
                          </p>
                          <Icon name="arrow" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  className={isActive ? "nav-link active" : "nav-link"}
                  to={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <Link className="header-cta hidden md:flex" to="/contact">
            <span>{t("获取运输方案")}</span>
            <Icon name="arrow" />
          </Link>
          <LanguageSwitcher />
          <button
            className="mobile-menu-button xl:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("关闭菜单") : t("打开菜单")}
          >
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label={t("移动端导航")}>
            {navItems.map((item) =>
              item.href === "/business" ? (
                <div className="mobile-business" key={item.href}>
                  <div className="mobile-business-row">
                    <Link to={item.href} onClick={() => setMenuOpen(false)}>
                      {item.label}
                    </Link>
                    <button
                      onClick={() => setMobileBusinessOpen((open) => !open)}
                      aria-expanded={mobileBusinessOpen}
                      aria-label={mobileBusinessOpen ? t("收起主营业务菜单") : t("展开主营业务菜单")}
                    >
                      <Icon name="chevron" />
                    </button>
                  </div>
                  {mobileBusinessOpen && (
                    <div className="mobile-submenu">
                      {services.map((business) => (
                        <Link
                          to={`/business/${business.slug}`}
                          key={business.slug}
                          onClick={() => setMenuOpen(false)}
                        >
                          <Icon name={business.icon} />
                          <span>{business.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  <Icon name="chevron" />
                </Link>
              ),
            )}
          </nav>
        )}
      </header>

      {page !== "home" && page !== "service" && <PageHero page={page} />}
      {page === "service" && service && <ServiceHero service={service} />}

      {page === "home" && <section id="home" className="hero">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=2200&q=88"
          alt={t("大型集装箱运输车辆整齐行驶在国际物流通道上")}
        />
        <div className="hero-overlay" />
        <div className="route-lines" aria-hidden="true">
          <span className="route-dot route-dot-one" />
          <span className="route-dot route-dot-two" />
        </div>
        <div className="container relative z-10 flex min-h-[calc(100vh-5rem)] items-center">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span>{t("塔城重点招商引资企业 · 亚欧物流综合服务商")}</span>
              <span className="h-px w-12 bg-brand-cyan" />
            </div>
            <h1>{t("领航丝路")}<br />
              <span>{t("链接亚欧新通道")}</span>
            </h1>
            <p>{t("以现代化监管仓为枢纽，整合跨境运输、仓储装卸、报关报检与外贸代理，为企业提供高效可靠的一站式跨境物流解决方案。")}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link className="primary-button" to="/business">{t("探索主营业务")}<Icon name="arrow" />
              </Link>
              <Link className="secondary-button" to="/about">{t("了解盛大兴泰")}</Link>
            </div>
            <div className="hero-trust">
              <span>
                <Icon name="shield" />{t("重点招商引资企业")}</span>
              <span>
                <Icon name="globe" />{t("亚欧全链路服务")}</span>
              <span>
                <Icon name="check" />{t("专业合规保障")}</span>
            </div>
          </div>
        </div>
        <Link className="scroll-hint" to="/about" aria-label={t("查看关于我们")}>
          <span>{t("SCROLL")}</span>
          <span className="scroll-line" />
        </Link>
      </section>}

      {(page === "home" || page === "about") && <section id="about" className="section bg-white">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual">
              <img
                src={parkOverview}
                alt={t("盛大兴泰监管仓园区及办公楼航拍实景")}
              />
              <div className="about-badge">
                <strong>{t("一站式")}</strong>
                <span>{t("跨境物流运输解决方案")}</span>
              </div>
              <div className="image-grid-mark" aria-hidden="true" />
            </div>
            <div className="about-copy">
              <SectionHeading
                eyebrow={t("ABOUT GRAND XINGTAI")}
                title={t("立足向西开放前沿，构筑亚欧物流新枢纽")}
                text={t("新疆盛大兴泰商贸有限公司是塔城市政府重点招商引资的外贸仓储物流企业。2015年投资建设巴克图口岸海关监管仓库，2017年正式投入运营。公司坚持稳定、高效、安全、专业的服务理念，整合仓储管理、关务服务、装卸作业、边境集货与卡航门到门运输，为客户提供一站式国际供应链解决方案。")}
              />
              <div className="about-points">
                <div>
                  <span>
                    <Icon name="shield" />
                  </span>
                  <p>
                    <strong>{t("雄厚资本护航")}</strong>
                    <small>{t("1.2亿元投资，构筑稳健业务基础")}</small>
                  </p>
                </div>
                <div>
                  <span>
                    <Icon name="globe" />
                  </span>
                  <p>
                    <strong>{t("完整产业协同")}</strong>
                    <small>{t("母公司战略统筹，专业子公司协同运营")}</small>
                  </p>
                </div>
                <div>
                  <span>
                    <Icon name="box" />
                  </span>
                  <p>
                    <strong>{t("全链路服务生态")}</strong>
                    <small>{t("仓储、运输、通关、外贸代理无缝衔接")}</small>
                  </p>
                </div>
              </div>
              <Link className="text-link" to="/contact">{t("与我们展开合作")}<Icon name="arrow" />
              </Link>
              {page === "home" && (
                <Link className="text-link subsidiaries-entry" to="/about#subsidiaries">{t("了解旗下企业")}<Icon name="arrow" />
                </Link>
              )}
            </div>
          </div>
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <p>
                  <strong>{stat.value}</strong>
                  <span>{stat.unit}</span>
                </p>
                <small>{stat.label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {(page === "home" || page === "business") && <section id="business" className="section business-section">
        <div className="container">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={t("OUR BUSINESS")}
              title={t("全链路跨境物流服务")}
              text={t("从货物入仓到顺利抵达，我们将每一个复杂环节转化为清晰、高效、可追踪的运输体验。")}
            />
            <div className="section-index hidden lg:block">{t("04 / SERVICES")}</div>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-top">
                  <span className="service-icon">
                    <Icon name={service.icon} className="size-7" />
                  </span>
                  <span className="service-number">{service.number}</span>
                </div>
                <p className="service-en">{service.english}</p>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul>
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <Icon name="check" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/business/${service.slug}`}
                  aria-label={`${t("了解业务")}: ${service.title}`}
                >{t("了解业务")}<Icon name="arrow" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>}

      {page === "business" && <section className="corridor">
        <div className="corridor-image" />
        <div className="corridor-overlay" />
        <div className="container relative z-10">
          <div className="corridor-copy">
            <SectionHeading
              eyebrow={t("SILK ROAD CORRIDOR")}
              title={t("向西开放，聚力远航")}
              text={t("依托新疆口岸区位优势，构筑面向中亚及欧洲的高效物流走廊。全程节点追踪、专业团队协同，让跨境运输稳定可靠。")}
              light
            />
            <div className="corridor-tags">
              <span>{t("中国")}</span>
              <Icon name="arrow" />
              <span>{t("新疆塔城")}</span>
              <Icon name="arrow" />
              <span>{t("中亚")}</span>
              <Icon name="arrow" />
              <span>{t("欧洲")}</span>
            </div>
          </div>
          <div className="commerce-panel">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.24em] text-brand-cyan">{t("CROSS-BORDER E-COMMERCE")}</p>
                <h3>{t("跨境电商多模式通关")}</h3>
              </div>
              <Icon
                name="globe"
                className="hidden size-12 text-white/20 sm:block"
              />
            </div>
            <div className="space-y-3">
              {commerceModels.map((model) => (
                <div className="commerce-row" key={model.code}>
                  <strong>{model.code}</strong>
                  <p>
                    <span>{model.title}</span>
                    <small>{model.text}</small>
                  </p>
                  <Icon name="chevron" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>}

      {page === "about" && (
        <section id="subsidiaries" className="section subsidiaries-section" aria-labelledby="subsidiaries-heading">
          <div className="container">
            <p className="detail-label">{t("OUR COMPANIES")}</p>
            <h2 id="subsidiaries-heading">{t("总公司与子公司")}</h2>
            <p className="subsidiaries-intro">{t("依托本地资源与行业经验，总公司与旗下企业协同开展业务，构建完整的产业服务网络。")}</p>
            <div className="parent-company">
              <span>{t("总公司")}</span>
              <h3>{t("新疆盛大兴泰商贸有限公司")}</h3>
            </div>
            <div className="subsidiaries-grid">
              {subsidiaries.map((name, index) => (
                <article className="subsidiary-card" key={name}>
                  <span>{t("子公司")} · {String(index + 1).padStart(2, "0")}</span>
                  <h3>{name}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {page === "about" && <section className="section advantage-section">
        <div className="container">
          <SectionHeading
            eyebrow={t("WHY CHOOSE US")}
            title={t("专业，让每一程更有保障")}
            text={t("现代化基础设施、成熟的协同网络与规范的服务标准，共同构成盛大兴泰值得信赖的交付能力。")}
          />
          <div className="advantages-grid">
            <div className="advantage-feature">
              <p>{t("全天候响应")}</p>
              <strong>7 × 24</strong>
              <span>{t("从方案制定到货物签收，专业团队全程跟进。")}</span>
            </div>
            <div className="advantage-list">
              {[
                ["01", t("智能监管"), t("287个高清监控点位，货物状态清晰可视")],
                ["02", t("专业车队"), t("自有与协作运力灵活调配，满足多场景运输")],
                ["03", t("高效通关"), t("报关报检协同办理，压缩货物口岸停留时间")],
                ["04", t("安全仓储"), t("标准化库区管理，为货物提供可靠保障")],
              ].map(([number, title, text]) => (
                <div className="advantage-item" key={number}>
                  <span>{number}</span>
                  <p>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>}

      {page === "contact" && <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-copy">
              <SectionHeading
                eyebrow={t("CONTACT US")}
                title={t("共绘跨境物流新蓝图")}
                text={t("无论您需要仓储、运输还是通关服务，我们都将根据业务场景，为您提供专业、可靠的定制方案。")}
                light
              />
              <div className="contact-detail">
                <span>
                  <Icon name="map" />
                </span>
                <p>
                  <small>{t("企业所在地")}</small>
                  <strong>{t("新疆 · 塔城重点开发开放试验区")}</strong>
                </p>
              </div>
              <div className="contact-detail">
                <span>
                  <Icon name="mail" />
                </span>
                <p>
                  <small>{t("商务合作")}</small>
                  <strong>{t("欢迎提交需求，专业顾问将尽快联系您")}</strong>
                </p>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div>
                <p className="form-kicker">{t("GET A SOLUTION")}</p>
                <h3>{t("获取专属运输方案")}</h3>
              </div>
              <label>
                <span>{t("您的称呼")}</span>
                <input
                  name="name"
                  placeholder={t("请输入姓名或企业名称")}
                  required
                />
              </label>
              <label>
                <span>{t("联系电话")}</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder={t("请输入联系电话")}
                  required
                />
              </label>
              <label>
                <span>{t("服务需求")}</span>
                <select name="service" defaultValue="">
                  <option value="" disabled>{t("请选择您感兴趣的服务")}</option>
                  <option>{t("海关监管仓")}</option>
                  <option>{t("中欧卡航")}</option>
                  <option>{t("国际物流")}</option>
                  <option>{t("报关报检")}</option>
                  <option>{t("综合物流方案")}</option>
                </select>
              </label>
              <button className="form-submit" type="submit">{t("提交需求")}<Icon name="arrow" />
              </button>
              {submitted && (
                <p className="success-message" role="status">
                  <Icon name="check" />{t("在线咨询正在接入中，您的需求尚未发送，请稍后再试。")}</p>
              )}
            </form>
          </div>
        </div>
      </section>}

      {page === "service" && service && (
        <section className="service-detail">
          <div className="container">
            <div className="service-intro">
              <div>
                <p className="detail-label">{t("SERVICE OVERVIEW")}</p>
                <h2>{t("专业能力，成就高效交付")}</h2>
              </div>
              <p>{serviceDetails[service].statement}</p>
            </div>

            {service === "bonded-warehouse" && (
              <div className="warehouse-showcase">
                <div className="detail-heading">
                  <p className="detail-label">{t("WAREHOUSE IN OPERATION")}</p>
                  <h2>{t("监管仓园区实景")}</h2>
                </div>
                <div className="warehouse-gallery">
                  {warehousePhotos.map((photo, index) => (
                    <figure key={photo.title}>
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                      <figcaption>
                        <strong>{photo.title}</strong>
                        <span>{photo.text}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            <div className="service-metrics">
              {serviceDetails[service].metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

            <div className="detail-heading">
              <p className="detail-label">{t("CORE CAPABILITIES")}</p>
              <h2>{t("核心服务能力")}</h2>
            </div>
            <div className="capability-grid">
              {serviceDetails[service].capabilities.map((capability, index) => (
                <article key={capability.title}>
                  <span>0{index + 1}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>
                </article>
              ))}
            </div>

            <div className="service-process">
              <div className="detail-heading">
                <p className="detail-label">{t("SERVICE PROCESS")}</p>
                <h2>{t("标准化服务流程")}</h2>
              </div>
              <div className="process-steps">
                {serviceDetails[service].process.map((step, index) => (
                  <div key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="service-cta">
              <div>
                <p>{t("定制您的专属物流方案")}</p>
                <h2>{t("让专业团队为您的跨境业务保驾护航")}</h2>
              </div>
              <Link className="primary-button" to="/contact">{t("获取方案")}<Icon name="arrow" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer>
        <div className="container">
          <div className="footer-top">
            <Logo light />
            <nav aria-label={t("页脚导航")}>
              {navItems.map((item) => (
                <Link to={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <p>{t("仓储装卸 · 跨境运输 · 外贸代理 · 报关报检")}</p>
          </div>
          <address className="footer-contact">
            <p>{t("地址：新疆塔城地区塔城市巴克图路南侧(盛大兴泰监管库)")}</p>
            <p>{t("邮箱：")}<a href="mailto:info@shengdaxingtai.com">info@shengdaxingtai.com</a></p>
          </address>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {t("新疆盛大兴泰商贸有限公司")}</span>
            <span>{t("以诚信经营铸就口碑，以专业服务链接未来")}</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

export function HomePage() {
  return <SitePage page="home" />
}

export function AboutPage() {
  return <SitePage page="about" />
}

export function BusinessPage() {
  return <SitePage page="business" />
}

export function ContactPage() {
  return <SitePage page="contact" />
}

export function BondedWarehousePage() {
  return <SitePage page="service" service="bonded-warehouse" />
}

export function ChinaEuropeRoutePage() {
  return <SitePage page="service" service="china-europe-route" />
}

export function InternationalLogisticsPage() {
  return <SitePage page="service" service="international-logistics" />
}

export function CustomsClearancePage() {
  return <SitePage page="service" service="customs-clearance" />
}
