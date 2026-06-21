window.UK_SPECTRUM_DATA = {
  "axes": [
    {
      "id": "A",
      "short": "FISC",
      "name": "财政、福利、再分配",
      "negativeLabel": "低税/小福利/财政紧缩",
      "positiveLabel": "高税/公共服务/再分配",
      "color": "#cf5549",
      "weight": 1.2,
      "tags": [
        "NHS",
        "税收",
        "福利"
      ],
      "facets": [
        "tax_public_services",
        "welfare",
        "child_poverty",
        "fiscal_discipline"
      ]
    },
    {
      "id": "B",
      "short": "LAB",
      "name": "市场、劳动、公共所有",
      "negativeLabel": "私有化/放松规制/灵活雇佣",
      "positiveLabel": "工会权利/公共所有/产业政策",
      "color": "#b47a18",
      "weight": 1.1,
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ],
      "facets": [
        "public_ownership",
        "labour_rights",
        "industrial_strategy",
        "regulation"
      ]
    },
    {
      "id": "C",
      "short": "MIG",
      "name": "移民、身份、边境",
      "negativeLabel": "限制移民/强边境/同化",
      "positiveLabel": "开放移民/多元身份/人道庇护",
      "color": "#7656a7",
      "weight": 1.2,
      "tags": [
        "移民",
        "庇护",
        "身份"
      ],
      "facets": [
        "asylum",
        "migration_economy",
        "border_control",
        "identity"
      ]
    },
    {
      "id": "D",
      "short": "LIB",
      "name": "秩序、警务、公民自由",
      "negativeLabel": "警务扩权/惩罚主义/强秩序",
      "positiveLabel": "公民自由/隐私/恢复性司法",
      "color": "#247c9b",
      "weight": 0.9,
      "tags": [
        "警务",
        "司法",
        "自由"
      ],
      "facets": [
        "policing",
        "criminal_justice",
        "privacy",
        "protest"
      ]
    },
    {
      "id": "E",
      "short": "EU",
      "name": "欧洲、Brexit、主权",
      "negativeLabel": "Hard Brexit/主权优先",
      "positiveLabel": "亲欧/单一市场/重返EU",
      "color": "#435bb8",
      "weight": 1.3,
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ],
      "facets": [
        "single_market",
        "brexit",
        "echr",
        "european_identity"
      ]
    },
    {
      "id": "F",
      "short": "UNION",
      "name": "联合王国、自治、自决",
      "negativeLabel": "强Union/Westminster中心",
      "positiveLabel": "去中心化/联邦化/民族自决",
      "color": "#8f6b2f",
      "weight": 1.3,
      "tags": [
        "Union",
        "自治",
        "自决"
      ],
      "facets": [
        "scotland",
        "wales",
        "northern_ireland",
        "english_devolution"
      ]
    },
    {
      "id": "G",
      "short": "GREEN",
      "name": "气候、能源、土地",
      "negativeLabel": "成本优先/油气/反net zero",
      "positiveLabel": "快速绿色转型/生态政策",
      "color": "#2f8f6f",
      "weight": 1,
      "tags": [
        "气候",
        "能源",
        "土地"
      ],
      "facets": [
        "net_zero",
        "oil_gas",
        "renewables",
        "land_use"
      ]
    },
    {
      "id": "H",
      "short": "REF",
      "name": "民主制度、选制、宪法改革",
      "negativeLabel": "FPTP/Lords/宪制现状",
      "positiveLabel": "PR/上院改革/成文宪法",
      "color": "#5f7891",
      "weight": 0.9,
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ],
      "facets": [
        "electoral_system",
        "lords",
        "constitution",
        "participation"
      ]
    },
    {
      "id": "I",
      "short": "EQ",
      "name": "平等、性别、族群、多元文化",
      "negativeLabel": "anti-DEI/传统文化保守",
      "positiveLabel": "LGBTQ+/族群平等/多元文化",
      "color": "#9c5aa6",
      "weight": 1,
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ],
      "facets": [
        "anti_discrimination",
        "history",
        "trans_rights",
        "free_speech"
      ]
    },
    {
      "id": "J",
      "short": "SEC",
      "name": "外交、防务、安全",
      "negativeLabel": "克制/反干预/低军费",
      "positiveLabel": "NATO/军费/核威慑/安全鹰派",
      "color": "#c0613a",
      "weight": 0.8,
      "tags": [
        "NATO",
        "防务",
        "外交"
      ],
      "facets": [
        "defence_spending",
        "nato",
        "trident",
        "sanctions"
      ]
    }
  ],
  "questions": [
    {
      "id": "A-01",
      "axis": "A",
      "facet": "tax_public_services",
      "textZh": "英国应通过提高高收入者税负来为NHS和社会照护提供长期资金。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-02",
      "axis": "A",
      "facet": "welfare",
      "textZh": "政府不应为了维持低税率而继续压缩公共服务。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-03",
      "axis": "A",
      "facet": "child_poverty",
      "textZh": "财富、资本利得和遗产应比现在承担更高比例的税收。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-04",
      "axis": "A",
      "facet": "fiscal_discipline",
      "textZh": "即使财政压力较大，也应优先保护残障、失业和低收入家庭福利。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-05",
      "axis": "A",
      "facet": "tax_public_services",
      "textZh": "对普通劳动者来说，公共服务质量比个人所得税略低更重要。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-06",
      "axis": "A",
      "facet": "welfare",
      "textZh": "国家养老金 triple lock 应继续维持，哪怕这增加长期财政压力。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-07",
      "axis": "A",
      "facet": "child_poverty",
      "textZh": "政府应扩大免费校餐、儿童补贴和住房补贴以降低儿童贫困。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-08",
      "axis": "A",
      "facet": "fiscal_discipline",
      "textZh": "英国当前更需要财政纪律，而不是扩大公共开支。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-09",
      "axis": "A",
      "facet": "tax_public_services",
      "textZh": "福利制度过于慷慨，削减福利有助于恢复工作激励。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-10",
      "axis": "A",
      "facet": "welfare",
      "textZh": "对私立学校征税以资助公立教育是合理的。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-11",
      "axis": "A",
      "facet": "child_poverty",
      "textZh": "地方政府应获得更稳定、更充足的中央财政支持。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-12",
      "axis": "A",
      "facet": "fiscal_discipline",
      "textZh": "为降低债务，政府应优先减少公共部门规模。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-13",
      "axis": "A",
      "facet": "tax_public_services",
      "textZh": "NHS应主要通过公共税收融资，而不是更多依赖个人付费或私人保险。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-14",
      "axis": "A",
      "facet": "welfare",
      "textZh": "住房危机需要更强的政府补贴、公共住房和租金保护。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-15",
      "axis": "A",
      "facet": "child_poverty",
      "textZh": "低收入家庭受到通胀冲击时，政府应自动提高相关福利。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "A-16",
      "axis": "A",
      "facet": "fiscal_discipline",
      "textZh": "英国的贫富差距已经达到需要强力再分配的程度。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NHS",
        "税收",
        "福利"
      ]
    },
    {
      "id": "B-01",
      "axis": "B",
      "facet": "public_ownership",
      "textZh": "铁路应重新纳入公共控制，而不是继续主要依赖特许经营或私营运营。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-02",
      "axis": "B",
      "facet": "labour_rights",
      "textZh": "水务公司污染河流时，政府应能强制重组、罚款甚至公共接管。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-03",
      "axis": "B",
      "facet": "industrial_strategy",
      "textZh": "能源、铁路、水务等自然垄断行业不应完全按私人利润逻辑运行。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-04",
      "axis": "B",
      "facet": "regulation",
      "textZh": "零工经济和零小时合同需要更强劳动保护。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-05",
      "axis": "B",
      "facet": "public_ownership",
      "textZh": "工会应更容易组织集体谈判和罢工。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-06",
      "axis": "B",
      "facet": "labour_rights",
      "textZh": "最低工资应继续显著提高，即使部分企业成本上升。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-07",
      "axis": "B",
      "facet": "industrial_strategy",
      "textZh": "国家应通过产业战略扶持清洁能源、半导体、生命科学和先进制造。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-08",
      "axis": "B",
      "facet": "regulation",
      "textZh": "英国经济增长主要应靠减税和放松管制，而不是产业政策。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-09",
      "axis": "B",
      "facet": "public_ownership",
      "textZh": "大型科技平台应承担更高的竞争、隐私和内容责任。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-10",
      "axis": "B",
      "facet": "labour_rights",
      "textZh": "对企业来说，灵活雇佣比劳动保护更重要。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-11",
      "axis": "B",
      "facet": "industrial_strategy",
      "textZh": "政府采购应优先支持本地就业和长期产业能力。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-12",
      "axis": "B",
      "facet": "regulation",
      "textZh": "房地产和金融业在英国经济中的权重过高，需要政策再平衡。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-13",
      "axis": "B",
      "facet": "public_ownership",
      "textZh": "对中小企业减负可以，但不能以牺牲劳动者基本权利为代价。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-14",
      "axis": "B",
      "facet": "labour_rights",
      "textZh": "大规模基础设施投资应由国家主导，即使短期财政赤字扩大。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-15",
      "axis": "B",
      "facet": "industrial_strategy",
      "textZh": "市场竞争通常比公共部门更能提高效率。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "B-16",
      "axis": "B",
      "facet": "regulation",
      "textZh": "英国需要一种更积极的国家经济规划能力。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "劳动",
        "公共所有",
        "产业政策"
      ]
    },
    {
      "id": "C-01",
      "axis": "C",
      "facet": "asylum",
      "textZh": "合法移民整体上对英国经济和社会贡献大于负担。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-02",
      "axis": "C",
      "facet": "migration_economy",
      "textZh": "英国应为难民和庇护申请者提供安全、合法、可行的申请路径。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-03",
      "axis": "C",
      "facet": "border_control",
      "textZh": "“stop the boats” 不应以削弱国际人权义务为代价。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-04",
      "axis": "C",
      "facet": "identity",
      "textZh": "技能短缺行业应更容易吸纳海外劳动者。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-05",
      "axis": "C",
      "facet": "asylum",
      "textZh": "家庭团聚权应在移民政策中受到较强保护。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-06",
      "axis": "C",
      "facet": "migration_economy",
      "textZh": "英国文化身份足够开放，可以容纳多元族群和宗教。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-07",
      "axis": "C",
      "facet": "border_control",
      "textZh": "净移民数量应被设定为严格年度上限。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-08",
      "axis": "C",
      "facet": "identity",
      "textZh": "移民削弱了英国的社会凝聚力。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-09",
      "axis": "C",
      "facet": "asylum",
      "textZh": "政府应优先投资语言教育、地方公共服务和融合政策，而不是简单限制人数。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-10",
      "axis": "C",
      "facet": "migration_economy",
      "textZh": "庇护申请者在等待裁定期间应更容易合法工作。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-11",
      "axis": "C",
      "facet": "border_control",
      "textZh": "英国应退出阻碍遣返非法移民的国际人权安排。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-12",
      "axis": "C",
      "facet": "identity",
      "textZh": "大学吸引国际学生对英国长期有利。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-13",
      "axis": "C",
      "facet": "asylum",
      "textZh": "对低薪照护、农业和餐饮工人实施过严签证限制会损害公共服务和经济。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-14",
      "axis": "C",
      "facet": "migration_economy",
      "textZh": "英国公民身份应更强调共同价值，而不是出生地、族裔或宗教。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-15",
      "axis": "C",
      "facet": "border_control",
      "textZh": "移民政策应考虑地方承载压力，但不能把社会问题简单归咎于移民。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "C-16",
      "axis": "C",
      "facet": "identity",
      "textZh": "对移民的文化同化要求应比现在更强。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "移民",
        "庇护",
        "身份"
      ]
    },
    {
      "id": "D-01",
      "axis": "D",
      "facet": "policing",
      "textZh": "和扩大刑罚相比，减少贫困、教育失败和精神健康问题更能降低犯罪。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-02",
      "axis": "D",
      "facet": "criminal_justice",
      "textZh": "警方使用面部识别和大规模监控必须受到严格限制。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-03",
      "axis": "D",
      "facet": "privacy",
      "textZh": "和更长刑期相比，英国更需要修复监狱、缓刑和再融入体系。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-04",
      "axis": "D",
      "facet": "protest",
      "textZh": "对和平抗议的限制已经过强，应恢复更宽的抗议权。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-05",
      "axis": "D",
      "facet": "policing",
      "textZh": "国家安全不能成为普遍削弱公民隐私的理由。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-06",
      "axis": "D",
      "facet": "criminal_justice",
      "textZh": "对青少年犯罪，应优先考虑教育、家庭干预和社区修复。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-07",
      "axis": "D",
      "facet": "privacy",
      "textZh": "司法援助应扩大，让低收入者真正能获得法律保护。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-08",
      "axis": "D",
      "facet": "protest",
      "textZh": "对反社会行为应采取更快、更严厉的惩罚。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-09",
      "axis": "D",
      "facet": "policing",
      "textZh": "警察应拥有更多 stop and search 权力。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-10",
      "axis": "D",
      "facet": "criminal_justice",
      "textZh": "恐怖主义和极端主义风险足以证明更强的预防性监控。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-11",
      "axis": "D",
      "facet": "privacy",
      "textZh": "言论自由应保护冒犯性言论，但不应保护煽动暴力和直接仇恨。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-12",
      "axis": "D",
      "facet": "protest",
      "textZh": "移民拘留应有更明确的时间上限和司法审查。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-13",
      "axis": "D",
      "facet": "policing",
      "textZh": "私人监狱不适合承担核心刑罚职能。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-14",
      "axis": "D",
      "facet": "criminal_justice",
      "textZh": "司法系统应更关注受害者修复，而不是只追求惩罚。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-15",
      "axis": "D",
      "facet": "privacy",
      "textZh": "对毒品问题，应更多采用公共卫生方法而不是刑事化。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "D-16",
      "axis": "D",
      "facet": "protest",
      "textZh": "政府不应为了效率而削弱陪审团审判等传统程序保障。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "警务",
        "司法",
        "自由"
      ]
    },
    {
      "id": "E-01",
      "axis": "E",
      "facet": "single_market",
      "textZh": "英国应寻求重新加入欧盟单一市场。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-02",
      "axis": "E",
      "facet": "brexit",
      "textZh": "为了更好的贸易和青年流动，英国可以接受一定形式的人员自由流动。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-03",
      "axis": "E",
      "facet": "echr",
      "textZh": "Brexit 对英国经济、投资和青年机会的损害大于收益。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-04",
      "axis": "E",
      "facet": "european_identity",
      "textZh": "长远看，英国应认真考虑重新加入欧盟。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-05",
      "axis": "E",
      "facet": "single_market",
      "textZh": "英国应优先与欧洲建立制度化安全与外交合作。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-06",
      "axis": "E",
      "facet": "brexit",
      "textZh": "欧洲人权公约对保护个人权利仍有重要意义。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-07",
      "axis": "E",
      "facet": "echr",
      "textZh": "英国不应为了主权象征而牺牲实际贸易便利。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-08",
      "axis": "E",
      "facet": "european_identity",
      "textZh": "Brexit 使英国重新获得了必要的政治自主权。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-09",
      "axis": "E",
      "facet": "single_market",
      "textZh": "欧盟规则过度限制英国创新和边境控制。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-10",
      "axis": "E",
      "facet": "brexit",
      "textZh": "英国应避免重新卷入欧盟制度。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-11",
      "axis": "E",
      "facet": "echr",
      "textZh": "对企业来说，降低与欧盟贸易摩擦比自由签署远距离贸易协议更重要。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-12",
      "axis": "E",
      "facet": "european_identity",
      "textZh": "北爱尔兰和平安排要求英国在欧盟问题上保持务实。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-13",
      "axis": "E",
      "facet": "single_market",
      "textZh": "英国大学、科研和文化领域应尽量重新接入欧洲项目。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-14",
      "axis": "E",
      "facet": "brexit",
      "textZh": "主权的价值在于改善人民生活，而不只是“自己制定规则”。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-15",
      "axis": "E",
      "facet": "echr",
      "textZh": "英国外交身份应首先是欧洲国家，其次才是全球离岸大国。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "E-16",
      "axis": "E",
      "facet": "european_identity",
      "textZh": "如果重返欧盟需要重新接受共同规则，那也是可以讨论的代价。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Brexit",
        "欧盟",
        "主权"
      ]
    },
    {
      "id": "F-01",
      "axis": "F",
      "facet": "scotland",
      "textZh": "苏格兰应有权在明确民主授权下再次举行独立公投。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-02",
      "axis": "F",
      "facet": "wales",
      "textZh": "威尔士应获得更广泛的财政、司法和自然资源权力。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-03",
      "axis": "F",
      "facet": "northern_ireland",
      "textZh": "北爱尔兰未来地位应严格依据当地民意和《贝尔法斯特/Good Friday Agreement》。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-04",
      "axis": "F",
      "facet": "english_devolution",
      "textZh": "Westminster 不应轻易否决苏格兰、威尔士或北爱尔兰议会的民主决定。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-05",
      "axis": "F",
      "facet": "scotland",
      "textZh": "英国应向更接近联邦制的结构发展。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-06",
      "axis": "F",
      "facet": "wales",
      "textZh": "英格兰地区也应获得更强市长、财政和交通权力。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-07",
      "axis": "F",
      "facet": "northern_ireland",
      "textZh": "联合王国的统一比各地自治诉求更重要。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-08",
      "axis": "F",
      "facet": "english_devolution",
      "textZh": "苏格兰独立会严重削弱英国，应尽量阻止。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-09",
      "axis": "F",
      "facet": "scotland",
      "textZh": "威尔士独立不是现实议题，但进一步自治是合理方向。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-10",
      "axis": "F",
      "facet": "wales",
      "textZh": "英国应建立成文宪法来明确中央与地方权力。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-11",
      "axis": "F",
      "facet": "northern_ireland",
      "textZh": "地方政府比 Westminster 更了解住房、交通和公共卫生需求。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-12",
      "axis": "F",
      "facet": "english_devolution",
      "textZh": "英国国内市场完整性不应成为压制地方政策实验的借口。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-13",
      "axis": "F",
      "facet": "scotland",
      "textZh": "Northern Ireland 的身份政治不能只用英国左右翼坐标解释。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-14",
      "axis": "F",
      "facet": "wales",
      "textZh": "英格兰也需要更清晰的自治安排，而不是让 Westminster 同时代表英国和英格兰。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-15",
      "axis": "F",
      "facet": "northern_ireland",
      "textZh": "如果多数苏格兰人长期支持独立，英国应以协商方式处理。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "F-16",
      "axis": "F",
      "facet": "english_devolution",
      "textZh": "Union 应通过提供公共服务和互惠利益来维持，而不是靠法律阻断。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "Union",
        "自治",
        "自决"
      ]
    },
    {
      "id": "G-01",
      "axis": "G",
      "facet": "net_zero",
      "textZh": "英国应坚持2050 net zero，并尽量提前关键行业减排。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-02",
      "axis": "G",
      "facet": "oil_gas",
      "textZh": "北海油气应快速转向下降轨道，并配套工人转型计划。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-03",
      "axis": "G",
      "facet": "renewables",
      "textZh": "新建可再生能源、输电网络和储能基础设施应被列为国家优先事项。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-04",
      "axis": "G",
      "facet": "land_use",
      "textZh": "短期能源账单压力不能成为放弃气候目标的理由。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-05",
      "axis": "G",
      "facet": "net_zero",
      "textZh": "政府应大规模资助住宅保温、热泵和公共交通。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-06",
      "axis": "G",
      "facet": "oil_gas",
      "textZh": "对污染严重企业征收更高环境税是合理的。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-07",
      "axis": "G",
      "facet": "renewables",
      "textZh": "保护自然、河流和生物多样性应高于部分短期开发利益。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-08",
      "axis": "G",
      "facet": "land_use",
      "textZh": "为能源安全，英国应继续扩大本土油气开采。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-09",
      "axis": "G",
      "facet": "net_zero",
      "textZh": "Net zero 政策对普通家庭成本太高，应暂停或取消。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-10",
      "axis": "G",
      "facet": "oil_gas",
      "textZh": "农民和乡村社区应获得绿色转型补偿，而不是被简单要求承担成本。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-11",
      "axis": "G",
      "facet": "renewables",
      "textZh": "城市低排放区和拥堵收费在原则上是合理政策。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-12",
      "axis": "G",
      "facet": "land_use",
      "textZh": "机场扩建和高速公路建设应受到更严格碳约束。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-13",
      "axis": "G",
      "facet": "net_zero",
      "textZh": "英国需要把绿色产业视为再工业化机会。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-14",
      "axis": "G",
      "facet": "oil_gas",
      "textZh": "绿色政策如果没有公平补偿，会加剧地区和阶层不满。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-15",
      "axis": "G",
      "facet": "renewables",
      "textZh": "水污染、污水排放和河流治理应成为核心政治议题。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "G-16",
      "axis": "G",
      "facet": "land_use",
      "textZh": "保护优质农地与发展太阳能之间需要国家层面的土地规划。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "气候",
        "能源",
        "土地"
      ]
    },
    {
      "id": "H-01",
      "axis": "H",
      "facet": "electoral_system",
      "textZh": "英国应把大选改为比例代表制或混合比例制。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-02",
      "axis": "H",
      "facet": "lords",
      "textZh": "First-past-the-post 已经严重扭曲选票与席位关系。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-03",
      "axis": "H",
      "facet": "constitution",
      "textZh": "House of Lords 应改为主要或完全民选。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-04",
      "axis": "H",
      "facet": "participation",
      "textZh": "世袭贵族不应继续参与立法。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-05",
      "axis": "H",
      "facet": "electoral_system",
      "textZh": "英国需要成文宪法来限制政府权力。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-06",
      "axis": "H",
      "facet": "lords",
      "textZh": "选民应更容易罢免严重失职或腐败的议员。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-07",
      "axis": "H",
      "facet": "constitution",
      "textZh": "降低投票年龄到16岁是合理的。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-08",
      "axis": "H",
      "facet": "participation",
      "textZh": "Voter ID 要求会不必要地提高投票门槛。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-09",
      "axis": "H",
      "facet": "electoral_system",
      "textZh": "君主制应继续作为英国宪政稳定核心。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-10",
      "axis": "H",
      "facet": "lords",
      "textZh": "FPTP 有助于产生稳定政府，应继续保留。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-11",
      "axis": "H",
      "facet": "constitution",
      "textZh": "政党政治献金应受到更严格上限和透明要求。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-12",
      "axis": "H",
      "facet": "participation",
      "textZh": "公投适合处理重大宪政问题，但必须有清晰规则与阈值。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-13",
      "axis": "H",
      "facet": "electoral_system",
      "textZh": "英国应加强地方公民大会、参与式预算和审议民主实验。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-14",
      "axis": "H",
      "facet": "lords",
      "textZh": "首相权力过大，应强化议会和法院对行政的约束。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-15",
      "axis": "H",
      "facet": "constitution",
      "textZh": "媒体集中所有权对民主质量构成威胁。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "H-16",
      "axis": "H",
      "facet": "participation",
      "textZh": "英国政治最大问题不是制度，而是政治人物能力。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "选制",
        "宪法",
        "民主改革"
      ]
    },
    {
      "id": "I-01",
      "axis": "I",
      "facet": "anti_discrimination",
      "textZh": "政府和学校应主动反对种族歧视、性别歧视和LGBTQ+歧视。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-02",
      "axis": "I",
      "facet": "history",
      "textZh": "反歧视政策不应被简单贴上“woke politics”的标签。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-03",
      "axis": "I",
      "facet": "trans_rights",
      "textZh": "历史教育应同时讲英国成就与帝国、殖民和奴隶贸易的阴暗面。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-04",
      "axis": "I",
      "facet": "free_speech",
      "textZh": "公共机构可以合理使用平等、多元与包容政策。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-05",
      "axis": "I",
      "facet": "anti_discrimination",
      "textZh": "跨性别者应在医疗、就业和公共服务中获得尊重与保护。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-06",
      "axis": "I",
      "facet": "history",
      "textZh": "性别自我认同政策需要谨慎处理，但不应被用来否定跨性别者尊严。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-07",
      "axis": "I",
      "facet": "trans_rights",
      "textZh": "女性安全空间和跨性别权利之间需要细致平衡，而不是文化战争。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-08",
      "axis": "I",
      "facet": "free_speech",
      "textZh": "学校不应向儿童讲授性别多样性。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-09",
      "axis": "I",
      "facet": "anti_discrimination",
      "textZh": "DEI 政策通常制造新的不公平。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-10",
      "axis": "I",
      "facet": "history",
      "textZh": "英国社会已经过度关注少数群体权利。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-11",
      "axis": "I",
      "facet": "trans_rights",
      "textZh": "对仇恨犯罪的执法和记录应保持严肃。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-12",
      "axis": "I",
      "facet": "free_speech",
      "textZh": "多元文化主义总体上让英国社会更丰富。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-13",
      "axis": "I",
      "facet": "anti_discrimination",
      "textZh": "言论自由重要，但公共人物应为煽动仇恨承担责任。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-14",
      "axis": "I",
      "facet": "history",
      "textZh": "国家象征和爱国主义可以包容多族群、多宗教英国人。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-15",
      "axis": "I",
      "facet": "trans_rights",
      "textZh": "解决阶级不平等不应被拿来否定族群和性别不平等。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "I-16",
      "axis": "I",
      "facet": "free_speech",
      "textZh": "反“政治正确”已经成为回避真实歧视问题的借口。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "平等",
        "多元文化",
        "反歧视"
      ]
    },
    {
      "id": "J-01",
      "axis": "J",
      "facet": "defence_spending",
      "textZh": "英国应把国防支出提高到至少GDP 2.5%。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-02",
      "axis": "J",
      "facet": "nato",
      "textZh": "NATO 是英国安全政策不可替代的核心。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-03",
      "axis": "J",
      "facet": "trident",
      "textZh": "英国应继续强力支持乌克兰。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-04",
      "axis": "J",
      "facet": "sanctions",
      "textZh": "英国应保留核威慑力量 Trident。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-05",
      "axis": "J",
      "facet": "defence_spending",
      "textZh": "英国需要更强的军工、网络安全和情报能力。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-06",
      "axis": "J",
      "facet": "nato",
      "textZh": "在面对威权国家时，英国应更愿意使用制裁和军事威慑。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-07",
      "axis": "J",
      "facet": "trident",
      "textZh": "海外援助不应因国内财政困难被大幅削减。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-08",
      "axis": "J",
      "facet": "sanctions",
      "textZh": "英国过度追随美国外交，会损害独立判断。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-09",
      "axis": "J",
      "facet": "defence_spending",
      "textZh": "军事干预通常制造的问题多于解决的问题。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-10",
      "axis": "J",
      "facet": "nato",
      "textZh": "核武器不道德且昂贵，英国应逐步核裁军。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-11",
      "axis": "J",
      "facet": "trident",
      "textZh": "英国应把气候、贫困和公共卫生视为国家安全议题。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-12",
      "axis": "J",
      "facet": "sanctions",
      "textZh": "对中国、俄罗斯等国家，英国应在经济利益和安全风险之间采取更强安全审查。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-13",
      "axis": "J",
      "facet": "defence_spending",
      "textZh": "英国应维持与美国、欧洲和英联邦的多边关系，而不是单边主义。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-14",
      "axis": "J",
      "facet": "nato",
      "textZh": "国防采购应优先保障本土制造与供应链韧性。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-15",
      "axis": "J",
      "facet": "trident",
      "textZh": "人权应在英国外交政策中占据更高优先级。",
      "polarity": 1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    },
    {
      "id": "J-16",
      "axis": "J",
      "facet": "sanctions",
      "textZh": "英国不应再试图扮演全球军事大国。",
      "polarity": -1,
      "weight": 1,
      "countryScope": [
        "UK"
      ],
      "tags": [
        "NATO",
        "防务",
        "外交"
      ]
    }
  ],
  "profiles": [
    {
      "id": "labour_starmer",
      "name": "Labour / Starmerite",
      "short": "LAB",
      "camp": "labour",
      "regions": [
        "UK",
        "England",
        "Scotland",
        "Wales"
      ],
      "scores": {
        "A": 58,
        "B": 56,
        "C": 62,
        "D": 60,
        "E": 65,
        "F": 45,
        "G": 67,
        "H": 58,
        "I": 66,
        "J": 72
      },
      "note": "中左、财政谨慎、亲产业政策、亲NATO、有限亲欧。",
      "confidence": 74
    },
    {
      "id": "labour_soft_left",
      "name": "Labour Soft Left / Burnham式地方主义",
      "short": "LSL",
      "camp": "labour",
      "regions": [
        "UK",
        "England",
        "Scotland",
        "Wales"
      ],
      "scores": {
        "A": 68,
        "B": 72,
        "C": 68,
        "D": 66,
        "E": 68,
        "F": 60,
        "G": 72,
        "H": 68,
        "I": 70,
        "J": 60
      },
      "note": "公共服务、地方权力、工会与社区路线，较民粹但非硬左。",
      "confidence": 62
    },
    {
      "id": "labour_left",
      "name": "Labour Left / Corbynite / Your Party倾向",
      "short": "LL",
      "camp": "labour-left",
      "regions": [
        "UK",
        "England",
        "Scotland",
        "Wales"
      ],
      "scores": {
        "A": 86,
        "B": 90,
        "C": 78,
        "D": 78,
        "E": 65,
        "F": 72,
        "G": 88,
        "H": 82,
        "I": 82,
        "J": 25
      },
      "note": "高再分配、反紧缩、反干预、强公共所有；Your Party 倾向为低稳定度估计。",
      "confidence": 50,
      "stability": "low"
    },
    {
      "id": "blue_labour",
      "name": "Blue Labour / communitarian Labour",
      "short": "BL",
      "camp": "labour",
      "regions": [
        "UK",
        "England",
        "Wales"
      ],
      "scores": {
        "A": 62,
        "B": 58,
        "C": 38,
        "D": 42,
        "E": 45,
        "F": 45,
        "G": 60,
        "H": 45,
        "I": 40,
        "J": 65
      },
      "note": "经济偏左但文化保守，强调社区、国家、秩序和共同体。",
      "confidence": 52
    },
    {
      "id": "conservative",
      "name": "Conservative / Badenoch-era",
      "short": "CON",
      "camp": "conservative",
      "regions": [
        "UK",
        "England",
        "Scotland",
        "Wales"
      ],
      "scores": {
        "A": 30,
        "B": 25,
        "C": 25,
        "D": 25,
        "E": 20,
        "F": 15,
        "G": 22,
        "H": 25,
        "I": 25,
        "J": 82
      },
      "note": "低税、强边境、反ECHR/反woke、强Union和强国防。",
      "confidence": 70
    },
    {
      "id": "one_nation_tory",
      "name": "One Nation Conservative",
      "short": "ONC",
      "camp": "conservative",
      "regions": [
        "UK",
        "England",
        "Scotland",
        "Wales"
      ],
      "scores": {
        "A": 42,
        "B": 40,
        "C": 46,
        "D": 48,
        "E": 45,
        "F": 25,
        "G": 52,
        "H": 35,
        "I": 48,
        "J": 76
      },
      "note": "温和保守、社会凝聚、公共服务较务实，文化议题更低冲突。",
      "confidence": 58
    },
    {
      "id": "thatcherite_tory",
      "name": "Thatcherite / Free-market Tory",
      "short": "THA",
      "camp": "conservative",
      "regions": [
        "UK",
        "England",
        "Scotland",
        "Wales"
      ],
      "scores": {
        "A": 22,
        "B": 18,
        "C": 35,
        "D": 35,
        "E": 25,
        "F": 15,
        "G": 35,
        "H": 25,
        "I": 36,
        "J": 78
      },
      "note": "低税、私有化、放松管制、强国防。",
      "confidence": 56
    },
    {
      "id": "natcon_tory",
      "name": "National Conservative / PopCon Tory",
      "short": "NAT",
      "camp": "national-right",
      "regions": [
        "UK",
        "England",
        "Wales"
      ],
      "scores": {
        "A": 28,
        "B": 25,
        "C": 14,
        "D": 18,
        "E": 8,
        "F": 8,
        "G": 12,
        "H": 20,
        "I": 14,
        "J": 82
      },
      "note": "主权、移民、文化战争、反net zero 和强Union。",
      "confidence": 54
    },
    {
      "id": "reform_uk",
      "name": "Reform UK",
      "short": "REFM",
      "camp": "national-right",
      "regions": [
        "UK",
        "England",
        "Scotland",
        "Wales"
      ],
      "scores": {
        "A": 32,
        "B": 30,
        "C": 12,
        "D": 18,
        "E": 5,
        "F": 10,
        "G": 8,
        "H": 32,
        "I": 12,
        "J": 78
      },
      "note": "反移民、反ECHR、反net zero、反建制，低税与福利民族主义混合。",
      "confidence": 66
    },
    {
      "id": "restore_britain",
      "name": "Restore Britain",
      "short": "RST",
      "camp": "national-right",
      "regions": [
        "UK",
        "England",
        "Wales"
      ],
      "scores": {
        "A": 25,
        "B": 22,
        "C": 5,
        "D": 10,
        "E": 0,
        "F": 5,
        "G": 5,
        "H": 15,
        "I": 5,
        "J": 85
      },
      "note": "更硬右翼民粹/民族保守；新兴力量坐标稳定度较低。",
      "confidence": 38,
      "stability": "low"
    },
    {
      "id": "libdem",
      "name": "Liberal Democrats",
      "short": "LD",
      "camp": "liberal",
      "regions": [
        "UK",
        "England",
        "Scotland",
        "Wales"
      ],
      "scores": {
        "A": 60,
        "B": 58,
        "C": 82,
        "D": 78,
        "E": 88,
        "F": 65,
        "G": 75,
        "H": 88,
        "I": 84,
        "J": 65
      },
      "note": "亲欧、自由主义、地方主义、比例代表制和公共服务投资。",
      "confidence": 72
    },
    {
      "id": "green_ew",
      "name": "Green Party of England and Wales",
      "short": "GRN",
      "camp": "green",
      "regions": [
        "UK",
        "England",
        "Wales"
      ],
      "scores": {
        "A": 90,
        "B": 88,
        "C": 92,
        "D": 88,
        "E": 85,
        "F": 76,
        "G": 98,
        "H": 90,
        "I": 92,
        "J": 35
      },
      "note": "生态左翼、强再分配、比例代表制、社会自由和反紧缩。",
      "confidence": 70
    },
    {
      "id": "snp",
      "name": "Scottish National Party (SNP)",
      "short": "SNP",
      "camp": "nationalist",
      "regions": [
        "UK",
        "Scotland"
      ],
      "scores": {
        "A": 70,
        "B": 68,
        "C": 76,
        "D": 72,
        "E": 90,
        "F": 96,
        "G": 78,
        "H": 82,
        "I": 78,
        "J": 55
      },
      "note": "苏格兰民族主义、亲欧、社会民主，强调独立与再次公投。",
      "confidence": 72
    },
    {
      "id": "plaid",
      "name": "Plaid Cymru",
      "short": "PC",
      "camp": "nationalist",
      "regions": [
        "UK",
        "Wales"
      ],
      "scores": {
        "A": 78,
        "B": 80,
        "C": 82,
        "D": 78,
        "E": 86,
        "F": 94,
        "G": 86,
        "H": 86,
        "I": 84,
        "J": 45
      },
      "note": "威尔士公民民族主义、社会民主、强自治与长期独立主义。",
      "confidence": 66
    },
    {
      "id": "sinn_fein",
      "name": "Sinn Fein",
      "short": "SF",
      "camp": "nationalist",
      "regions": [
        "UK",
        "Northern Ireland"
      ],
      "scores": {
        "A": 82,
        "B": 84,
        "C": 86,
        "D": 80,
        "E": 88,
        "F": 100,
        "G": 82,
        "H": 90,
        "I": 88,
        "J": 28
      },
      "note": "爱尔兰统一、左翼共和主义、亲欧与 Westminster abstention。",
      "confidence": 62
    },
    {
      "id": "dup",
      "name": "Democratic Unionist Party (DUP)",
      "short": "DUP",
      "camp": "unionist",
      "regions": [
        "UK",
        "Northern Ireland"
      ],
      "scores": {
        "A": 45,
        "B": 40,
        "C": 15,
        "D": 20,
        "E": 10,
        "F": 0,
        "G": 20,
        "H": 18,
        "I": 15,
        "J": 75
      },
      "note": "强Union、社会保守，Brexit/Protocol 议题强硬。",
      "confidence": 62
    },
    {
      "id": "uup",
      "name": "Ulster Unionist Party (UUP)",
      "short": "UUP",
      "camp": "unionist",
      "regions": [
        "UK",
        "Northern Ireland"
      ],
      "scores": {
        "A": 40,
        "B": 38,
        "C": 35,
        "D": 38,
        "E": 30,
        "F": 10,
        "G": 35,
        "H": 35,
        "I": 36,
        "J": 75
      },
      "note": "较温和传统 unionist 保守。",
      "confidence": 54
    },
    {
      "id": "tuv",
      "name": "Traditional Unionist Voice (TUV)",
      "short": "TUV",
      "camp": "unionist",
      "regions": [
        "UK",
        "Northern Ireland"
      ],
      "scores": {
        "A": 30,
        "B": 25,
        "C": 5,
        "D": 12,
        "E": 0,
        "F": 0,
        "G": 10,
        "H": 15,
        "I": 5,
        "J": 80
      },
      "note": "硬Union、反Protocol、文化保守。",
      "confidence": 48
    },
    {
      "id": "alliance_ni",
      "name": "Alliance Party of Northern Ireland",
      "short": "APNI",
      "camp": "liberal",
      "regions": [
        "UK",
        "Northern Ireland"
      ],
      "scores": {
        "A": 55,
        "B": 52,
        "C": 80,
        "D": 76,
        "E": 86,
        "F": 55,
        "G": 75,
        "H": 82,
        "I": 80,
        "J": 55
      },
      "note": "非宗派中间自由主义、亲欧和制度改革。",
      "confidence": 62
    },
    {
      "id": "sdlp",
      "name": "Social Democratic and Labour Party (SDLP)",
      "short": "SDLP",
      "camp": "nationalist",
      "regions": [
        "UK",
        "Northern Ireland"
      ],
      "scores": {
        "A": 70,
        "B": 70,
        "C": 82,
        "D": 76,
        "E": 90,
        "F": 90,
        "G": 80,
        "H": 85,
        "I": 84,
        "J": 45
      },
      "note": "社会民主、爱尔兰民族主义、亲欧和议会主义。",
      "confidence": 60
    }
  ],
  "modes": [
    {
      "id": "quick",
      "label": "快速版",
      "question_count": 40,
      "questionIds": [
        "A-01",
        "A-02",
        "A-03",
        "A-04",
        "B-01",
        "B-02",
        "B-03",
        "B-04",
        "C-01",
        "C-02",
        "C-03",
        "C-04",
        "D-01",
        "D-02",
        "D-03",
        "D-04",
        "E-01",
        "E-02",
        "E-03",
        "E-04",
        "F-01",
        "F-02",
        "F-03",
        "F-04",
        "G-01",
        "G-02",
        "G-03",
        "G-04",
        "H-01",
        "H-02",
        "H-03",
        "H-04",
        "I-01",
        "I-02",
        "I-03",
        "I-04",
        "J-01",
        "J-02",
        "J-03",
        "J-04"
      ]
    },
    {
      "id": "standard",
      "label": "标准版",
      "question_count": 80,
      "questionIds": [
        "A-01",
        "A-02",
        "A-03",
        "A-04",
        "A-05",
        "A-06",
        "A-07",
        "A-08",
        "B-01",
        "B-02",
        "B-03",
        "B-04",
        "B-05",
        "B-06",
        "B-07",
        "B-08",
        "C-01",
        "C-02",
        "C-03",
        "C-04",
        "C-05",
        "C-06",
        "C-07",
        "C-08",
        "D-01",
        "D-02",
        "D-03",
        "D-04",
        "D-05",
        "D-06",
        "D-07",
        "D-08",
        "E-01",
        "E-02",
        "E-03",
        "E-04",
        "E-05",
        "E-06",
        "E-07",
        "E-08",
        "F-01",
        "F-02",
        "F-03",
        "F-04",
        "F-05",
        "F-06",
        "F-07",
        "F-08",
        "G-01",
        "G-02",
        "G-03",
        "G-04",
        "G-05",
        "G-06",
        "G-07",
        "G-08",
        "H-01",
        "H-02",
        "H-03",
        "H-04",
        "H-05",
        "H-06",
        "H-07",
        "H-08",
        "I-01",
        "I-02",
        "I-03",
        "I-04",
        "I-05",
        "I-06",
        "I-07",
        "I-08",
        "J-01",
        "J-02",
        "J-03",
        "J-04",
        "J-05",
        "J-06",
        "J-07",
        "J-08"
      ]
    },
    {
      "id": "full",
      "label": "深度版",
      "question_count": 160,
      "questionIds": [
        "A-01",
        "A-02",
        "A-03",
        "A-04",
        "A-05",
        "A-06",
        "A-07",
        "A-08",
        "A-09",
        "A-10",
        "A-11",
        "A-12",
        "A-13",
        "A-14",
        "A-15",
        "A-16",
        "B-01",
        "B-02",
        "B-03",
        "B-04",
        "B-05",
        "B-06",
        "B-07",
        "B-08",
        "B-09",
        "B-10",
        "B-11",
        "B-12",
        "B-13",
        "B-14",
        "B-15",
        "B-16",
        "C-01",
        "C-02",
        "C-03",
        "C-04",
        "C-05",
        "C-06",
        "C-07",
        "C-08",
        "C-09",
        "C-10",
        "C-11",
        "C-12",
        "C-13",
        "C-14",
        "C-15",
        "C-16",
        "D-01",
        "D-02",
        "D-03",
        "D-04",
        "D-05",
        "D-06",
        "D-07",
        "D-08",
        "D-09",
        "D-10",
        "D-11",
        "D-12",
        "D-13",
        "D-14",
        "D-15",
        "D-16",
        "E-01",
        "E-02",
        "E-03",
        "E-04",
        "E-05",
        "E-06",
        "E-07",
        "E-08",
        "E-09",
        "E-10",
        "E-11",
        "E-12",
        "E-13",
        "E-14",
        "E-15",
        "E-16",
        "F-01",
        "F-02",
        "F-03",
        "F-04",
        "F-05",
        "F-06",
        "F-07",
        "F-08",
        "F-09",
        "F-10",
        "F-11",
        "F-12",
        "F-13",
        "F-14",
        "F-15",
        "F-16",
        "G-01",
        "G-02",
        "G-03",
        "G-04",
        "G-05",
        "G-06",
        "G-07",
        "G-08",
        "G-09",
        "G-10",
        "G-11",
        "G-12",
        "G-13",
        "G-14",
        "G-15",
        "G-16",
        "H-01",
        "H-02",
        "H-03",
        "H-04",
        "H-05",
        "H-06",
        "H-07",
        "H-08",
        "H-09",
        "H-10",
        "H-11",
        "H-12",
        "H-13",
        "H-14",
        "H-15",
        "H-16",
        "I-01",
        "I-02",
        "I-03",
        "I-04",
        "I-05",
        "I-06",
        "I-07",
        "I-08",
        "I-09",
        "I-10",
        "I-11",
        "I-12",
        "I-13",
        "I-14",
        "I-15",
        "I-16",
        "J-01",
        "J-02",
        "J-03",
        "J-04",
        "J-05",
        "J-06",
        "J-07",
        "J-08",
        "J-09",
        "J-10",
        "J-11",
        "J-12",
        "J-13",
        "J-14",
        "J-15",
        "J-16"
      ]
    }
  ],
  "defaultWeights": {
    "A": 1.2,
    "B": 1.1,
    "C": 1.2,
    "D": 0.9,
    "E": 1.3,
    "F": 1.3,
    "G": 1,
    "H": 0.9,
    "I": 1,
    "J": 0.8
  },
  "regionViews": [
    {
      "id": "UK",
      "label": "UK-wide",
      "profileRegions": [
        "UK"
      ],
      "note": "全国视角会同时显示英国主流政党、地方民族主义政党和北爱尔兰主要力量；不等于实际选区可投选项。"
    },
    {
      "id": "England",
      "label": "England",
      "profileRegions": [
        "England"
      ],
      "note": "英格兰视角更强调 Westminster、英格兰地方自治、Conservative/Labour/Reform/Lib Dem/Green 等竞争。"
    },
    {
      "id": "Scotland",
      "label": "Scotland",
      "profileRegions": [
        "Scotland"
      ],
      "note": "苏格兰视角会把 Union/Devolution 和亲欧议题权重解释为苏格兰独立、公投授权与 Westminster 关系。"
    },
    {
      "id": "Wales",
      "label": "Wales",
      "profileRegions": [
        "Wales"
      ],
      "note": "威尔士视角会突出 Welsh devolution、Plaid Cymru、公共服务与地方自治问题。"
    },
    {
      "id": "Northern Ireland",
      "label": "Northern Ireland",
      "profileRegions": [
        "Northern Ireland"
      ],
      "note": "北爱尔兰政治有 unionist/nationalist/non-aligned 结构，不能简单按英国左右翼解释。"
    }
  ],
  "coordinateViews": [
    {
      "id": "econ_culture",
      "label": "经济 × 文化",
      "xAxes": [
        "A",
        "B"
      ],
      "yAxes": [
        "C",
        "D",
        "I"
      ],
      "xLabel": "低税/市场化 ←→ 再分配/公共所有",
      "yLabel": "文化保守/强边境 ↓ / 文化自由/多元开放 ↑"
    },
    {
      "id": "brexit_union",
      "label": "Brexit × Union",
      "xAxes": [
        "E"
      ],
      "yAxes": [
        "F"
      ],
      "xLabel": "Hard Brexit/主权优先 ←→ 亲欧/单一市场",
      "yLabel": "强Union/Westminster ↓ / 去中心/自决 ↑"
    },
    {
      "id": "green_state",
      "label": "绿色 × 国家干预",
      "xAxes": [
        "A",
        "B"
      ],
      "yAxes": [
        "G"
      ],
      "xLabel": "市场财政纪律 ←→ 国家干预/公共所有",
      "yLabel": "成本油气优先 ↓ / 强绿色转型 ↑"
    },
    {
      "id": "reform_equality",
      "label": "制度 × 平等",
      "xAxes": [
        "H"
      ],
      "yAxes": [
        "I"
      ],
      "xLabel": "宪制现状 ←→ 制度改革",
      "yLabel": "anti-DEI/文化保守 ↓ / 平等多元 ↑"
    },
    {
      "id": "security_europe",
      "label": "安全 × 欧洲",
      "xAxes": [
        "E"
      ],
      "yAxes": [
        "J"
      ],
      "xLabel": "Hard Brexit ←→ 亲欧",
      "yLabel": "克制低军费 ↓ / NATO安全鹰派 ↑"
    }
  ],
  "matchViews": [
    {
      "id": "all",
      "label": "全部议题",
      "axes": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J"
      ]
    },
    {
      "id": "no_brexit_union",
      "label": "排除 Brexit/Union",
      "axes": [
        "A",
        "B",
        "C",
        "D",
        "G",
        "H",
        "I",
        "J"
      ]
    },
    {
      "id": "economy",
      "label": "只看经济公共服务",
      "axes": [
        "A",
        "B"
      ]
    },
    {
      "id": "culture",
      "label": "只看移民文化自由",
      "axes": [
        "C",
        "D",
        "I"
      ]
    },
    {
      "id": "constitutional",
      "label": "只看宪政与欧洲",
      "axes": [
        "E",
        "F",
        "H"
      ]
    },
    {
      "id": "green_security",
      "label": "只看气候与安全",
      "axes": [
        "G",
        "J"
      ]
    }
  ],
  "resultLabels": [
    {
      "id": "social_dem_european",
      "name": "社会民主亲欧改革派",
      "summary": "你重视公共服务、再分配和制度改革，同时倾向与欧洲保持更紧密关系。",
      "tags": [
        "社会民主",
        "亲欧",
        "制度改革"
      ],
      "rules": [
        {
          "axis": "A",
          "min": 58
        },
        {
          "axis": "B",
          "min": 55
        },
        {
          "axis": "E",
          "min": 58
        },
        {
          "axis": "H",
          "min": 55
        }
      ]
    },
    {
      "id": "liberal_localist",
      "name": "自由亲欧地方主义者",
      "summary": "你偏亲欧、社会自由和地方自治，通常更看重权利保障、比例代表制和去中心化。",
      "tags": [
        "自由主义",
        "亲欧",
        "地方自治"
      ],
      "rules": [
        {
          "axis": "C",
          "min": 68
        },
        {
          "axis": "D",
          "min": 62
        },
        {
          "axis": "E",
          "min": 70
        },
        {
          "axis": "F",
          "min": 58
        }
      ]
    },
    {
      "id": "green_socialist",
      "name": "绿色社会主义/生态左翼",
      "summary": "你把绿色转型、公共所有、再分配和平等议题放在核心位置。",
      "tags": [
        "绿色转型",
        "公共所有",
        "平等"
      ],
      "rules": [
        {
          "axis": "A",
          "min": 78
        },
        {
          "axis": "B",
          "min": 78
        },
        {
          "axis": "G",
          "min": 82
        },
        {
          "axis": "I",
          "min": 72
        }
      ]
    },
    {
      "id": "communitarian_labour",
      "name": "共同体工党/经济左文化保守",
      "summary": "你经济上偏公共服务和劳动保护，但在移民、身份或秩序议题上更强调共同体与社会凝聚。",
      "tags": [
        "经济左",
        "共同体",
        "秩序"
      ],
      "rules": [
        {
          "axis": "A",
          "min": 55
        },
        {
          "axis": "B",
          "min": 50
        },
        {
          "axis": "C",
          "max": 48
        },
        {
          "axis": "I",
          "max": 52
        }
      ]
    },
    {
      "id": "unionist_conservative",
      "name": "保守联合王国派",
      "summary": "你重视 Union、财政纪律、边境控制和国防安全，对激进宪改与去中心化较谨慎。",
      "tags": [
        "Union",
        "财政纪律",
        "安全"
      ],
      "rules": [
        {
          "axis": "A",
          "max": 45
        },
        {
          "axis": "F",
          "max": 30
        },
        {
          "axis": "J",
          "min": 68
        },
        {
          "axis": "C",
          "max": 45
        }
      ]
    },
    {
      "id": "national_brexit_right",
      "name": "民族保守脱欧派",
      "summary": "你高度强调主权、边境、文化保守和反建制政治，对亲欧和 net zero 路线较不信任。",
      "tags": [
        "脱欧",
        "边境",
        "民族保守"
      ],
      "rules": [
        {
          "axis": "E",
          "max": 25
        },
        {
          "axis": "C",
          "max": 28
        },
        {
          "axis": "I",
          "max": 30
        },
        {
          "axis": "G",
          "max": 35
        }
      ]
    },
    {
      "id": "self_determination_left",
      "name": "自治自决社会民主派",
      "summary": "你明显支持去中心化、民族自决或联邦化，同时经济和社会议题偏进步。",
      "tags": [
        "自决",
        "亲欧",
        "社会民主"
      ],
      "rules": [
        {
          "axis": "F",
          "min": 80
        },
        {
          "axis": "A",
          "min": 60
        },
        {
          "axis": "E",
          "min": 65
        }
      ]
    },
    {
      "id": "market_security_hawk",
      "name": "自由市场安全鹰派",
      "summary": "你经济上偏市场和财政纪律，但在外交防务上支持 NATO、核威慑和强安全政策。",
      "tags": [
        "市场",
        "国防",
        "NATO"
      ],
      "rules": [
        {
          "axis": "A",
          "max": 42
        },
        {
          "axis": "B",
          "max": 42
        },
        {
          "axis": "J",
          "min": 72
        }
      ]
    },
    {
      "id": "mixed",
      "name": "混合型英国选民",
      "summary": "你的回答跨越英国政治的多条裂缝，需要看维度拆解，而不是只看传统左右标签。",
      "tags": [
        "混合取向",
        "议题分裂",
        "维度拆解"
      ],
      "rules": []
    }
  ],
  "sources": [
    {
      "title": "英国政治光谱测试分享页规格草案",
      "url": "https://chatgpt.com/share/6a37e4f6-d564-83e8-9de1-05ef00a2e7ef",
      "note": "本页题库、维度和首版参照对象的用户提供规格来源。"
    },
    {
      "title": "House of Commons Library - General Election 2024 results",
      "url": "https://commonslibrary.parliament.uk/research-briefings/cbp-10009/",
      "note": "2024 英国大选结果与席票结构资料入口。"
    },
    {
      "title": "Chapel Hill Expert Survey (CHES)",
      "url": "https://www.chesdata.eu/",
      "note": "欧洲政党专家调查入口，可用于后续校准党派坐标。"
    },
    {
      "title": "Manifesto Project",
      "url": "https://manifesto-project.wzb.eu/",
      "note": "政党宣言编码数据库入口，可用于后续文本校准。"
    },
    {
      "title": "NatCen British Social Attitudes",
      "url": "https://natcen.ac.uk/british-social-attitudes",
      "note": "英国社会态度调查入口，用于理解 Brexit、移民、文化阵营等长期结构。"
    },
    {
      "title": "Labour Party Manifesto 2024",
      "url": "https://labour.org.uk/change/",
      "note": "Labour 2024 政纲入口。"
    },
    {
      "title": "Conservative Manifesto 2024",
      "url": "https://manifesto.conservatives.com/",
      "note": "Conservative 2024 政纲入口。"
    },
    {
      "title": "Reform UK Contract",
      "url": "https://www.reformparty.uk/contract",
      "note": "Reform UK 2024 contract 入口。"
    },
    {
      "title": "SNP Manifesto",
      "url": "https://www.snp.org/manifesto/",
      "note": "SNP 政纲入口。"
    }
  ],
  "methodNote": "党派/派系坐标为建站初始启发式估计，不代表官方立场，不构成投票建议。北爱尔兰政治有独立的 unionist/nationalist/non-aligned 结构，不能简单按英国左右翼解释。"
};
