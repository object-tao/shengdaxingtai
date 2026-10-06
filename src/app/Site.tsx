import { useState, type FormEvent, type ReactNode } from "react"
import { Link, useLocation } from "react-router"
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
  { label: "首页", href: "/" },
  { label: "关于我们", href: "/about" },
  { label: "主营业务", href: "/business" },
  { label: "联系我们", href: "/contact" },
]

type PageName = "home" | "about" | "business" | "contact" | "service"
type ServiceSlug =
  | "bonded-warehouse"
  | "china-europe-route"
  | "international-logistics"
  | "customs-clearance"

const pageHeaders: Record<"about" | "business" | "contact", { eyebrow: string; title: string; text: string }> = {
  about: {
    eyebrow: "ABOUT GRAND XINGTAI",
    title: "以实力链接亚欧，以专业赢得信赖",
    text: "立足新疆塔城，服务中国与亚欧市场双向流通，持续构筑高效、便捷、安全的跨境物流服务生态。",
  },
  business: {
    eyebrow: "INTEGRATED LOGISTICS",
    title: "贯通全链路的跨境物流能力",
    text: "从监管仓储、国际运输到报关报检，让每一票货物都拥有清晰、高效、可追踪的专业服务。",
  },
  contact: {
    eyebrow: "WORK WITH US",
    title: "携手盛大兴泰，共拓亚欧新机遇",
    text: "告诉我们您的运输需求，专业团队将为您制定适配业务场景的一站式跨境物流方案。",
  },
}

const services = [
  {
    slug: "bonded-warehouse" as ServiceSlug,
    number: "01",
    icon: "warehouse" as IconName,
    title: "海关监管仓",
    english: "BONDED WAREHOUSE",
    description:
      "现代化海关监管区，集仓储、装卸、分拣、查验于一体，让每一票货物安全、高效周转。",
    features: ["5.1万吨仓储容量", "海关联网智能监管", "装卸报关一体化"],
  },
  {
    slug: "china-europe-route" as ServiceSlug,
    number: "02",
    icon: "rail" as IconName,
    title: "中欧航线",
    english: "CHINA–EUROPE ROUTE",
    description:
      "依托新疆口岸区位优势，链接中亚与欧洲市场，提供稳定、准时的跨境班列及公路联运服务。",
    features: ["一带一路核心通道", "中亚欧洲多点覆盖", "全程节点可追踪"],
  },
  {
    slug: "international-logistics" as ServiceSlug,
    number: "03",
    icon: "truck" as IconName,
    title: "国际物流",
    english: "GLOBAL LOGISTICS",
    description:
      "专业车队与全球协作网络，为客户定制公路、铁路及多式联运的一站式跨境运输方案。",
    features: ["7×24小时物流响应", "智能路线规划", "门到门全链路服务"],
  },
  {
    slug: "customs-clearance" as ServiceSlug,
    number: "04",
    icon: "clipboard" as IconName,
    title: "报关报检",
    english: "CUSTOMS CLEARANCE",
    description:
      "熟悉海关政策与业务流程，覆盖一般贸易和跨境电商，帮助企业提升通关效率、降低运营成本。",
    features: ["专业关务团队", "9610 / 9710 / 9810", "单证与合规支持"],
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
    eyebrow: "BONDED WAREHOUSE",
    title: "海关监管仓",
    summary: "以现代化基础设施与智能监管体系，为跨境货物提供安全、高效、合规的仓储周转服务。",
    statement:
      "总投资1.2亿元建设现代化海关监管区，集仓储、装卸、查验、分拣与通关于一体。通过海关联网监管和标准化库区管理，让货物状态实时可视、流转清晰可控。",
    metrics: [
      { value: "16,713㎡", label: "现代化仓储面积" },
      { value: "5.1万吨", label: "规划货物存储量" },
      { value: "287个", label: "高清智能监控点位" },
    ],
    capabilities: [
      { title: "全温区仓储", text: "配置保鲜冷冻、普通仓及百货专用仓，适配多类型货物存储需求。" },
      { title: "智能监管", text: "联动电子地磅与智能卡口，实现车辆、货物和单证数据实时上传。" },
      { title: "一体化作业", text: "仓储、装卸、查验与报关协同办理，减少中间环节与等待时间。" },
      { title: "安全管理", text: "标准化库位和全域监控体系，为每一票货物提供可靠保障。" },
    ],
    process: ["预约入区", "单证核验", "货物入仓", "智能监管", "查验放行", "装车出区"],
  },
  "china-europe-route": {
    eyebrow: "CHINA–EUROPE ROUTE",
    title: "中欧航线",
    summary: "依托新疆口岸区位优势，构筑链接中国、中亚与欧洲市场的稳定跨境运输通道。",
    statement:
      "整合跨境公路、班列及口岸资源，为客户提供从国内集货到境外交付的全程运输方案。专业调度团队持续跟踪关键节点，提升国际干线运输的稳定性和时效确定性。",
    metrics: [
      { value: "13–17天", label: "中欧干线参考时效" },
      { value: "7×24小时", label: "全程物流响应" },
      { value: "多国覆盖", label: "中亚及欧洲网络" },
    ],
    capabilities: [
      { title: "核心口岸通道", text: "立足巴克图口岸，衔接国内产业带和亚欧主要市场。" },
      { title: "多式联运", text: "灵活组合公路、铁路与境外接驳资源，匹配时效与成本目标。" },
      { title: "全程可视", text: "GPS定位与关键节点反馈，让运输进度清晰透明。" },
      { title: "境外协同", text: "联动境外合作伙伴，保障换装、清关与末端交付顺畅衔接。" },
    ],
    process: ["需求评估", "线路规划", "国内集货", "口岸通关", "跨境干线", "境外交付"],
  },
  "international-logistics": {
    eyebrow: "GLOBAL LOGISTICS",
    title: "国际物流",
    summary: "以专业运力、协作网络和数字化管理，为企业提供门到门的一站式国际物流服务。",
    statement:
      "围绕客户供应链需求，提供整车、零担、拼箱、整柜及多式联运方案。通过统一调度、节点追踪与异常响应，实现从工厂提货到终端签收的全链路协同。",
    metrics: [
      { value: "门到门", label: "一站式服务范围" },
      { value: "全链路", label: "运输节点管理" },
      { value: "定制化", label: "多场景运输方案" },
    ],
    capabilities: [
      { title: "专业运力", text: "自有与协作车队灵活调配，满足普货、大宗及高时效运输需求。" },
      { title: "智能调度", text: "根据货物属性、目的地和时效要求优化路线与运输组合。" },
      { title: "供应链协同", text: "整合仓储、运输、通关和末端配送，减少跨环节沟通成本。" },
      { title: "应急响应", text: "专业团队全天候跟进，及时处理在途异常和计划调整。" },
    ],
    process: ["需求沟通", "方案报价", "上门提货", "国际运输", "在途跟踪", "签收回单"],
  },
  "customs-clearance": {
    eyebrow: "CUSTOMS CLEARANCE",
    title: "报关报检",
    summary: "专业关务团队覆盖一般贸易与跨境电商模式，为货物高效合规通关提供全流程支持。",
    statement:
      "熟悉口岸政策、商品归类与申报流程，提供单证审核、报关申报、查验协调及检验检疫服务，并支持9610、9710、9810等跨境电商业务模式。",
    metrics: [
      { value: "9610", label: "跨境电商零售出口" },
      { value: "9710", label: "跨境电商B2B出口" },
      { value: "9810", label: "跨境电商海外仓" },
    ],
    capabilities: [
      { title: "单证预审", text: "提前核对合同、发票、装箱单及申报要素，降低退单风险。" },
      { title: "规范申报", text: "专业处理商品归类、价格申报和贸易方式匹配。" },
      { title: "查验协调", text: "协同海关与场站完成查验、检疫和异常处置。" },
      { title: "电商通关", text: "支持清单核放、汇总申报及海外仓出口等业务链路。" },
    ],
    process: ["资料提交", "单证预审", "规范申报", "海关审单", "查验检疫", "通关放行"],
  },
}

const warehousePhotos = [
  {
    src: freightYard,
    alt: "盛大兴泰监管仓大型货运场站航拍实景",
    title: "现代化货运场站",
    text: "规范化车辆停放与调度区域",
  },
  {
    src: parkOverview,
    alt: "盛大兴泰监管仓园区及办公楼航拍全景",
    title: "综合监管园区",
    text: "仓储、办公与作业区域协同布局",
  },
  {
    src: inspectionLane,
    alt: "盛大兴泰监管仓货运车辆智能查验通道",
    title: "智能查验通道",
    text: "车辆有序入区，关键节点全程管控",
  },
  {
    src: baktuEntrance,
    alt: "巴克图口岸盛大兴泰监管仓入口实景",
    title: "巴克图口岸监管仓",
    text: "依托口岸区位，连接中国与亚欧市场",
  },
]

const stats = [
  { value: "1.2", unit: "亿元", label: "公司投资" },
  { value: "16,713", unit: "㎡", label: "现代化仓储面积" },
  { value: "7", unit: "万㎡", label: "建设设备场" },
  { value: "5.1", unit: "万吨", label: "货物存储量" },
]

const commerceModels = [
  { code: "9610", title: "跨境贸易电子商务", text: "小包直邮 · 快递专线" },
  { code: "9710", title: "跨境电商 B2B 直接出口", text: "整柜拼箱 · 批量出口" },
  { code: "9810", title: "跨境电商出口海外仓", text: "海外备货 · 高效履约" },
]

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      className={`logo ${light ? "logo-light" : ""}`}
      to="/"
      aria-label="盛大兴泰首页"
    >
      <img src={companyLogo} alt="盛大兴泰 GRANDXINGTAI" />
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
          <Link to="/">首页</Link>
          <Icon name="chevron" />
          <Link to="/business">主营业务</Link>
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
            className="hidden items-center gap-9 lg:flex"
            aria-label="主导航"
          >
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href === "/business" && location.pathname.startsWith("/business/"))

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
                        <span>OUR BUSINESS</span>
                        <strong>主营业务</strong>
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
            <span>获取运输方案</span>
            <Icon name="arrow" />
          </Link>
          <button
            className="mobile-menu-button lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
          >
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="移动端导航">
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
                      aria-label={mobileBusinessOpen ? "收起主营业务菜单" : "展开主营业务菜单"}
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
          alt="大型集装箱运输车辆整齐行驶在国际物流通道上"
        />
        <div className="hero-overlay" />
        <div className="route-lines" aria-hidden="true">
          <span className="route-dot route-dot-one" />
          <span className="route-dot route-dot-two" />
        </div>
        <div className="container relative z-10 flex min-h-[calc(100vh-5rem)] items-center">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span>塔城重点招商引资企业 · 亚欧物流综合服务商</span>
              <span className="h-px w-12 bg-brand-cyan" />
            </div>
            <h1>
              领航丝路
              <br />
              <span>链接亚欧新通道</span>
            </h1>
            <p>
              以现代化监管仓为枢纽，整合跨境运输、仓储装卸、报关报检与外贸代理，为企业提供高效可靠的一站式跨境物流解决方案。
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link className="primary-button" to="/business">
                探索主营业务
                <Icon name="arrow" />
              </Link>
              <Link className="secondary-button" to="/about">
                了解盛大兴泰
              </Link>
            </div>
            <div className="hero-trust">
              <span>
                <Icon name="shield" /> 重点招商引资企业
              </span>
              <span>
                <Icon name="globe" /> 亚欧全链路服务
              </span>
              <span>
                <Icon name="check" /> 专业合规保障
              </span>
            </div>
          </div>
        </div>
        <Link className="scroll-hint" to="/about" aria-label="查看关于我们">
          <span>SCROLL</span>
          <span className="scroll-line" />
        </Link>
      </section>}

      {(page === "home" || page === "about") && <section id="about" className="section bg-white">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual">
              <img
                src="https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?auto=format&fit=crop&w=1400&q=86"
                alt="繁忙国际物流港区内整齐排列的集装箱"
              />
              <div className="about-badge">
                <strong>一站式</strong>
                <span>跨境物流运输解决方案</span>
              </div>
              <div className="image-grid-mark" aria-hidden="true" />
            </div>
            <div className="about-copy">
              <SectionHeading
                eyebrow="ABOUT GRAND XINGTAI"
                title="立足向西开放前沿，构筑亚欧物流新枢纽"
                text="新疆盛大兴泰商贸有限公司是塔城重点招商引资企业。依托雄厚资本实力、集团化产业协同与现代化基础设施，我们持续打通中国与亚欧市场的双向流通渠道。"
              />
              <div className="about-points">
                <div>
                  <span>
                    <Icon name="shield" />
                  </span>
                  <p>
                    <strong>雄厚资本护航</strong>
                    <small>1.2亿元投资，构筑稳健业务基础</small>
                  </p>
                </div>
                <div>
                  <span>
                    <Icon name="globe" />
                  </span>
                  <p>
                    <strong>完整产业协同</strong>
                    <small>母公司战略统筹，专业子公司协同运营</small>
                  </p>
                </div>
                <div>
                  <span>
                    <Icon name="box" />
                  </span>
                  <p>
                    <strong>全链路服务生态</strong>
                    <small>仓储、运输、通关、外贸代理无缝衔接</small>
                  </p>
                </div>
              </div>
              <Link className="text-link" to="/contact">
                与我们展开合作 <Icon name="arrow" />
              </Link>
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
              eyebrow="OUR BUSINESS"
              title="全链路跨境物流服务"
              text="从货物入仓到顺利抵达，我们将每一个复杂环节转化为清晰、高效、可追踪的运输体验。"
            />
            <div className="section-index hidden lg:block">04 / SERVICES</div>
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
                  aria-label={`了解${service.title}服务`}
                >
                  了解业务 <Icon name="arrow" />
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
              eyebrow="SILK ROAD CORRIDOR"
              title="向西开放，聚力远航"
              text="依托新疆口岸区位优势，构筑面向中亚及欧洲的高效物流走廊。全程节点追踪、专业团队协同，让跨境运输稳定可靠。"
              light
            />
            <div className="corridor-tags">
              <span>中国</span>
              <Icon name="arrow" />
              <span>新疆塔城</span>
              <Icon name="arrow" />
              <span>中亚</span>
              <Icon name="arrow" />
              <span>欧洲</span>
            </div>
          </div>
          <div className="commerce-panel">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.24em] text-brand-cyan">
                  CROSS-BORDER E-COMMERCE
                </p>
                <h3>跨境电商多模式通关</h3>
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

      {page === "about" && <section className="section advantage-section">
        <div className="container">
          <SectionHeading
            eyebrow="WHY CHOOSE US"
            title="专业，让每一程更有保障"
            text="现代化基础设施、成熟的协同网络与规范的服务标准，共同构成盛大兴泰值得信赖的交付能力。"
          />
          <div className="advantages-grid">
            <div className="advantage-feature">
              <p>全天候响应</p>
              <strong>7 × 24</strong>
              <span>从方案制定到货物签收，专业团队全程跟进。</span>
            </div>
            <div className="advantage-list">
              {[
                ["01", "智能监管", "287个高清监控点位，货物状态清晰可视"],
                ["02", "专业车队", "自有与协作运力灵活调配，满足多场景运输"],
                ["03", "高效通关", "报关报检协同办理，压缩货物口岸停留时间"],
                ["04", "安全仓储", "标准化库区管理，为货物提供可靠保障"],
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
                eyebrow="CONTACT US"
                title="共绘跨境物流新蓝图"
                text="无论您需要仓储、运输还是通关服务，我们都将根据业务场景，为您提供专业、可靠的定制方案。"
                light
              />
              <div className="contact-detail">
                <span>
                  <Icon name="map" />
                </span>
                <p>
                  <small>企业所在地</small>
                  <strong>新疆 · 塔城重点开发开放试验区</strong>
                </p>
              </div>
              <div className="contact-detail">
                <span>
                  <Icon name="mail" />
                </span>
                <p>
                  <small>商务合作</small>
                  <strong>欢迎提交需求，专业顾问将尽快联系您</strong>
                </p>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div>
                <p className="form-kicker">GET A SOLUTION</p>
                <h3>获取专属运输方案</h3>
              </div>
              <label>
                <span>您的称呼</span>
                <input
                  name="name"
                  placeholder="请输入姓名或企业名称"
                  required
                />
              </label>
              <label>
                <span>联系电话</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="请输入联系电话"
                  required
                />
              </label>
              <label>
                <span>服务需求</span>
                <select name="service" defaultValue="">
                  <option value="" disabled>
                    请选择您感兴趣的服务
                  </option>
                  <option>海关监管仓</option>
                  <option>中欧航线</option>
                  <option>国际物流</option>
                  <option>报关报检</option>
                  <option>综合物流方案</option>
                </select>
              </label>
              <button className="form-submit" type="submit">
                提交需求 <Icon name="arrow" />
              </button>
              {submitted && (
                <p className="success-message" role="status">
                  <Icon name="check" />
                  在线咨询正在接入中，您的需求尚未发送，请稍后再试。
                </p>
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
                <p className="detail-label">SERVICE OVERVIEW</p>
                <h2>专业能力，成就高效交付</h2>
              </div>
              <p>{serviceDetails[service].statement}</p>
            </div>

            {service === "bonded-warehouse" && (
              <div className="warehouse-showcase">
                <div className="detail-heading">
                  <p className="detail-label">WAREHOUSE IN OPERATION</p>
                  <h2>监管仓园区实景</h2>
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
              <p className="detail-label">CORE CAPABILITIES</p>
              <h2>核心服务能力</h2>
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
                <p className="detail-label">SERVICE PROCESS</p>
                <h2>标准化服务流程</h2>
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
                <p>定制您的专属物流方案</p>
                <h2>让专业团队为您的跨境业务保驾护航</h2>
              </div>
              <Link className="primary-button" to="/contact">
                获取方案 <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer>
        <div className="container">
          <div className="footer-top">
            <Logo light />
            <nav aria-label="页脚导航">
              {navItems.map((item) => (
                <Link to={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <p>仓储装卸 · 跨境运输 · 外贸代理 · 报关报检</p>
          </div>
          <address className="footer-contact">
            <p>地址：新疆塔城地区塔城市巴克图路南侧(盛大兴泰监管库)</p>
            <p>邮箱：<a href="mailto:info@shengdaxingtai.com">info@shengdaxingtai.com</a></p>
          </address>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} 新疆盛大兴泰商贸有限公司</span>
            <span>以诚信经营铸就口碑，以专业服务链接未来</span>
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
