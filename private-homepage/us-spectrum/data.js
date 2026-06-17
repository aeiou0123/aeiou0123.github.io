window.US_SPECTRUM_DATA = (() => {
  const axes = [
    { id: "ECO", short: "ECO", nameZh: "经济分配", nameEn: "Economic Distribution", negativeZh: "低税市场", positiveZh: "再分配劳动", negativeEn: "Low-tax markets", positiveEn: "Redistribution & labor", color: "#d64f45" },
    { id: "STATE", short: "STATE", nameZh: "国家能力", nameEn: "State Capacity", negativeZh: "小政府地方主义", positiveZh: "积极政府投资", negativeEn: "Small government", positiveEn: "Active public capacity", color: "#b87900" },
    { id: "LIB", short: "LIB", nameZh: "公民自由—秩序", nameEn: "Liberty vs Order", negativeZh: "治安秩序", positiveZh: "自由程序", negativeEn: "Order & enforcement", positiveEn: "Liberty & due process", color: "#1f7a8c" },
    { id: "CULT", short: "CULT", nameZh: "文化价值", nameEn: "Cultural Values", negativeZh: "宗教传统", positiveZh: "世俗多元", negativeEn: "Religious tradition", positiveEn: "Secular pluralism", color: "#a24da3" },
    { id: "IMM", short: "IMM", nameZh: "移民与国家身份", nameEn: "Immigration & Identity", negativeZh: "边境同化", positiveZh: "开放共生", negativeEn: "Border & assimilation", positiveEn: "Openness & pluralism", color: "#2487a6" },
    { id: "RACE", short: "RACE", nameZh: "种族与历史正义", nameEn: "Race & Historical Justice", negativeZh: "色盲个人主义", positiveZh: "结构性正义", negativeEn: "Colorblind individualism", positiveEn: "Structural justice", color: "#7a55b8" },
    { id: "DEMO", short: "DEMO", nameZh: "民主制度改革", nameEn: "Democratic Reform", negativeZh: "选举安全现制", positiveZh: "扩大参与改革", negativeEn: "Security & existing rules", positiveEn: "Access & reform", color: "#4157b7" },
    { id: "FP", short: "FP", nameZh: "外交国际主义", nameEn: "Foreign Policy Internationalism", negativeZh: "美国优先单边", positiveZh: "盟友多边", negativeEn: "America First", positiveEn: "Alliances & multilateralism", color: "#5c6f84" },
    { id: "MIL", short: "MIL", nameZh: "军事与干预", nameEn: "Military & Intervention", negativeZh: "克制反战", positiveZh: "强军威慑", negativeEn: "Restraint", positiveEn: "Strength & deterrence", color: "#304c89" },
    { id: "CLIM", short: "CLIM", nameZh: "气候能源技术", nameEn: "Climate, Energy & Technology", negativeZh: "化石能源独立", positiveZh: "减碳绿色投资", negativeEn: "Fossil energy independence", positiveEn: "Decarbonization", color: "#3f944c" },
  ];

  const scale = [
    { value: 1, zh: "完全不同意", en: "Completely disagree" },
    { value: 2, zh: "强烈不同意", en: "Strongly disagree" },
    { value: 3, zh: "不同意", en: "Disagree" },
    { value: 4, zh: "稍微不同意", en: "Slightly disagree" },
    { value: 5, zh: "中立 / 不确定", en: "Neutral / unsure" },
    { value: 6, zh: "稍微同意", en: "Slightly agree" },
    { value: 7, zh: "同意", en: "Agree" },
    { value: 8, zh: "强烈同意", en: "Strongly agree" },
    { value: 9, zh: "完全同意", en: "Completely agree" },
  ];

  const modes = {
    quick: { key: "quick", perAxis: 4, zh: "40 题快速版", en: "40-question quick mode", zhDesc: "每轴 4 题，先看大致政治坐标。", enDesc: "Four items per axis for a fast rough profile." },
    standard: { key: "standard", perAxis: 8, zh: "80 题标准版", en: "80-question standard mode", zhDesc: "每轴 8 题，覆盖主要子域。", enDesc: "Eight items per axis covering the main subdomains." },
    full: { key: "full", perAxis: 16, zh: "160 题深度版", en: "160-question full mode", zhDesc: "完整 10 轴题库，适合深度测试。", enDesc: "The complete ten-axis item bank for a deeper result." },
  };

  const q = {
    ECO: [
      { subZh: "税收与再分配", subEn: "Taxes and redistribution", items: [
        [-1, "降低联邦所得税比扩大新的社会项目更能改善经济活力。", "Lowering federal income taxes would improve economic vitality more than expanding new social programs."],
        [1, "高收入者应承担明显更高的联邦税率，以扩大公共服务。", "High-income earners should pay clearly higher federal tax rates to expand public services."],
        [-1, "财富主要应通过个人努力、创业和投资来改善，而不是靠政府再分配。", "Wealth should mainly be improved through work, entrepreneurship, and investment rather than government redistribution."],
        [1, "贫富差距过大会削弱民主和机会平等，政府应主动纠正。", "Excessive inequality weakens democracy and equal opportunity, so government should actively correct it."],
      ]},
      { subZh: "工会与劳动", subEn: "Labor and unions", items: [
        [1, "工会在平衡雇主与雇员权力方面仍然必要。", "Unions remain necessary for balancing employer and worker power."],
        [-1, "工会往往保护低效率岗位，并提高企业雇佣成本。", "Unions often protect inefficient jobs and raise the cost of hiring."],
        [1, "联邦政府应更强力保护集体谈判权和罢工权。", "The federal government should more strongly protect collective bargaining and the right to strike."],
        [-1, "工资最好由市场供需决定，而不是由政府或工会推动。", "Wages are best set by supply and demand rather than by government or union pressure."],
      ]},
      { subZh: "企业权力与反垄断", subEn: "Corporate power and antitrust", items: [
        [1, "大型科技公司和金融机构拥有过多政治影响力。", "Large technology firms and financial institutions have too much political influence."],
        [-1, "大型企业规模本身不是问题，只要消费者仍然受益。", "Large corporate scale is not a problem by itself as long as consumers benefit."],
        [1, "反垄断执法应更积极地拆分或限制过度集中的行业。", "Antitrust enforcement should more actively break up or constrain overly concentrated industries."],
        [-1, "政府过度限制企业会削弱美国创新和全球竞争力。", "Overly constraining business weakens American innovation and global competitiveness."],
      ]},
      { subZh: "福利与社会保障", subEn: "Welfare and social insurance", items: [
        [1, "政府应保证所有公民都能获得基本医疗服务。", "Government should guarantee that all citizens can access basic health care."],
        [-1, "福利项目应更严格地审查资格，避免长期依赖。", "Welfare programs should more strictly verify eligibility to avoid long-term dependency."],
        [1, "儿童、住房和食品援助应作为反贫困政策的核心工具。", "Child, housing, and food assistance should be core anti-poverty tools."],
        [-1, "私人慈善、地方社区和家庭比联邦福利更适合处理许多困难。", "Private charity, local communities, and families are better suited than federal welfare for many hardships."],
      ]},
    ],
    STATE: [
      { subZh: "联邦政府规模", subEn: "Federal government scale", items: [
        [1, "许多社会问题需要联邦政府直接介入，而不能只依赖州和地方。", "Many social problems require direct federal action rather than relying only on states and localities."],
        [-1, "州和地方政府比华盛顿更了解本地需要。", "States and local governments understand local needs better than Washington."],
        [1, "全国性问题需要全国性标准，例如医疗、教育和环境监管。", "National problems need national standards, including health care, education, and environmental regulation."],
        [-1, "联邦政府规模已经过大，应把更多权力交还给州。", "The federal government is already too large and should return more power to states."],
      ]},
      { subZh: "财政纪律", subEn: "Fiscal discipline", items: [
        [-1, "削减赤字应优先于扩大新的社会项目。", "Reducing deficits should take priority over expanding new social programs."],
        [1, "为了公共投资，短期扩大赤字是可以接受的。", "Short-term deficits are acceptable for public investment."],
        [-1, "联邦预算应设置更强的支出上限。", "The federal budget should have stronger spending caps."],
        [1, "只要投资能提高长期生产率，财政赤字本身不是最大问题。", "Deficits are not the biggest problem if spending raises long-run productivity."],
      ]},
      { subZh: "产业政策", subEn: "Industrial policy", items: [
        [1, "政府应主动扶持关键产业，而不是完全交给市场。", "Government should actively support key industries rather than leaving them entirely to the market."],
        [-1, "政府挑选赢家通常会造成浪费和政治寻租。", "Government picking winners usually creates waste and political rent-seeking."],
        [1, "半导体、清洁能源和关键药品供应链值得长期公共投资。", "Semiconductors, clean energy, and critical medicine supply chains deserve long-term public investment."],
        [-1, "自由竞争比产业补贴更能提升美国企业效率。", "Free competition improves American business efficiency more than industrial subsidies."],
      ]},
      { subZh: "公共服务", subEn: "Public services", items: [
        [1, "公共教育、医保和基建应被视为国家竞争力的一部分。", "Public education, health care, and infrastructure should be treated as part of national competitiveness."],
        [-1, "公共服务扩张往往伴随低效率和官僚主义。", "Expanding public services often brings inefficiency and bureaucracy."],
        [1, "联邦政府应更积极投资公共交通、宽带和电网。", "The federal government should invest more actively in transit, broadband, and the electric grid."],
        [-1, "许多公共服务最好由私人部门和地方机构竞争提供。", "Many public services are best provided through competition among private and local institutions."],
      ]},
    ],
    LIB: [
      { subZh: "警务与治安", subEn: "Policing and public safety", items: [
        [-1, "在犯罪率上升时，扩大警察权力是可以接受的。", "When crime rises, expanding police powers is acceptable."],
        [1, "警务改革应优先减少过度执法和不必要的武力使用。", "Police reform should prioritize reducing over-policing and unnecessary use of force."],
        [-1, "检察官和法官应对暴力犯罪采取更强硬态度。", "Prosecutors and judges should take a tougher approach to violent crime."],
        [1, "许多公共安全问题应由心理健康、住房和社区项目处理。", "Many public safety problems should be handled through mental health, housing, and community programs."],
      ]},
      { subZh: "隐私与监控", subEn: "Privacy and surveillance", items: [
        [1, "即使为了国家安全，政府也不应大规模收集公民数据。", "Even for national security, government should not collect citizens' data at mass scale."],
        [-1, "面对恐怖主义和网络威胁，政府需要更强的数据监控能力。", "Facing terrorism and cyber threats, government needs stronger data surveillance capacity."],
        [1, "执法部门使用面部识别应受到严格限制。", "Law enforcement use of facial recognition should be tightly limited."],
        [-1, "如果有助于阻止严重犯罪，技术监控可以适度扩大。", "Technology surveillance can be moderately expanded if it helps prevent serious crimes."],
      ]},
      { subZh: "言论自由", subEn: "Free expression", items: [
        [1, "大学和平台不应惩罚冒犯性但合法的政治表达。", "Universities and platforms should not punish offensive but lawful political expression."],
        [-1, "平台应更积极限制仇恨言论和危险错误信息。", "Platforms should more actively limit hate speech and dangerous misinformation."],
        [1, "政治表达受到冒犯不应成为限制言论的充分理由。", "Being offended by political expression is not enough reason to restrict speech."],
        [-1, "公共机构有责任维护不受歧视和骚扰的表达环境。", "Public institutions have a duty to maintain environments free of discrimination and harassment."],
      ]},
      { subZh: "枪支与自卫", subEn: "Guns and self-defense", items: [
        [-1, "合法持枪是公民自由的重要组成部分。", "Lawful gun ownership is an important part of civil liberty."],
        [1, "更严格的背景审查和枪支购买限制能减少公共风险。", "Stricter background checks and purchase limits can reduce public risk."],
        [-1, "持枪自卫权不应因少数人的犯罪而被广泛限制。", "The right to armed self-defense should not be broadly restricted because of a minority of criminals."],
        [1, "攻击性武器和高容量弹匣应受到更严格限制。", "Assault-style weapons and high-capacity magazines should face stricter limits."],
      ]},
    ],
    CULT: [
      { subZh: "宗教与公共生活", subEn: "Religion and public life", items: [
        [-1, "美国公共生活应更多体现基督教传统。", "American public life should more strongly reflect Christian traditions."],
        [1, "政府应保持严格世俗，避免偏向任何宗教。", "Government should remain strictly secular and avoid favoring any religion."],
        [-1, "宗教组织应在教育、慈善和公共讨论中拥有更大空间。", "Religious organizations should have more space in education, charity, and public debate."],
        [1, "公共政策不应以特定宗教教义作为主要理由。", "Public policy should not rely mainly on a particular religious doctrine."],
      ]},
      { subZh: "性别与 LGBTQ", subEn: "Gender and LGBTQ rights", items: [
        [1, "政府应保护跨性别者在教育、就业和医疗中的平等权利。", "Government should protect equal rights for transgender people in education, employment, and health care."],
        [-1, "性别政策应更多依据出生时生理性别，而不是性别认同。", "Gender policy should rely more on biological sex at birth than gender identity."],
        [1, "同性婚姻和 LGBTQ 反歧视保护应继续受到联邦保障。", "Same-sex marriage and LGBTQ anti-discrimination protections should remain federally protected."],
        [-1, "学校不应在家长不知情的情况下处理学生性别身份变化。", "Schools should not handle student gender identity changes without parental knowledge."],
      ]},
      { subZh: "堕胎与家庭", subEn: "Abortion and family", items: [
        [1, "堕胎权应主要由个人决定，而不是由州政府限制。", "Abortion decisions should primarily be made by individuals rather than restricted by state governments."],
        [-1, "胎儿生命保护应比个人选择拥有更高优先级。", "Protecting unborn life should have higher priority than individual choice."],
        [1, "联邦层面应保障基本生殖健康服务。", "Basic reproductive health services should be protected at the federal level."],
        [-1, "传统家庭结构对社会稳定仍然非常重要。", "Traditional family structure remains very important for social stability."],
      ]},
      { subZh: "教育与文化战争", subEn: "Education and culture war", items: [
        [-1, "学校应避免教授会让学生质疑传统家庭和性别观念的内容。", "Schools should avoid teaching content that encourages students to question traditional family and gender norms."],
        [1, "学校应让学生了解种族、性别和性取向多样性的现实。", "Schools should help students understand the reality of racial, gender, and sexual diversity."],
        [-1, "家长应对学校课程和图书拥有更强否决权。", "Parents should have stronger veto power over school curricula and library books."],
        [1, "教师应能在专业标准内讨论争议社会议题。", "Teachers should be able to discuss controversial social issues within professional standards."],
      ]},
    ],
    IMM: [
      { subZh: "边境安全", subEn: "Border security", items: [
        [-1, "严格控制南部边境应是联邦政府的最高优先事项之一。", "Strict control of the southern border should be one of the federal government's highest priorities."],
        [1, "边境政策应同时重视人道保护和合法程序。", "Border policy should also prioritize humanitarian protection and lawful procedure."],
        [-1, "无序越境会削弱法治和公众对移民制度的信任。", "Disorderly border crossings weaken rule of law and public trust in immigration."],
        [1, "单靠边境执法无法解决美国劳动力和庇护制度问题。", "Border enforcement alone cannot solve America's labor and asylum system problems."],
      ]},
      { subZh: "难民与庇护", subEn: "Refugees and asylum", items: [
        [1, "美国应继续接收因战争和迫害逃离本国的人。", "The United States should continue admitting people fleeing war and persecution."],
        [-1, "难民和庇护规模应明显收紧，直到审查系统更可靠。", "Refugee and asylum admissions should be tightened until screening systems are more reliable."],
        [1, "庇护申请人应有充分机会获得法律帮助和公平听证。", "Asylum seekers should have meaningful access to legal help and fair hearings."],
        [-1, "庇护制度被滥用时，快速遣返应更容易执行。", "When asylum rules are abused, expedited removal should be easier to carry out."],
      ]},
      { subZh: "无证移民处置", subEn: "Undocumented immigrants", items: [
        [1, "长期居住、工作且无严重犯罪记录的无证移民应获得合法化路径。", "Undocumented immigrants who have long lived and worked here without serious crimes should have a path to legal status."],
        [-1, "大规模遣返应成为恢复移民法执行力的一部分。", "Large-scale deportation should be part of restoring immigration law enforcement."],
        [1, "被带到美国长大的年轻无证移民应获得稳定身份。", "Young undocumented immigrants brought up in the U.S. should receive stable status."],
        [-1, "雇用无证劳工的企业和个人应受到更严厉处罚。", "Employers and individuals who hire undocumented labor should face tougher penalties."],
      ]},
      { subZh: "国家认同", subEn: "National identity", items: [
        [-1, "移民应优先同化进美国主流文化，而不是保持各自文化差异。", "Immigrants should prioritize assimilation into mainstream American culture over maintaining separate cultural differences."],
        [1, "多语言、多宗教和多族裔传统是美国身份的一部分。", "Multilingual, multi-faith, and multiethnic traditions are part of American identity."],
        [-1, "出生公民权应重新讨论，以减少移民制度漏洞。", "Birthright citizenship should be reconsidered to reduce loopholes in the immigration system."],
        [1, "美国身份应更多基于宪法原则和参与，而不是血统或文化同质性。", "American identity should be based more on constitutional principles and participation than ancestry or cultural homogeneity."],
      ]},
    ],
    RACE: [
      { subZh: "结构性不平等", subEn: "Structural inequality", items: [
        [1, "美国今天的种族差距仍然受到奴隶制和种族隔离历史的影响。", "Racial gaps in America today are still shaped by slavery and segregation."],
        [-1, "当今政策应主要把每个人视为个人，而不是种族群体成员。", "Policy today should mainly treat people as individuals rather than members of racial groups."],
        [1, "住房、教育和财富差距需要针对结构性不平等的政策。", "Housing, education, and wealth gaps require policies addressing structural inequality."],
        [-1, "持续强调历史压迫会削弱个人责任和共同身份。", "Continuously emphasizing historical oppression can weaken personal responsibility and common identity."],
      ]},
      { subZh: "DEI", subEn: "DEI", items: [
        [1, "大学和企业的 DEI 项目能帮助纠正长期排斥。", "DEI programs in universities and companies can help correct long-term exclusion."],
        [-1, "DEI 项目往往制造新的不公平和政治审查。", "DEI programs often create new unfairness and political policing."],
        [1, "招聘和录取应考虑不同群体曾经面对的机会差距。", "Hiring and admissions should consider opportunity gaps faced by different groups."],
        [-1, "种族或性别目标会损害择优原则。", "Race or gender targets undermine merit-based selection."],
      ]},
      { subZh: "投票权", subEn: "Voting rights", items: [
        [1, "投票权保护应优先于各州自行制定更严格投票规则。", "Voting rights protection should take priority over state discretion to set stricter rules."],
        [-1, "选民身份核验和选举安全规则有助于维护公众信任。", "Voter ID and election security rules help preserve public trust."],
        [1, "限制提前投票或邮寄投票会不成比例地影响某些群体。", "Restricting early or mail voting can disproportionately affect some groups."],
        [-1, "各州应保留广泛权力管理本州选举。", "States should retain broad authority to manage their own elections."],
      ]},
      { subZh: "刑事司法差异", subEn: "Criminal justice disparities", items: [
        [1, "刑事司法系统对不同种族群体的影响并不平等。", "The criminal justice system does not affect racial groups equally."],
        [-1, "犯罪率差异比制度歧视更能解释许多执法差异。", "Differences in crime rates explain many enforcement disparities more than institutional discrimination."],
        [1, "量刑、保释和警务制度需要更强的种族影响评估。", "Sentencing, bail, and policing systems need stronger racial impact review."],
        [-1, "改革刑事司法不应削弱对受害者和社区安全的保护。", "Criminal justice reform should not weaken protection for victims and community safety."],
      ]},
    ],
    DEMO: [
      { subZh: "投票可及性", subEn: "Voting access", items: [
        [1, "自动选民登记、提前投票和邮寄投票应更容易获得。", "Automatic voter registration, early voting, and mail voting should be easier to access."],
        [-1, "投票便利不能以降低身份核验和选举安全为代价。", "Voting convenience should not come at the cost of identity verification and election security."],
        [1, "选举日应成为联邦假日，以提高参与。", "Election Day should be a federal holiday to increase participation."],
        [-1, "投票规则频繁改变会让公众更不信任选举。", "Frequent changes to voting rules make the public trust elections less."],
      ]},
      { subZh: "选区与制度", subEn: "Districts and electoral systems", items: [
        [1, "应由独立委员会划分选区，减少党派操控。", "Independent commissions should draw districts to reduce partisan manipulation."],
        [-1, "选区划分是州政治过程的一部分，不应过度联邦化。", "Districting is part of state politics and should not be over-federalized."],
        [1, "排序选择投票或多席位选区值得试验。", "Ranked-choice voting or multi-member districts are worth experimenting with."],
        [-1, "传统单一选区制度更简单、更容易让选民理解。", "Traditional single-member districts are simpler and easier for voters to understand."],
      ]},
      { subZh: "金钱政治", subEn: "Money in politics", items: [
        [1, "竞选财务和超级 PAC 应受到更严格限制。", "Campaign finance and Super PACs should face stricter limits."],
        [-1, "政治捐款属于政治表达，不应被过度限制。", "Political donations are a form of political expression and should not be overly restricted."],
        [1, "小额公共配资能降低候选人对大金主的依赖。", "Small-donor public financing can reduce candidates' dependence on major donors."],
        [-1, "限制捐款不一定能减少利益集团影响，只会让规则更复杂。", "Donation limits do not necessarily reduce interest-group influence and may just make rules more complex."],
      ]},
      { subZh: "最高法院与机构", subEn: "Supreme Court and institutions", items: [
        [1, "最高法院任期限制值得认真讨论。", "Term limits for Supreme Court justices deserve serious discussion."],
        [-1, "改变最高法院结构会进一步政治化司法。", "Changing the structure of the Supreme Court would further politicize the judiciary."],
        [1, "参议院、选举人团等制度应改革，以更接近一人一票原则。", "Institutions such as the Senate and Electoral College should be reformed toward one-person-one-vote principles."],
        [-1, "美国制度中的制衡和州权设计应谨慎保留。", "Checks, balances, and federalism in the American system should be carefully preserved."],
      ]},
    ],
    FP: [
      { subZh: "盟友体系", subEn: "Alliances", items: [
        [1, "NATO 和亚洲盟友体系是美国安全的重要资产。", "NATO and Asian alliance networks are important assets for American security."],
        [-1, "美国盟友应承担更多成本，美国不应替他们负责。", "U.S. allies should bear more costs, and America should not be responsible for them."],
        [1, "美国应继续通过盟友体系维护国际秩序。", "The U.S. should continue maintaining international order through alliances."],
        [-1, "美国外交应首先减少海外承诺，把资源留在国内。", "U.S. foreign policy should first reduce overseas commitments and keep resources at home."],
      ]},
      { subZh: "多边主义", subEn: "Multilateralism", items: [
        [1, "联合国、WTO 和国际协议仍然有助于美国利益。", "The UN, WTO, and international agreements still serve American interests."],
        [-1, "国际机构经常限制美国主权。", "International institutions often constrain American sovereignty."],
        [1, "气候、公共卫生和金融稳定需要多边合作。", "Climate, public health, and financial stability require multilateral cooperation."],
        [-1, "美国应避免把外交政策交给国际官僚和多边程序。", "The U.S. should avoid handing foreign policy to international bureaucracies and multilateral procedures."],
      ]},
      { subZh: "贸易与全球化", subEn: "Trade and globalization", items: [
        [1, "开放贸易和全球供应链整体上有利于美国繁荣。", "Open trade and global supply chains are generally beneficial for American prosperity."],
        [-1, "关税和产业保护可以保护美国工人和制造业。", "Tariffs and industrial protection can defend American workers and manufacturing."],
        [1, "贸易政策应同时保护劳工和环境标准，而不是单纯退出全球市场。", "Trade policy should protect labor and environmental standards rather than simply retreat from global markets."],
        [-1, "美国应减少对外国供应链的依赖，即使成本上升。", "The U.S. should reduce reliance on foreign supply chains even if costs rise."],
      ]},
      { subZh: "人权外交与对华政策", subEn: "Human rights and China policy", items: [
        [1, "美国外交应把民主、人权和法治作为重要目标。", "American foreign policy should treat democracy, human rights, and rule of law as important goals."],
        [-1, "外交应更现实主义，避免用价值观干预其他国家。", "Foreign policy should be more realist and avoid intervening in other countries over values."],
        [1, "面对中国，美国应联合盟友制定长期规则和技术标准。", "Facing China, the U.S. should coordinate long-term rules and technology standards with allies."],
        [-1, "美国不应让对华竞争变成无止境的全球对抗。", "The U.S. should not let competition with China become endless global confrontation."],
      ]},
    ],
    MIL: [
      { subZh: "国防预算", subEn: "Defense budget", items: [
        [1, "美国应维持明显领先的军事能力，以威慑对手。", "The U.S. should maintain clearly superior military capabilities to deter adversaries."],
        [-1, "国防预算过高，挤压了国内公共投资。", "The defense budget is too high and crowds out domestic public investment."],
        [1, "海军、空军、网络和太空能力需要持续投入。", "Naval, air, cyber, and space capabilities need sustained investment."],
        [-1, "削减海外军事承诺可以降低国防开支。", "Reducing overseas military commitments can lower defense spending."],
      ]},
      { subZh: "海外基地与部署", subEn: "Overseas bases and deployments", items: [
        [1, "海外基地有助于快速应对危机并保护盟友。", "Overseas bases help respond quickly to crises and protect allies."],
        [-1, "美国海外基地太多，容易卷入不必要冲突。", "The U.S. has too many overseas bases and can be pulled into unnecessary conflicts."],
        [1, "在欧洲和印太保持前沿部署是必要的。", "Forward deployments in Europe and the Indo-Pacific are necessary."],
        [-1, "美国应让地区国家承担更多本地防务责任。", "The U.S. should make regional countries assume more local defense responsibility."],
      ]},
      { subZh: "军事干预", subEn: "Military intervention", items: [
        [1, "在防止大规模暴行时，军事干预有时是必要的。", "Military intervention is sometimes necessary to prevent mass atrocities."],
        [-1, "过去几十年的军事干预显示，美国应更克制。", "Recent decades of intervention show that the U.S. should be more restrained."],
        [1, "如果美国不展示武力意愿，对手会更敢冒险。", "If the U.S. does not show willingness to use force, adversaries will take more risks."],
        [-1, "军事行动常常产生意外后果，外交和制裁应优先。", "Military action often produces unintended consequences; diplomacy and sanctions should come first."],
      ]},
      { subZh: "乌克兰、中东、台海", subEn: "Ukraine, Middle East, Taiwan Strait", items: [
        [1, "继续支持乌克兰符合美国和盟友的长期安全利益。", "Continued support for Ukraine serves long-term U.S. and allied security interests."],
        [-1, "美国应避免在乌克兰投入没有明确终点的资源。", "The U.S. should avoid committing resources to Ukraine without a clear end point."],
        [1, "维护台湾海峡和平稳定需要可信军事威慑。", "Maintaining peace in the Taiwan Strait requires credible military deterrence."],
        [-1, "美国在中东和台海都应避免自动卷入战争。", "The U.S. should avoid automatically being drawn into wars in the Middle East or Taiwan Strait."],
      ]},
    ],
    CLIM: [
      { subZh: "化石能源", subEn: "Fossil energy", items: [
        [-1, "扩大石油和天然气生产有助于能源独立和降低价格。", "Expanding oil and gas production helps energy independence and lowers prices."],
        [1, "美国应更快减少对化石燃料的依赖。", "The U.S. should reduce dependence on fossil fuels faster."],
        [-1, "能源价格和可靠性应优先于快速气候监管。", "Energy prices and reliability should take priority over rapid climate regulation."],
        [1, "化石能源产业应为污染和气候风险承担更多成本。", "The fossil fuel industry should bear more costs for pollution and climate risk."],
      ]},
      { subZh: "绿色投资", subEn: "Green investment", items: [
        [1, "联邦政府应大规模投资可再生能源、电网和储能。", "The federal government should invest heavily in renewables, the grid, and storage."],
        [-1, "绿色补贴往往让政府偏袒特定企业和技术。", "Green subsidies often make government favor particular firms and technologies."],
        [1, "清洁能源转型可以创造新的制造业和就业。", "The clean energy transition can create new manufacturing and jobs."],
        [-1, "能源转型应更多依靠市场需求，而不是联邦补贴。", "Energy transition should rely more on market demand than federal subsidies."],
      ]},
      { subZh: "监管与碳定价", subEn: "Regulation and carbon pricing", items: [
        [1, "碳税或排放交易能让污染成本更真实地反映在价格中。", "A carbon tax or emissions trading can make pollution costs more accurately reflected in prices."],
        [-1, "碳税会伤害普通家庭和能源密集型产业。", "Carbon taxes hurt ordinary households and energy-intensive industries."],
        [1, "汽车、建筑和电力行业应面对更严格的排放标准。", "Autos, buildings, and power should face stricter emissions standards."],
        [-1, "环保监管不应牺牲美国制造业和地方社区。", "Environmental regulation should not sacrifice American manufacturing and local communities."],
      ]},
      { subZh: "核能与技术", subEn: "Nuclear and technology", items: [
        [1, "核能应成为美国减碳战略的重要组成部分。", "Nuclear power should be an important part of America's decarbonization strategy."],
        [-1, "核能风险和废料问题使其不应成为气候政策核心。", "Nuclear risks and waste mean it should not be central to climate policy."],
        [1, "政府应支持碳捕集、先进核能和工业减排技术。", "Government should support carbon capture, advanced nuclear, and industrial decarbonization technologies."],
        [-1, "技术乐观不能替代减少排放和改变能源消费。", "Technological optimism cannot replace reducing emissions and changing energy consumption."],
      ]},
    ],
  };

  const questions = axes.flatMap((axis) => {
    let count = 0;
    return q[axis.id].flatMap((group) =>
      group.items.map(([direction, textZh, textEn]) => {
        count += 1;
        return {
          id: `${axis.id}${String(count).padStart(2, "0")}`,
          axis: axis.id,
          subdomainZh: group.subZh,
          subdomainEn: group.subEn,
          direction,
          textZh,
          textEn,
        };
      })
    );
  });

  const entities = [
    { id: "dem", category: "party", name: "Democratic Party", zh: "民主党", noteZh: "中左自由派联盟，强调公共投资、社会权利、气候和盟友体系。", noteEn: "A center-left liberal coalition focused on public investment, civil rights, climate, and alliances.", scores: { ECO: 50, STATE: 58, LIB: 42, CULT: 72, IMM: 55, RACE: 64, DEMO: 62, FP: 58, MIL: 18, CLIM: 72 } },
    { id: "gop", category: "party", name: "Republican Party / MAGA", zh: "共和党 / MAGA", noteZh: "民族保守、右派民粹、减税监管放松与强边境的混合体。", noteEn: "A mix of national conservatism, right-populism, tax and regulatory cuts, and hard-border politics.", scores: { ECO: -24, STATE: -46, LIB: -42, CULT: -74, IMM: -82, RACE: -68, DEMO: -36, FP: -42, MIL: 54, CLIM: -76 } },
    { id: "libertarian", category: "party", name: "Libertarian Party", zh: "自由意志党", noteZh: "市场自由、个人自由、低税小政府和反干预倾向。", noteEn: "Free markets, individual liberty, low taxes, small government, and anti-intervention instincts.", scores: { ECO: -84, STATE: -86, LIB: 74, CULT: 30, IMM: 30, RACE: -22, DEMO: 8, FP: -26, MIL: -52, CLIM: -52 } },
    { id: "green", category: "party", name: "Green Party", zh: "绿党", noteZh: "生态左翼、社会正义、民主改革、移民权利和反战。", noteEn: "Eco-left, social justice, democratic reform, immigrant rights, and antiwar politics.", scores: { ECO: 82, STATE: 68, LIB: 62, CULT: 82, IMM: 78, RACE: 84, DEMO: 82, FP: 46, MIL: -78, CLIM: 94 } },
    { id: "dsa", category: "movement", name: "DSA-aligned Left", zh: "DSA 倾向左翼", noteZh: "民主社会主义、劳工、反企业权力、医保和住房公共化。", noteEn: "Democratic socialist, labor-centered, anti-corporate power, public health care and housing.", scores: { ECO: 92, STATE: 78, LIB: 58, CULT: 80, IMM: 64, RACE: 86, DEMO: 70, FP: 12, MIL: -82, CLIM: 86 } },
    { id: "nolabels", category: "movement", name: "No Labels / Centrist Reform", zh: "No Labels / 中间改革", noteZh: "中间派、反两极化、问题解决导向。", noteEn: "Centrist, anti-polarization, problem-solving oriented.", scores: { ECO: 4, STATE: 8, LIB: 4, CULT: 0, IMM: 0, RACE: 0, DEMO: 18, FP: 18, MIL: 18, CLIM: 8 } },
    { id: "solidarity", category: "party", name: "American Solidarity Party", zh: "美国团结党", noteZh: "基督教民主，共同善路线；经济亲社会保障，文化较保守。", noteEn: "Christian democratic and common-good oriented; pro-social-insurance economics and culturally conservative.", scores: { ECO: 44, STATE: 34, LIB: -8, CULT: -48, IMM: 20, RACE: 18, DEMO: 8, FP: 4, MIL: -10, CLIM: 38 } },
    { id: "cpc", category: "caucus", name: "Congressional Progressive Caucus", zh: "国会进步党团", noteZh: "民主党左翼：劳工、控企业权力、生殖权利、气候和移民程序。", noteEn: "Democratic left: labor, corporate power, reproductive rights, climate, and immigration due process.", scores: { ECO: 82, STATE: 74, LIB: 58, CULT: 84, IMM: 72, RACE: 84, DEMO: 76, FP: 38, MIL: -36, CLIM: 88 } },
    { id: "newdem", category: "caucus", name: "New Democrat Coalition", zh: "新民主党联盟", noteZh: "中间—中左：亲增长、财政责任、创新、住房、医保和儿童照护。", noteEn: "Center-left: pro-growth, fiscally attentive, innovation, housing, health care, and child care.", scores: { ECO: 34, STATE: 44, LIB: 40, CULT: 62, IMM: 48, RACE: 48, DEMO: 48, FP: 62, MIL: 26, CLIM: 58 } },
    { id: "bluedog", category: "caucus", name: "Blue Dog Coalition", zh: "蓝狗联盟", noteZh: "民主党温和派：财政责任、国家安全、跨党合作。", noteEn: "Moderate Democrats focused on fiscal responsibility, national security, and bipartisanship.", scores: { ECO: 12, STATE: 12, LIB: 18, CULT: 32, IMM: 20, RACE: 22, DEMO: 22, FP: 46, MIL: 42, CLIM: 26 } },
    { id: "rsc", category: "caucus", name: "Republican Study Committee", zh: "共和党研究委员会", noteZh: "保守派主流：小政府、强国防、传统价值和平衡预算。", noteEn: "Mainstream conservative: limited government, strong defense, traditional values, and balanced budgets.", scores: { ECO: -48, STATE: -68, LIB: -48, CULT: -72, IMM: -66, RACE: -60, DEMO: -30, FP: -24, MIL: 68, CLIM: -66 } },
    { id: "mainstreet", category: "caucus", name: "Main Street / Republican Governance Group", zh: "Main Street / 共和党治理派", noteZh: "务实共和党：商业、能源、国家安全、基础设施和摇摆区治理。", noteEn: "Pragmatic Republicans: business, energy, national security, infrastructure, and swing-district governance.", scores: { ECO: -32, STATE: -32, LIB: -26, CULT: -42, IMM: -42, RACE: -36, DEMO: -16, FP: 10, MIL: 58, CLIM: -28 } },
    { id: "freedom", category: "caucus", name: "Freedom Caucus / MAGA Hard Right", zh: "自由党团 / MAGA 强硬右翼", noteZh: "反建制、强边境、强文化保守、削减政府和党内施压。", noteEn: "Anti-establishment, hard border, strongly culturally conservative, spending cuts, pressure on GOP leadership.", scores: { ECO: -56, STATE: -84, LIB: -62, CULT: -88, IMM: -94, RACE: -82, DEMO: -48, FP: -72, MIL: 38, CLIM: -86 } },
    { id: "pew_order_left", category: "pew", name: "Order and Opportunity Left", zh: "秩序与机会左翼", noteZh: "Pew 类型：经济公平与社会秩序并重。", noteEn: "Pew type: values economic fairness and social order.", scores: { ECO: 42, STATE: 36, LIB: -10, CULT: 30, IMM: 16, RACE: 44, DEMO: 26, FP: 14, MIL: 8, CLIM: 36 } },
    { id: "pew_left_out", category: "pew", name: "Left-Out Left", zh: "被落下的左翼", noteZh: "Pew 类型：经济压力强、对制度和党派都不完全信任。", noteEn: "Pew type: economically stressed and skeptical of institutions and parties.", scores: { ECO: 58, STATE: 28, LIB: 16, CULT: 34, IMM: 20, RACE: 48, DEMO: 28, FP: -12, MIL: -24, CLIM: 42 } },
    { id: "pew_unconventional_right", category: "pew", name: "Unconventional Right", zh: "非典型右翼", noteZh: "Pew 类型：右倾但不完全文化保守，反建制色彩较强。", noteEn: "Pew type: right-leaning but not uniformly culturally conservative, with anti-establishment instincts.", scores: { ECO: -38, STATE: -42, LIB: 10, CULT: -22, IMM: -54, RACE: -44, DEMO: -24, FP: -48, MIL: -6, CLIM: -48 } },
    { id: "pew_faith_first", category: "pew", name: "Faith First Conservatives", zh: "信仰优先保守派", noteZh: "Pew 类型：宗教与传统价值最突出。", noteEn: "Pew type: religion and traditional values are especially prominent.", scores: { ECO: -16, STATE: -22, LIB: -34, CULT: -86, IMM: -42, RACE: -34, DEMO: -10, FP: -10, MIL: 34, CLIM: -38 } },
    { id: "pew_loyal_liberals", category: "pew", name: "Loyal Liberals", zh: "忠诚自由派", noteZh: "Pew 类型：稳定民主党自由派联盟。", noteEn: "Pew type: stable Democratic liberal coalition.", scores: { ECO: 56, STATE: 62, LIB: 50, CULT: 78, IMM: 62, RACE: 72, DEMO: 66, FP: 62, MIL: 20, CLIM: 78 } },
    { id: "pew_polite_right", category: "pew", name: "Pragmatic and Polite Right", zh: "务实礼貌右翼", noteZh: "Pew 类型：右倾、务实、对政治冲突较克制。", noteEn: "Pew type: right-leaning, pragmatic, and less conflict-oriented.", scores: { ECO: -24, STATE: -28, LIB: -16, CULT: -38, IMM: -36, RACE: -28, DEMO: -8, FP: 8, MIL: 42, CLIM: -24 } },
    { id: "pew_middle", category: "pew", name: "Tuned-Out Middle", zh: "政治冷感中间", noteZh: "Pew 类型：政治参与低、许多议题中间或不稳定。", noteEn: "Pew type: lower political engagement, often middle or unstable across issues.", scores: { ECO: 0, STATE: 0, LIB: 0, CULT: 0, IMM: 0, RACE: 0, DEMO: 0, FP: 0, MIL: 0, CLIM: 0 } },
    { id: "pew_no_apologies", category: "pew", name: "No Apologies Right", zh: "不道歉右翼", noteZh: "Pew 类型：强硬保守、强烈党派身份和文化冲突取向。", noteEn: "Pew type: hard conservative, strong partisan identity and culture-war orientation.", scores: { ECO: -46, STATE: -66, LIB: -64, CULT: -92, IMM: -88, RACE: -86, DEMO: -46, FP: -46, MIL: 62, CLIM: -82 } },
    { id: "pew_progressives", category: "pew", name: "Leftward Progressives", zh: "左翼进步派", noteZh: "Pew 类型：最进步、最制度改革与社会正义取向。", noteEn: "Pew type: most progressive, institution-reform and social-justice oriented.", scores: { ECO: 88, STATE: 76, LIB: 70, CULT: 92, IMM: 84, RACE: 94, DEMO: 90, FP: 56, MIL: -56, CLIM: 94 } },
  ];

  const sources = [
    { title: "Pew Research Center 2026 Political Typology", url: "https://www.pewresearch.org/politics/2026/06/10/beyond-red-vs-blue-the-political-typology/" },
    { title: "2024 Democratic Party Platform", url: "https://www.presidency.ucsb.edu/documents/2024-democratic-party-platform" },
    { title: "2024 Republican Party Platform", url: "https://www.presidency.ucsb.edu/documents/2024-republican-party-platform" },
    { title: "Libertarian Party Platform", url: "https://www.lp.org/platform/" },
    { title: "Green Party Platform", url: "https://www.gp.org/platform" },
    { title: "New Democrat Coalition Policy Frameworks", url: "https://newdemocratcoalition.house.gov/policy-frameworks" },
    { title: "Blue Dog Coalition", url: "https://www.dems.gov/coalitions-caucuses-task-forces/blue-dog-coalition" },
    { title: "Republican Study Committee", url: "https://rsc-pfluger.house.gov/about" },
    { title: "Republican Main Street Caucus", url: "https://mainstreetcaucus.house.gov/" },
  ];

  return { axes, scale, modes, questions, entities, sources };
})();
