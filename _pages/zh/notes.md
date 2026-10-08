---
layout: page
permalink: /zh/notes/
title: 课程资料与研读笔记
description: 西安交通大学本科阶段课程讲义、作业与题解底稿汇总。点击课程可展开查看与下载。
lang: zh
---

<style>
details.course-card {
  border: 1px solid var(--global-divider-color, #e0e0e0);
  border-radius: 8px;
  margin-bottom: 1.25rem;
  padding: 1rem 1.25rem;
  background-color: var(--global-card-bg-color, #fff);
  transition: all 0.2s ease-in-out;
}
details.course-card[open] {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
summary.course-title {
  cursor: pointer;
  font-size: 1.15rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  outline: none;
}
summary.course-title::-webkit-details-marker {
  display: none;
}
summary.course-title::after {
  content: "＋";
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--global-theme-color, #0076df);
  transition: transform 0.2s;
}
details.course-card[open] summary.course-title::after {
  content: "－";
}
.course-meta {
  font-size: 0.85rem;
  color: var(--global-text-color-light, #666);
  font-weight: normal;
  display: block;
  margin-top: 0.25rem;
}
.course-body {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--global-divider-color, #eee);
  font-size: 0.95rem;
  line-height: 1.6;
}
.course-body ul {
  padding-left: 1.25rem;
  margin-bottom: 0.75rem;
}
.course-body li {
  margin-bottom: 0.35rem;
}
</style>

<!-- Course 1 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      中级微观经济学
      <span class="course-meta">金禾经济研究中心 · 2026年春 · 授课教师：李老师、周老师</span>
    </div>
  </summary>
  <div class="course-body">
    <p><strong>参考教材：</strong> Walter Nicholson & Christopher Snyder, <em>Microeconomic Theory: Basic Principles and Extensions</em>, 9th Edition.</p>
    
    <h6>平时作业与详细解答</h6>
    <ul>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/HW1.pdf' | relative_url }}" target="_blank">第一次作业 (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/homework2.pdf' | relative_url }}" target="_blank">第二次作业 (PDF)</a> · <a href="{{ '/files/Intermediate%20Microeconomics/hw2.pdf' | relative_url }}" target="_blank">第二次作业解答 (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/中微第四次作业_逐问答题版.pdf' | relative_url }}" target="_blank">第四次作业（逐问答题版）(PDF)</a> · <a href="{{ '/files/Intermediate%20Microeconomics/中微第四次作业_答案详解版.pdf' | relative_url }}" target="_blank">第四次作业（答案详解版）(PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/中微第五次作业_逐问答题版.pdf' | relative_url }}" target="_blank">第五次作业（逐问答题版）(PDF)</a> · <a href="{{ '/files/Intermediate%20Microeconomics/中微第五次作业_答案详解版.pdf' | relative_url }}" target="_blank">第五次作业（答案详解版）(PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/中微第六次作业_答题版.pdf' | relative_url }}" target="_blank">第六次作业（题目答题版）(PDF)</a> · <a href="{{ '/files/Intermediate%20Microeconomics/中微第六次作业_答案详解版.pdf' | relative_url }}" target="_blank">第六次作业（答案详解版）(PDF)</a></li>
    </ul>

    <h6>专题讲义与笔记</h6>
    <ul>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/市场结构.pdf' | relative_url }}" target="_blank">市场结构专题 (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/博弈论笔记整合.pdf' | relative_url }}" target="_blank">博弈论笔记整合 (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/general_equilibrium_chapter.pdf' | relative_url }}" target="_blank">一般均衡理论 (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/externalities_chapter.pdf' | relative_url }}" target="_blank">外部性 (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/public_goods_chapter.pdf' | relative_url }}" target="_blank">公共品理论 (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/information_incentives_chapter_fixed.pdf' | relative_url }}" target="_blank">不对称信息与激励机制 (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/labor_market_chapter.pdf' | relative_url }}" target="_blank">劳动市场理论 (PDF)</a></li>
    </ul>

    <h6>课程研讨论文</h6>
    <ul>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/agent-token-micro-paper.pdf' | relative_url }}" target="_blank">Token与AI Agent冲击下的微观企业决策与市场结构演化 (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/IMpaper.pdf' | relative_url }}" target="_blank">从霍特林模型到投票机制：多维偏好空间与社会选择扭曲 (PDF)</a></li>
    </ul>
  </div>
</details>

<!-- Course 2 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      中级宏观经济学
      <span class="course-meta">金禾经济研究中心 · 2026年春 · 授课教师：张老师</span>
    </div>
  </summary>
  <div class="course-body">
    <p><strong>参考教材：</strong> Andrew B. Abel, Ben S. Bernanke, and Dean Croushore, <em>Macroeconomics</em>, 6th Edition (习题基于第11版).</p>
    
    <h6>宏观分析框架</h6>
    <ul>
      <li><a href="{{ '/files/Intermediate%20Macroeconomics/Classical%20&%20Keynesian.pdf' | relative_url }}" target="_blank">古典学派与凯恩斯学派分析框架 (PDF)</a></li>
    </ul>

    <h6>平时作业与详细解答</h6>
    <ul>
      <li><a href="{{ '/files/Intermediate%20Macroeconomics/homework1.pdf' | relative_url }}" target="_blank">第一次作业：第3-5章题目 (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Macroeconomics/homework2macro.pdf' | relative_url }}" target="_blank">第二次作业：第6-9章题目 (PDF)</a> · <a href="{{ '/files/Intermediate%20Macroeconomics/homework2_solutions.pdf' | relative_url }}" target="_blank">第二次作业答案 (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Macroeconomics/homework3macro.pdf' | relative_url }}" target="_blank">第三次作业：第10-12章题目 (PDF)</a> · <a href="{{ '/files/Intermediate%20Macroeconomics/hw3_combined.pdf' | relative_url }}" target="_blank">第三次作业答案 (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Macroeconomics/ch13_ch14_ch15_combined_blank_space.pdf' | relative_url }}" target="_blank">第四次作业：第13-15章题目 (PDF)</a> · <a href="{{ '/files/Intermediate%20Macroeconomics/ch13_ch14_ch15_detailed_solutions_bilingual.pdf' | relative_url }}" target="_blank">第四次作业中英双语详解版 (PDF)</a></li>
    </ul>
  </div>
</details>

<!-- Course 3 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      应用统计学
      <span class="course-meta">数学与统计学院 · 2025年秋 · 授课教师：马老师</span>
    </div>
  </summary>
  <div class="course-body">
    <h6>章节讲义与研读笔记</h6>
    <ul>
      <li><a href="{{ '/files/Introduction_Applied_Statistics.pdf' | relative_url }}" target="_blank">课程大纲与导读 (PDF)</a></li>
      <li><a href="{{ '/files/Graphical_descriptive_techniques_notes.pdf' | relative_url }}" target="_blank">第一章：图表描述性统计 (PDF)</a></li>
      <li><a href="{{ '/files/Summary_statistics_notes.pdf' | relative_url }}" target="_blank">第二章：数值描述性统计 (PDF)</a></li>
      <li><a href="{{ '/files/Data_collection_notes.pdf' | relative_url }}" target="_blank">第三章：数据收集与抽样 (PDF)</a></li>
      <li><a href="{{ '/files/Sampling_distributions_notes.pdf' | relative_url }}" target="_blank">第四章：抽样分布 (PDF)</a></li>
      <li><a href="{{ '/files/Introduction_to_estimation_notes.pdf' | relative_url }}" target="_blank">第五章：参数估计 (PDF)</a></li>
      <li><a href="{{ '/files/Introduction_to_hypothesis_testing_notes.pdf' | relative_url }}" target="_blank">第六章：假设检验导论 (PDF)</a></li>
      <li><a href="{{ '/files/One_sample_inference_notes.pdf' | relative_url }}" target="_blank">第七章：单样本统计推断 (PDF)</a></li>
      <li><a href="{{ '/files/Inference_about_Two_Populations.pdf' | relative_url }}" target="_blank">第八章：两总体统计推断 (PDF)</a></li>
      <li><a href="{{ '/files/Rank_test.pdf' | relative_url }}" target="_blank">第九章：秩和检验 (PDF)</a></li>
      <li><a href="{{ '/files/Resampling_Methods_Bootstrap_and_Permutation.pdf' | relative_url }}" target="_blank">第十章：重抽样方法：Bootstrap与排列检验 (PDF)</a></li>
    </ul>
  </div>
</details>

<!-- Course 4 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      金融市场学
      <span class="course-meta">金禾经济研究中心 · 2026年春 · 授课教师：周老师</span>
    </div>
  </summary>
  <div class="course-body">
    <p><strong>参考教材：</strong> Anthony Saunders & Marcia Millon Cornett, <em>Financial Markets and Institutions</em>.</p>
    
    <h6>专题讲义与笔记</h6>
    <ul>
      <li><a href="{{ '/files/Financial%20Institution/financial_markets_notes.pdf' | relative_url }}" target="_blank">次贷危机演化与政策应对 (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/financial_markets_notes_part2.pdf' | relative_url }}" target="_blank">金融市场、利率决定与美联储机制 (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/financial_markets_notes_part3.pdf' | relative_url }}" target="_blank">货币、债券、抵押贷款与外汇市场 (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/financial_markets_notes_part4.pdf' | relative_url }}" target="_blank">股票与金融衍生品市场 (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/financial_markets_notes_part5.pdf' | relative_url }}" target="_blank">香港联系汇率制与1998年保卫战 (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/financial_markets_notes_part6.pdf' | relative_url }}" target="_blank">资产估值与技术分析基础 (PDF)</a></li>
    </ul>

    <h6>教材课后习题解答</h6>
    <ul>
      <li><a href="{{ '/files/Financial%20Institution/answers_ch1_ch2.pdf' | relative_url }}" target="_blank">第1-2章题解：金融市场导论 (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/answers_ch3_ch4.pdf' | relative_url }}" target="_blank">第3-4章题解：利率与美联储政策 (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/answers_ch5_ch6.pdf' | relative_url }}" target="_blank">第5-6章题解：货币与债券市场 (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/answers_ch7_ch8.pdf' | relative_url }}" target="_blank">第7-8章题解：抵押贷款与股票市场 (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/answers_ch9_ch10.pdf' | relative_url }}" target="_blank">第9-10章题解：外汇与衍生品市场 (PDF)</a></li>
    </ul>
  </div>
</details>

<!-- Course 5 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      金融学原理
      <span class="course-meta">金禾经济研究中心 · 2026年春 · 授课教师：赵老师</span>
    </div>
  </summary>
  <div class="course-body">
    <h6>复习大纲与要点归纳</h6>
    <ul>
      <li><a href="{{ '/files/Principles%20of%20Finance/finance_review_notes.pdf' | relative_url }}" target="_blank">公司理财期末复习笔记 (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/知识要点+金融学原理.docx' | relative_url }}" target="_blank">金融学原理核心知识要点 (DOCX)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/1.0%20金融学原理名词汇总.doc' | relative_url }}" target="_blank">金融学原理专业名词汇总 (DOC)</a></li>
    </ul>

    <h6>分章练习答题与详细题解</h6>
    <ul>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH01_公司理财导论_练习答题与详细题解.pdf' | relative_url }}" target="_blank">第1章：公司理财导论 (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH04_资本预算的其他方法_QA_练习答题与详细题解.pdf' | relative_url }}" target="_blank">第4章：资本预算的其他方法 (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH05_金融市场与NPV_练习答题与详细题解.pdf' | relative_url }}" target="_blank">第5章：金融市场与净现值 (NPV) (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH06_练习答题与详细题解.pdf' | relative_url }}" target="_blank">第6章：资本市场历史 (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH07_CAPM_QA_练习答题与详细题解.pdf' | relative_url }}" target="_blank">第7章：CAPM 资本资产定价模型 (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH08_资产定价模型_练习答题与详细题解.pdf' | relative_url }}" target="_blank">第8章：资产定价模型与因素模型 (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH10_租赁_练习答题与详细题解.pdf' | relative_url }}" target="_blank">第10章：租赁融资 (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_EMH_QA_练习答题与详细题解.pdf' | relative_url }}" target="_blank">有效市场假说 (EMH) 第一部分 (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH12_EMH_有效市场假说_练习答题与详细题解.pdf' | relative_url }}" target="_blank">第12章：有效市场假说 第二部分 (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_WACC_QA_练习答题与详细题解.pdf' | relative_url }}" target="_blank">加权平均资本成本 (WACC) (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_MM_QA_练习答题与详细题解.pdf' | relative_url }}" target="_blank">MM 定理 第一部分 (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_MM_Limits_QA_练习答题与详细题解.pdf' | relative_url }}" target="_blank">MM 定理 第二部分与资本结构边界 (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_Dividends_QA_练习答题与详细题解.pdf' | relative_url }}" target="_blank">股利政策与分红机制 (PDF)</a></li>
    </ul>
  </div>
</details>

<!-- Course 6 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      会计学
      <span class="course-meta">金禾经济研究中心 · 2025年秋 · 授课教师：吴老师</span>
    </div>
  </summary>
  <div class="course-body">
    <h6>章节笔记与重点梳理</h6>
    <ul>
      <li><a href="{{ '/files/Chapter1.pdf' | relative_url }}" target="_blank">第一章：财务报表导论 (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_2.pdf' | relative_url }}" target="_blank">第二章：财务报表深入解析 (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_3.pdf' | relative_url }}" target="_blank">第三章：会计信息系统 (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_4.pdf' | relative_url }}" target="_blank">第四章：权责发生制概念 (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_5.pdf' | relative_url }}" target="_blank">第五章：商品销售业务与利润表 (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_6.pdf' | relative_url }}" target="_blank">第六章：存货核算与报告 (PDF)</a></li>
      <li><a href="{{ '/files/Chapter%207.pdf' | relative_url }}" target="_blank">第七章：舞弊、内部控制与现金管理 (PDF)</a></li>
      <li><a href="{{ '/files/Chapter%208.pdf' | relative_url }}" target="_blank">第八章：应收账款核算 (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_9.pdf' | relative_url }}" target="_blank">第九章：长期资产与折旧 (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_10.pdf' | relative_url }}" target="_blank">第十章：负债核算 (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_11.pdf' | relative_url }}" target="_blank">第十一章：所有者权益 (PDF)</a></li>
    </ul>
  </div>
</details>

<!-- Course 7 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      经济学原理（宏观部分）
      <span class="course-meta">金禾经济研究中心 · 2025年秋 · 授课教师：郭老师</span>
    </div>
  </summary>
  <div class="course-body">
    <h6>基础讲义</h6>
    <ul>
      <li><a href="{{ '/files/Chapter1%20(1).pdf' | relative_url }}" target="_blank">第一章：经济学基础（英文版）(PDF)</a> · <a href="{{ '/files/Chapter1_Simplified_Chinese.pdf' | relative_url }}" target="_blank">第一章：经济学基础（中文版）(PDF)</a></li>
      <li><a href="{{ '/files/national_income_theory.pdf' | relative_url }}" target="_blank">国民收入核算理论：第1-3章 (PDF)</a></li>
      <li><a href="{{ '/files/经济管理概论.pdf' | relative_url }}" target="_blank">经济管理概论 (PDF)</a></li>
    </ul>

    <h6>宏观经济模型</h6>
    <ul>
      <li><a href="{{ '/files/物价指数笔记.pdf' | relative_url }}" target="_blank">物价指数与通货膨胀 (PDF)</a></li>
      <li><a href="{{ '/files/宏观框架笔记.pdf' | relative_url }}" target="_blank">宏观分析框架 (PDF)</a> · <a href="{{ '/files/通胀框架笔记.pdf' | relative_url }}" target="_blank">通胀分析框架 (PDF)</a></li>
      <li><a href="{{ '/files/一般均衡笔记.pdf' | relative_url }}" target="_blank">一般均衡理论基础 (PDF)</a></li>
      <li><a href="{{ '/files/家庭公司循环.pdf' | relative_url }}" target="_blank">家庭与企业循环流向图 (PDF)</a></li>
    </ul>

    <h6>货币、银行与金融</h6>
    <ul>
      <li><a href="{{ '/files/货币需求与流通速度笔记.pdf' | relative_url }}" target="_blank">货币需求与流通速度 (PDF)</a></li>
      <li><a href="{{ '/files/货币供给笔记.pdf' | relative_url }}" target="_blank">货币供给机制 (PDF)</a></li>
      <li><a href="{{ '/files/商业银行笔记.pdf' | relative_url }}" target="_blank">商业银行与货币创造 (PDF)</a></li>
      <li><a href="{{ '/files/货币波动和政策笔记.pdf' | relative_url }}" target="_blank">货币波动与宏观政策 (PDF)</a></li>
      <li><a href="{{ '/files/baumol模型笔记.pdf' | relative_url }}" target="_blank">鲍莫尔-托宾现金存货模型 (PDF)</a> · <a href="{{ '/files/baumol模型与铸币费.pdf' | relative_url }}" target="_blank">鲍莫尔模型与铸币费 (PDF)</a></li>
      <li><a href="{{ '/files/铸币费与通胀税笔记.pdf' | relative_url }}" target="_blank">铸币税与通胀税 (PDF)</a></li>
      <li><a href="{{ '/files/保值债笔记.pdf' | relative_url }}" target="_blank">抗通胀保值债券 (TIPS) (PDF)</a></li>
      <li><a href="{{ '/files/金本位现钞笔记.pdf' | relative_url }}" target="_blank">金本位与现钞机制 (PDF)</a> · <a href="{{ '/files/金币经济笔记.pdf' | relative_url }}" target="_blank">金币经济学 (PDF)</a></li>
      <li><a href="{{ '/files/汇率笔记1.pdf' | relative_url }}" target="_blank">汇率决定机制 (PDF)</a> · <a href="{{ '/files/国际金融笔记.pdf' | relative_url }}" target="_blank">国际金融框架 (PDF)</a></li>
      <li><a href="{{ '/files/MEC笔记.pdf' | relative_url }}" target="_blank">资本边际效率 (MEC) (PDF)</a></li>
    </ul>

    <h6>平时练习题</h6>
    <ul>
      <li><a href="{{ '/files/经济学原理习题.pdf' | relative_url }}" target="_blank">经济学原理练习题集 1 (PDF)</a> · <a href="{{ '/files/习题2.pdf' | relative_url }}" target="_blank">练习题集 2 (PDF)</a></li>
    </ul>
  </div>
</details>

<!-- Course 8 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      独立研读与进阶笔记
      <span class="course-meta">课外研读与进阶学习记录 · 2026年春</span>
    </div>
  </summary>
  <div class="course-body">
    <ul>
      <li><a href="{{ '/files/AI4LearningEcon/math4econ.pdf' | relative_url }}" target="_blank">经济与金融的数学分析基础 (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/经济与金融研究的数理方法.pdf' | relative_url }}" target="_blank">经济与金融研究的数理方法 (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/ai4econ.pdf' | relative_url }}" target="_blank">人工智能在经济与金融中的应用 (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/经济增长.pdf' | relative_url }}" target="_blank">经济增长理论 (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/产业组织学.pdf' | relative_url }}" target="_blank">产业组织理论 (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/高级微观经济学.pdf' | relative_url }}" target="_blank">高级微观经济学研读 (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/高级宏观经济学.pdf' | relative_url }}" target="_blank">高级宏观经济学研读 (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/计量经济学.pdf' | relative_url }}" target="_blank">计量经济学方法 (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/game-theory-textbook.pdf' | relative_url }}" target="_blank">博弈论与信息经济学 (PDF)</a></li>
    </ul>
  </div>
</details>
