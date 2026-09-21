---
layout: archive
title: "Curriculum Vitae"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
  - /resume/
  - /cv.html
---

{% include base_path %}

<style>
  /* Scoped CV Styling - Academic Minimalist (Oxford Navy) */
  .cv-wrapper {
    margin-top: 0.5rem;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #2d3748;
  }

  /* Toolbar: Downloads & Language Switcher */
  .cv-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.85rem 1.1rem;
    margin-bottom: 1.8rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  .cv-downloads {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }

  .cv-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.42rem 0.85rem;
    font-size: 0.86rem;
    font-weight: 600;
    border-radius: 6px;
    text-decoration: none !important;
    transition: all 0.15s ease-in-out;
    cursor: pointer;
    line-height: 1.2;
  }

  .cv-btn-primary {
    background-color: #0e3a5d;
    color: #ffffff !important;
    border: 1px solid #0e3a5d;
  }
  .cv-btn-primary:hover {
    background-color: #174b75;
    border-color: #174b75;
    color: #ffffff !important;
  }

  .cv-btn-outline {
    background-color: #ffffff;
    color: #0e3a5d !important;
    border: 1px solid #cbd5e1;
  }
  .cv-btn-outline:hover {
    background-color: #f1f5f9;
    border-color: #94a3b8;
    color: #0a2942 !important;
  }

  /* Segmented Language Switcher */
  .cv-lang-switch {
    display: inline-flex;
    padding: 3px;
    background: #e2e8f0;
    border-radius: 8px;
  }

  .cv-lang-btn {
    border: none;
    background: transparent;
    padding: 0.38rem 0.95rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: #475569;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .cv-lang-btn.active {
    background: #0e3a5d;
    color: #ffffff;
    box-shadow: 0 1px 3px rgba(14, 58, 93, 0.3);
  }

  /* Section Styling */
  .cv-section {
    margin-bottom: 2.2rem;
  }

  .cv-section-title {
    color: #0e3a5d;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0 0 0.9rem 0;
    padding-bottom: 0.35rem;
    border-bottom: 1.75px solid #0e3a5d;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* Timeline & Entry Styling */
  .cv-entry {
    margin-bottom: 1.25rem;
    padding-bottom: 0.35rem;
  }

  .cv-entry:last-child {
    margin-bottom: 0;
  }

  .cv-entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .cv-entry-title {
    font-size: 1.02rem;
    font-weight: 700;
    color: #1a202c;
    margin: 0;
  }

  .cv-badge-date {
    font-size: 0.82rem;
    font-weight: 600;
    color: #475569;
    background: #f1f5f9;
    padding: 0.15rem 0.55rem;
    border-radius: 4px;
    white-space: nowrap;
    border: 1px solid #e2e8f0;
  }

  .cv-entry-sub {
    font-size: 0.90rem;
    color: #475569;
    font-style: italic;
    margin: 0.15rem 0 0.4rem 0;
  }

  .cv-entry-meta {
    font-size: 0.88rem;
    color: #334155;
    margin-bottom: 0.35rem;
  }

  /* Bullets */
  .cv-list {
    margin: 0.3rem 0 0 1.2rem;
    padding: 0;
  }

  .cv-list li {
    margin-bottom: 0.35rem;
    color: #334155;
    font-size: 0.92rem;
    line-height: 1.55;
  }

  .cv-list li:last-child {
    margin-bottom: 0;
  }

  /* Simple Rows (Honors / Skills) */
  .cv-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0.35rem 0;
    border-bottom: 1px dashed #e2e8f0;
    font-size: 0.92rem;
  }

  .cv-row:last-child {
    border-bottom: none;
  }

  .cv-highlight {
    font-weight: 700;
    color: #0e3a5d;
  }

  /* Course group */
  .cv-course-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 0.75rem 0.9rem;
    margin-bottom: 0.6rem;
  }

  .cv-course-label {
    font-weight: 700;
    color: #0e3a5d;
    margin-bottom: 0.25rem;
    font-size: 0.90rem;
  }

  .cv-course-content {
    font-size: 0.89rem;
    color: #334155;
    line-height: 1.5;
  }

  @media (max-width: 640px) {
    .cv-toolbar {
      flex-direction: column;
      align-items: stretch;
    }
    .cv-downloads {
      flex-direction: column;
    }
    .cv-btn {
      justify-content: center;
    }
    .cv-lang-switch {
      justify-content: center;
    }
  }
</style>

<div class="cv-wrapper">

  <!-- Action Bar: Download PDFs & Bilingual Switcher -->
  <div class="cv-toolbar">
    <div class="cv-downloads">
      <a href="{{ base_path }}/files/CV-Simplified_Chinese.pdf" class="cv-btn cv-btn-primary" target="_blank" rel="noopener">
        <i class="fas fa-file-pdf"></i> 下载中文版简历 (PDF)
      </a>
      <a href="{{ base_path }}/files/CV.pdf" class="cv-btn cv-btn-outline" target="_blank" rel="noopener">
        <i class="fas fa-file-pdf"></i> Download English CV (PDF)
      </a>
    </div>

    <div class="cv-lang-switch" role="group" aria-label="Language Selector">
      <button type="button" id="btn-lang-zh" class="cv-lang-btn active" onclick="switchCvLang('zh')">
        🇨🇳 中文版
      </button>
      <button type="button" id="btn-lang-en" class="cv-lang-btn" onclick="switchCvLang('en')">
        🇬🇧 English
      </button>
    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- CHINESE VERSION -->
  <!-- ===================================================================== -->
  <div id="cv-content-zh" class="cv-lang-content">

    <!-- 教育背景 -->
    <section class="cv-section">
      <h2 class="cv-section-title"><i class="fas fa-graduation-cap"></i> 教育背景</h2>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">西安交通大学 · 金禾经济研究中心</h3>
          <span class="cv-badge-date">2025.09 – 至今</span>
        </div>
        <div class="cv-entry-sub">本科三年级 · 数量经济与金融（预计 2028 年 6 月毕业）</div>
        <div class="cv-entry-meta">
          大二学年均分：<span class="cv-highlight">90.73</span> &nbsp;&nbsp;&nbsp;&nbsp; 专业排名：<span class="cv-highlight">1 / 22</span>
        </div>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">西安交通大学 · 数学与统计学院</h3>
          <span class="cv-badge-date">2024.09 – 2025.07</span>
        </div>
        <div class="cv-entry-sub">本科一年级 · 数学类</div>
        <div class="cv-entry-meta">
          大一学年均分：<span class="cv-highlight">87.81</span> &nbsp;&nbsp;&nbsp;&nbsp; 专业排名：<span class="cv-highlight">3 / 109</span>
        </div>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">西安交通大学 · 钱学森学院</h3>
          <span class="cv-badge-date">2022.09 – 2024.07</span>
        </div>
        <div class="cv-entry-sub">预科 · 少年班</div>
        <div class="cv-entry-meta">
          预科阶段均分：<span class="cv-highlight">87.92</span> &nbsp;&nbsp;&nbsp;&nbsp; 综合排名：<span class="cv-highlight">54 / 193</span>
        </div>
      </div>
    </section>

    <!-- 研究领域 -->
    <section class="cv-section">
      <h2 class="cv-section-title"><i class="fas fa-compass"></i> 研究领域</h2>
      <ul class="cv-list">
        <li><strong>AI 暴露度与市场结构</strong>：AI 暴露度测度、AI 对微观企业决策与产业市场结构的影响</li>
        <li><strong>产业组织</strong>：产业组织理论（IO）与实证产业组织（Empirical IO）</li>
        <li><strong>宏观经济与宏观金融</strong>：宏观经济传导机制、货币与周期模型</li>
      </ul>
    </section>

    <!-- 工作论文与科研经历 -->
    <section class="cv-section">
      <h2 class="cv-section-title"><i class="fas fa-book-open"></i> 工作论文与科研经历</h2>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">大语言模型冲击下高校本科专业结构的适应性调整——理论建模、LLM 暴露度测度与连续双重差分实证</h3>
          <span class="cv-badge-date">2026.02 – 至今</span>
        </div>
        <div class="cv-entry-sub">科研训练（合作指导：陈晓东、杨晓亮老师） · 项目负责人</div>
        <ul class="cv-list">
          <li>将 Acemoglu & Restrepo (2018) 任务模型拓展至高教供给侧，构建 101 职业 → 889 本科专业 Crosswalk 映射。</li>
          <li>整合 2015–2024 全国专业备案与 27 省 434 万条招生微观面板，运用连续 DID、因果森林及去趋势稳健性检验。</li>
        </ul>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">Token 与 AI Agent 冲击下的企业决策与市场结构：成本重组、竞争传导与福利分析</h3>
          <span class="cv-badge-date">2026</span>
        </div>
        <div class="cv-entry-sub">独立研究 / 课程论文 · 工作论文</div>
        <ul class="cv-list">
          <li>将 Token 与 AI Agent 抽象为企业可按需调用的异质性生产要素，重构企业微观边际与固定成本函数。</li>
          <li>在 Cournot、Bertrand 寡头博弈、进入退出摩擦与搜索摩擦下，分析市场集中度、竞争格局与消费者福利动态。</li>
        </ul>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">Claim2Value：具身智能产业链技术声明核验与动态估值智能体</h3>
          <span class="cv-badge-date">2026.08 – 2026.09</span>
        </div>
        <div class="cv-entry-sub">北大金融 AI 智能体大赛 · 经济金融推理负责人 / 核心开发</div>
        <ul class="cv-list">
          <li>覆盖 11 家具身智能核心上市公司，构建从技术 Claim 提取、多源证据链核验到财务映射的端到端 Agent 流水线。</li>
          <li>建立 51 条基准 Claim Bank，拆解“技术指标 → 生产率 → 成本/定价 → 毛利”因果链，搭建三情景动态估值模型。</li>
        </ul>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">35+ 求职者歧视感知、心理应对与政策诉求调查研究</h3>
          <span class="cv-badge-date">2025.12 – 2026.04</span>
        </div>
        <div class="cv-entry-sub">“挑战杯”全国大学生课外学术科技作品竞赛 · 核心成员</div>
        <ul class="cv-list">
          <li>负责微观问卷数据清洗，运用主成分分析（PCA）提取应对特征，使用分位数回归检验歧视感知的非对称效应。</li>
        </ul>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">不同能源消费结构的经济体在地缘冲突下能源价格响应能力的差异</h3>
          <span class="cv-badge-date">2026.04 – 至今</span>
        </div>
        <div class="cv-entry-sub">大学生创新创业训练计划（大创） · 核心成员</div>
        <ul class="cv-list">
          <li>搜集整理多国能源消费结构与跨国宏观时间序列面板数据，测度外部地缘供给冲击下的价格响应弹性。</li>
        </ul>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">AI4Learning Econ 经济金融公开讲义与学术主页</h3>
          <span class="cv-badge-date">2025.08 – 至今</span>
        </div>
        <div class="cv-entry-sub">个人开源项目 · <a href="https://aeiou0123.github.io/portfolio/" target="_blank" rel="noopener">访问知识库</a></div>
        <ul class="cv-list">
          <li>独立搭建并维护个人学术主页，系统整理开源数理分析、中级微/宏观、计量经济学、博弈论与产业组织学等讲义与习题详解库。</li>
        </ul>
      </div>
    </section>

    <!-- 实习经历 -->
    <section class="cv-section">
      <h2 class="cv-section-title"><i class="fas fa-briefcase"></i> 实习经历</h2>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">兴业经济研究咨询股份有限公司（兴业研究）</h3>
          <span class="cv-badge-date">2026.07 – 2026.09</span>
        </div>
        <div class="cv-entry-sub">宏观市场部 · 宏观研究实习生</div>
        <ul class="cv-list">
          <li>跟踪宏观经济数据与研报撰写，深入分析中国宏观经济运行中的“K型分化”特征与演化机制。</li>
          <li>结合达利欧（Ray Dalio）长期债务周期理论，探讨中国房地产周期的结构特征、所处阶段及去杠杆化路径。</li>
          <li>搜集整理中欧经贸往来及欧洲对华贸易法规政策变动，评估宏观政策演进对经贸格局与金融市场行情的影响。</li>
        </ul>
      </div>
    </section>

    <!-- 核心课程与自修研读 -->
    <section class="cv-section">
      <h2 class="cv-section-title"><i class="fas fa-university"></i> 核心课程与自修研读</h2>
      
      <div class="cv-course-box">
        <div class="cv-course-label">经济金融专业课</div>
        <div class="cv-course-content">
          中级宏观经济学 (<span class="cv-highlight">100</span>)、会计学 (<span class="cv-highlight">96</span>)、中级微观经济学 (<span class="cv-highlight">95</span>)、金融学原理 (<span class="cv-highlight">94</span>)、金融市场学 (<span class="cv-highlight">92</span>)
        </div>
      </div>

      <div class="cv-course-box">
        <div class="cv-course-label">数学与统计基础</div>
        <div class="cv-course-content">
          高等代数与几何 II (<span class="cv-highlight">93</span>)、应用统计学 (<span class="cv-highlight">93</span>)、概率论与数理统计 (<span class="cv-highlight">92</span>)、大学物理 (<span class="cv-highlight">90</span>)、数学分析 (<span class="cv-highlight">90/86</span>)
        </div>
      </div>

      <div class="cv-course-box">
        <div class="cv-course-label">自修与进阶研读</div>
        <div class="cv-course-content">
          机器学习、深度学习、强化学习、产业组织、运筹学、高级计量经济学
        </div>
      </div>
    </section>

    <!-- 荣誉奖项与学术竞赛 -->
    <section class="cv-section">
      <h2 class="cv-section-title"><i class="fas fa-award"></i> 荣誉奖项与学术竞赛</h2>
      <div class="cv-row">
        <span>教育部 <strong class="cv-highlight">国家奖学金</strong>（本科生国家最高荣誉）</span>
        <span class="cv-badge-date">2025 – 2026</span>
      </div>
      <div class="cv-row">
        <span>西安交通大学 <strong>校级一等奖学金</strong></span>
        <span class="cv-badge-date">2024 – 2025</span>
      </div>
      <div class="cv-row">
        <span>全国大学生统计建模大赛 <strong class="cv-highlight">陕西省赛一等奖</strong></span>
        <span class="cv-badge-date">2026</span>
      </div>
      <div class="cv-row">
        <span>全国高等院校数智化企业经营沙盘大赛 <strong class="cv-highlight">国赛三等奖</strong></span>
        <span class="cv-badge-date">2026</span>
      </div>
    </section>

    <!-- 专业技能与语言水平 -->
    <section class="cv-section">
      <h2 class="cv-section-title"><i class="fas fa-tools"></i> 专业技能与语言水平</h2>
      <ul class="cv-list">
        <li><strong>代码与计量工具</strong>：Stata、Python、LaTeX、C（具备基础实用能力）。</li>
        <li><strong>AI 原生工作流</strong>：熟练驱动 AI 辅助科研与工程工作流（AI-native workflows）。</li>
        <li><strong>语言能力</strong>：中文（母语）；英语（大学英语六级 CET-6: <span class="cv-highlight">602 分</span>）。</li>
      </ul>
    </section>

  </div>

  <!-- ===================================================================== -->
  <!-- ENGLISH VERSION -->
  <!-- ===================================================================== -->
  <div id="cv-content-en" class="cv-lang-content" style="display: none;">

    <!-- Education -->
    <section class="cv-section">
      <h2 class="cv-section-title"><i class="fas fa-graduation-cap"></i> Education</h2>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">Xi'an Jiaotong University (XJTU), Jinhe Center for Economic Research</h3>
          <span class="cv-badge-date">2025.09 – Present</span>
        </div>
        <div class="cv-entry-sub">Third-Year Undergraduate in Quantitative Economics and Finance (Expected June 2028)</div>
        <div class="cv-entry-meta">
          Sophomore Year GPA: <span class="cv-highlight">90.73 / 100</span> &nbsp;&nbsp;&nbsp;&nbsp; Sophomore Rank: <span class="cv-highlight">1 / 22</span>
        </div>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">Xi'an Jiaotong University (XJTU), School of Mathematics and Statistics</h3>
          <span class="cv-badge-date">2024.09 – 2025.07</span>
        </div>
        <div class="cv-entry-sub">First-Year Undergraduate in Mathematics</div>
        <div class="cv-entry-meta">
          Freshman Year GPA: <span class="cv-highlight">87.81 / 100</span> &nbsp;&nbsp;&nbsp;&nbsp; Freshman Rank: <span class="cv-highlight">3 / 109</span>
        </div>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">Xi'an Jiaotong University (XJTU), Qian Xuesen College</h3>
          <span class="cv-badge-date">2022.09 – 2024.07</span>
        </div>
        <div class="cv-entry-sub">Pre-College, Special Class for the Gifted Young (SCGY)</div>
        <div class="cv-entry-meta">
          Pre-College GPA: <span class="cv-highlight">87.92 / 100</span> &nbsp;&nbsp;&nbsp;&nbsp; Overall Rank: <span class="cv-highlight">54 / 193</span>
        </div>
      </div>
    </section>

    <!-- Research Interests -->
    <section class="cv-section">
      <h2 class="cv-section-title"><i class="fas fa-compass"></i> Research Interests</h2>
      <ul class="cv-list">
        <li><strong>AI Exposure & Market Structure</strong>: AI exposure measurement, impacts of AI on firm decision-making and market structure</li>
        <li><strong>Industrial Organization</strong>: Industrial Organization (IO) and Empirical IO</li>
        <li><strong>Macroeconomics & Macro-Finance</strong>: Macro transmission mechanisms, monetary models, and business cycles</li>
      </ul>
    </section>

    <!-- Working Papers & Research Projects -->
    <section class="cv-section">
      <h2 class="cv-section-title"><i class="fas fa-book-open"></i> Working Papers & Research Projects</h2>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">Adaptive Adjustment of Higher Education Majors Under LLM Shocks: Theoretical Modeling, Exposure Measurement, and Continuous DID Estimation</h3>
          <span class="cv-badge-date">2026.02 – Present</span>
        </div>
        <div class="cv-entry-sub">Research Training (Advised by Prof. Xiaodong Chen and Prof. Xiaoliang Yang) · Principal Investigator</div>
        <ul class="cv-list">
          <li>Extended the Acemoglu & Restrepo (2018) task framework to higher education supply; constructed a crosswalk mapping 101 occupational LLM exposures to 889 undergraduate majors.</li>
          <li>Built a micro panel from 2015–2024 national major filings and 4.34 million provincial enrollment records; evaluated causal impacts using Continuous DID, Causal Forests, and trend-adjusted robustness checks.</li>
        </ul>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">Firm Decision-Making and Market Structure Under Token and AI Agent Shocks: Cost Restructuring, Competitive Pass-Through, and Welfare Implications</h3>
          <span class="cv-badge-date">2026</span>
        </div>
        <div class="cv-entry-sub">Independent Research / Working Paper</div>
        <ul class="cv-list">
          <li>Abstracted Tokens and AI Agents as on-demand heterogeneous inputs, restructuring firm-level marginal and fixed cost functions.</li>
          <li>Modeled market concentration, competitive dynamics, and consumer welfare under Cournot and Bertrand oligopolies with endogenous entry/exit and search frictions.</li>
        </ul>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">Claim2Value: Financial AI Agent for Technical Claim Verification and Dynamic Valuation in Embodied AI Supply Chains</h3>
          <span class="cv-badge-date">2026.08 – 2026.09</span>
        </div>
        <div class="cv-entry-sub">PKU Financial AI Agent Competition · Economic & Financial Reasoning Lead / Core Developer</div>
        <ul class="cv-list">
          <li>Covered 11 core listed firms in humanoid robotics/embodied AI; built an end-to-end agent pipeline from unstructured technical claim extraction to multi-source verification and financial mapping.</li>
          <li>Benchmarked 51 domain technical claims; structured causal chains ("technical metric → capacity/productivity → pricing/cost → gross margin") to refute non-causal hype; developed dynamic three-scenario valuation models.</li>
        </ul>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">Perceived Age Discrimination, Psychological Coping, and Policy Demands of Job Seekers Aged 35+</h3>
          <span class="cv-badge-date">2025.12 – 2026.04</span>
        </div>
        <div class="cv-entry-sub">National "Challenge Cup" Academic Competition · Core Researcher</div>
        <ul class="cv-list">
          <li>Cleaned primary survey microdata; performed Principal Component Analysis (PCA) on coping strategies and utilized quantile regressions to test asymmetric penalties across wage distributions.</li>
        </ul>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">Heterogeneous Energy Price Pass-Through Across Consumption Structures Under Geopolitical Shocks</h3>
          <span class="cv-badge-date">2026.04 – Present</span>
        </div>
        <div class="cv-entry-sub">Undergraduate Innovation Research Program · Core Researcher</div>
        <ul class="cv-list">
          <li>Compiled cross-country macroeconomic time-series panels to evaluate supply-side pass-through elasticities under geopolitical disruptions.</li>
        </ul>
      </div>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">AI4Learning Econ: Open-Source Lecture Notes and Academic Repository</h3>
          <span class="cv-badge-date">2025.08 – Present</span>
        </div>
        <div class="cv-entry-sub">Independent Open-Source Project · <a href="https://aeiou0123.github.io/portfolio/" target="_blank" rel="noopener">Browse Notes</a></div>
        <ul class="cv-list">
          <li>Built and maintained an academic homepage curating structured lecture notes, exercise solutions, and course working papers covering Mathematical Analysis, Intermediate Micro/Macro, Econometrics, Game Theory, and Industrial Organization.</li>
        </ul>
      </div>
    </section>

    <!-- Professional Experience -->
    <section class="cv-section">
      <h2 class="cv-section-title"><i class="fas fa-briefcase"></i> Professional Experience</h2>

      <div class="cv-entry">
        <div class="cv-entry-head">
          <h3 class="cv-entry-title">CIB Research (Industrial Research)</h3>
          <span class="cv-badge-date">2026.07 – 2026.09</span>
        </div>
        <div class="cv-entry-sub">Macro Market Department · Macroeconomic Research Intern</div>
        <ul class="cv-list">
          <li>Tracked high-frequency macro indicators and examined structural dynamics of China's "K-shaped" economic divergence.</li>
          <li>Applied Ray Dalio's debt cycle framework to examine structural dynamics and deleveraging in the property market.</li>
          <li>Monitored China-Europe trade flows and EU regulatory changes to evaluate macro and financial market impacts.</li>
        </ul>
      </div>
    </section>

    <!-- Coursework & Preparation -->
    <section class="cv-section">
      <h2 class="cv-section-title"><i class="fas fa-university"></i> Coursework & Academic Preparation</h2>

      <div class="cv-course-box">
        <div class="cv-course-label">Core Economics & Finance</div>
        <div class="cv-course-content">
          Intermediate Macroeconomics (<span class="cv-highlight">100</span>), Principles of Accounting (<span class="cv-highlight">96</span>), Intermediate Microeconomics (<span class="cv-highlight">95</span>), Principles of Finance (<span class="cv-highlight">94</span>), Financial Markets & Institutions (<span class="cv-highlight">92</span>)
        </div>
      </div>

      <div class="cv-course-box">
        <div class="cv-course-label">Mathematics & Statistics</div>
        <div class="cv-course-content">
          Advanced Algebra & Analytic Geometry II (<span class="cv-highlight">93</span>), Applied Statistics (<span class="cv-highlight">93</span>), Probability Theory & Mathematical Statistics (<span class="cv-highlight">92</span>), University Physics (<span class="cv-highlight">90</span>), Mathematical Analysis (<span class="cv-highlight">90/86</span>)
        </div>
      </div>

      <div class="cv-course-box">
        <div class="cv-course-label">Advanced & Self-Study</div>
        <div class="cv-course-content">
          Machine Learning, Deep Learning, Reinforcement Learning, Industrial Organization, Operations Research, Econometrics
        </div>
      </div>
    </section>

    <!-- Honors & Awards -->
    <section class="cv-section">
      <h2 class="cv-section-title"><i class="fas fa-award"></i> Honors & Awards</h2>
      <div class="cv-row">
        <span>National Scholarship (Ministry of Education, Top Undergraduate Honor)</span>
        <span class="cv-badge-date">2025 – 2026</span>
      </div>
      <div class="cv-row">
        <span>First-Class Academic Scholarship, Xi'an Jiaotong University</span>
        <span class="cv-badge-date">2024 – 2025</span>
      </div>
      <div class="cv-row">
        <span>National College Students Statistical Modeling Competition, <strong class="cv-highlight">Shaanxi Provincial 1st Prize</strong></span>
        <span class="cv-badge-date">2026</span>
      </div>
      <div class="cv-row">
        <span>National Digital Business Simulation Sandbox Competition, <strong class="cv-highlight">National 3rd Prize</strong></span>
        <span class="cv-badge-date">2026</span>
      </div>
    </section>

    <!-- Skills & Languages -->
    <section class="cv-section">
      <h2 class="cv-section-title"><i class="fas fa-tools"></i> Skills & Languages</h2>
      <ul class="cv-list">
        <li><strong>Coding & Econometric Tools</strong>: Stata, Python, LaTeX, C (Basic working proficiency).</li>
        <li><strong>AI-Native Workflows</strong>: Comfortable driving AI-assisted research and engineering workflows.</li>
        <li><strong>Languages</strong>: Mandarin Chinese (Native); English (CET-6: <span class="cv-highlight">602 / 710</span>).</li>
      </ul>
    </section>

  </div>

</div>

<!-- Client-side Interactive Language Switching -->
<script>
  function switchCvLang(lang) {
    var zhBox = document.getElementById('cv-content-zh');
    var enBox = document.getElementById('cv-content-en');
    var btnZh = document.getElementById('btn-lang-zh');
    var btnEn = document.getElementById('btn-lang-en');

    if (!zhBox || !enBox || !btnZh || !btnEn) return;

    if (lang === 'en') {
      zhBox.style.display = 'none';
      enBox.style.display = 'block';
      btnEn.classList.add('active');
      btnZh.classList.remove('active');
      try {
        window.history.replaceState(null, null, '#en');
      } catch (e) {}
    } else {
      zhBox.style.display = 'block';
      enBox.style.display = 'none';
      btnZh.classList.add('active');
      btnEn.classList.remove('active');
      try {
        window.history.replaceState(null, null, '#zh');
      } catch (e) {}
    }
  }

  // Handle URL hash on load
  (function() {
    function initLang() {
      var hash = window.location.hash;
      if (hash === '#en') {
        switchCvLang('en');
      } else {
        switchCvLang('zh');
      }
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initLang);
    } else {
      initLang();
    }
  })();
</script>
