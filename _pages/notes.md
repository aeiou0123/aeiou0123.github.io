---
layout: page
permalink: /notes/
title: notes
description: Lecture notes, problem sets, and study materials from undergraduate coursework at Xi'an Jiaotong University. Click any course to expand.
nav: true
nav_order: 4
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
      Intermediate Microeconomics
      <span class="course-meta">Jinhe Center for Economic Research · Spring 2026 · Taught by Prof. Li & Prof. Zhou</span>
    </div>
  </summary>
  <div class="course-body">
    <p><strong>Textbook:</strong> Walter Nicholson & Christopher Snyder, <em>Microeconomic Theory: Basic Principles and Extensions</em>, 9th Edition.</p>
    
    <h6>Homework & Solutions</h6>
    <ul>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/HW1.pdf' | relative_url }}" target="_blank">Homework 1 (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/homework2.pdf' | relative_url }}" target="_blank">Homework 2 (PDF)</a> · <a href="{{ '/files/Intermediate%20Microeconomics/hw2.pdf' | relative_url }}" target="_blank">Homework 2 Solutions (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/中微第四次作业_逐问答题版.pdf' | relative_url }}" target="_blank">Homework 4 (Q&A Version) (PDF)</a> · <a href="{{ '/files/Intermediate%20Microeconomics/中微第四次作业_答案详解版.pdf' | relative_url }}" target="_blank">Homework 4 (Detailed Solutions) (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/中微第五次作业_逐问答题版.pdf' | relative_url }}" target="_blank">Homework 5 (Q&A Version) (PDF)</a> · <a href="{{ '/files/Intermediate%20Microeconomics/中微第五次作业_答案详解版.pdf' | relative_url }}" target="_blank">Homework 5 (Detailed Solutions) (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/中微第六次作业_答题版.pdf' | relative_url }}" target="_blank">Homework 6 (Problems Version) (PDF)</a> · <a href="{{ '/files/Intermediate%20Microeconomics/中微第六次作业_答案详解版.pdf' | relative_url }}" target="_blank">Homework 6 (Detailed Solutions) (PDF)</a></li>
    </ul>

    <h6>Topic Lecture Notes</h6>
    <ul>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/市场结构.pdf' | relative_url }}" target="_blank">Market Structure (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/博弈论笔记整合.pdf' | relative_url }}" target="_blank">Game Theory (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/general_equilibrium_chapter.pdf' | relative_url }}" target="_blank">General Equilibrium Theory (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/externalities_chapter.pdf' | relative_url }}" target="_blank">Externalities (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/public_goods_chapter.pdf' | relative_url }}" target="_blank">Public Goods (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/information_incentives_chapter_fixed.pdf' | relative_url }}" target="_blank">Asymmetric Information & Incentives (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/labor_market_chapter.pdf' | relative_url }}" target="_blank">Labor Markets (PDF)</a></li>
    </ul>

    <h6>Coursework Papers</h6>
    <ul>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/agent-token-micro-paper.pdf' | relative_url }}" target="_blank">Firm Decision-Making & Market Structure Under Token & AI Agent Shocks (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Microeconomics/IMpaper.pdf' | relative_url }}" target="_blank">From Hotelling to Voting Systems: Multidimensional Preference Space & Social Choice (PDF)</a></li>
    </ul>
  </div>
</details>

<!-- Course 2 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      Intermediate Macroeconomics
      <span class="course-meta">Jinhe Center for Economic Research · Spring 2026 · Taught by Prof. Zhang</span>
    </div>
  </summary>
  <div class="course-body">
    <p><strong>Textbook:</strong> Andrew B. Abel, Ben S. Bernanke, and Dean Croushore, <em>Macroeconomics</em>, 6th Edition (problem sets based on 11th Edition).</p>
    
    <h6>Framework Notes</h6>
    <ul>
      <li><a href="{{ '/files/Intermediate%20Macroeconomics/Classical%20&%20Keynesian.pdf' | relative_url }}" target="_blank">Classical & Keynesian Frameworks (PDF)</a></li>
    </ul>

    <h6>Homework & Solutions</h6>
    <ul>
      <li><a href="{{ '/files/Intermediate%20Macroeconomics/homework1.pdf' | relative_url }}" target="_blank">Homework 1: Ch03-05 (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Macroeconomics/homework2macro.pdf' | relative_url }}" target="_blank">Homework 2: Ch06-09 Problems (PDF)</a> · <a href="{{ '/files/Intermediate%20Macroeconomics/homework2_solutions.pdf' | relative_url }}" target="_blank">Homework 2 Solutions (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Macroeconomics/homework3macro.pdf' | relative_url }}" target="_blank">Homework 3: Ch10-12 Problems (PDF)</a> · <a href="{{ '/files/Intermediate%20Macroeconomics/hw3_combined.pdf' | relative_url }}" target="_blank">Homework 3 Solutions (PDF)</a></li>
      <li><a href="{{ '/files/Intermediate%20Macroeconomics/ch13_ch14_ch15_combined_blank_space.pdf' | relative_url }}" target="_blank">Homework 4: Ch13-15 Problems (PDF)</a> · <a href="{{ '/files/Intermediate%20Macroeconomics/ch13_ch14_ch15_detailed_solutions_bilingual.pdf' | relative_url }}" target="_blank">Homework 4 Bilingual Solutions (PDF)</a></li>
    </ul>
  </div>
</details>

<!-- Course 3 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      Applied Statistics
      <span class="course-meta">School of Mathematics and Statistics · Fall 2025 · Taught by Prof. Ma</span>
    </div>
  </summary>
  <div class="course-body">
    <h6>Chapter Notes</h6>
    <ul>
      <li><a href="{{ '/files/Introduction_Applied_Statistics.pdf' | relative_url }}" target="_blank">Course Introduction (PDF)</a></li>
      <li><a href="{{ '/files/Graphical_descriptive_techniques_notes.pdf' | relative_url }}" target="_blank">Chapter I: Graphical Descriptive Techniques (PDF)</a></li>
      <li><a href="{{ '/files/Summary_statistics_notes.pdf' | relative_url }}" target="_blank">Chapter II: Summary Statistics (PDF)</a></li>
      <li><a href="{{ '/files/Data_collection_notes.pdf' | relative_url }}" target="_blank">Chapter III: Data Collection (PDF)</a></li>
      <li><a href="{{ '/files/Sampling_distributions_notes.pdf' | relative_url }}" target="_blank">Chapter IV: Sampling Distributions (PDF)</a></li>
      <li><a href="{{ '/files/Introduction_to_estimation_notes.pdf' | relative_url }}" target="_blank">Chapter V: Estimation (PDF)</a></li>
      <li><a href="{{ '/files/Introduction_to_hypothesis_testing_notes.pdf' | relative_url }}" target="_blank">Chapter VI: Hypothesis Testing (PDF)</a></li>
      <li><a href="{{ '/files/One_sample_inference_notes.pdf' | relative_url }}" target="_blank">Chapter VII: One-Sample Inference (PDF)</a></li>
      <li><a href="{{ '/files/Inference_about_Two_Populations.pdf' | relative_url }}" target="_blank">Chapter VIII: Inference for Two Populations (PDF)</a></li>
      <li><a href="{{ '/files/Rank_test.pdf' | relative_url }}" target="_blank">Chapter IX: Rank Sum Tests (PDF)</a></li>
      <li><a href="{{ '/files/Resampling_Methods_Bootstrap_and_Permutation.pdf' | relative_url }}" target="_blank">Chapter X: Resampling Methods: Bootstrap & Permutation (PDF)</a></li>
    </ul>
  </div>
</details>

<!-- Course 4 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      Financial Markets & Institutions
      <span class="course-meta">Jinhe Center for Economic Research · Spring 2026 · Taught by Prof. Zhou</span>
    </div>
  </summary>
  <div class="course-body">
    <p><strong>Textbook:</strong> Anthony Saunders & Marcia Millon Cornett, <em>Financial Markets and Institutions</em>.</p>
    
    <h6>Lecture Notes</h6>
    <ul>
      <li><a href="{{ '/files/Financial%20Institution/financial_markets_notes.pdf' | relative_url }}" target="_blank">The Subprime Mortgage Crisis & Policy Responses (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/financial_markets_notes_part2.pdf' | relative_url }}" target="_blank">Financial Markets, Interest Rates & The Federal Reserve (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/financial_markets_notes_part3.pdf' | relative_url }}" target="_blank">Money, Bond, Mortgage & Foreign Exchange Markets (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/financial_markets_notes_part4.pdf' | relative_url }}" target="_blank">Stock & Derivatives Markets (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/financial_markets_notes_part5.pdf' | relative_url }}" target="_blank">Hong Kong Linked Exchange Rate System & 1998 Defense (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/financial_markets_notes_part6.pdf' | relative_url }}" target="_blank">Asset Valuation & Technical Analysis (PDF)</a></li>
    </ul>

    <h6>Textbook Problem Solutions</h6>
    <ul>
      <li><a href="{{ '/files/Financial%20Institution/answers_ch1_ch2.pdf' | relative_url }}" target="_blank">Solutions Ch01 - Ch02: Financial Markets (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/answers_ch3_ch4.pdf' | relative_url }}" target="_blank">Solutions Ch03 - Ch04: Interest Rates & Fed Policy (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/answers_ch5_ch6.pdf' | relative_url }}" target="_blank">Solutions Ch05 - Ch06: Money & Bond Markets (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/answers_ch7_ch8.pdf' | relative_url }}" target="_blank">Solutions Ch07 - Ch08: Mortgage & Stock Markets (PDF)</a></li>
      <li><a href="{{ '/files/Financial%20Institution/answers_ch9_ch10.pdf' | relative_url }}" target="_blank">Solutions Ch09 - Ch10: FX & Derivatives (PDF)</a></li>
    </ul>
  </div>
</details>

<!-- Course 5 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      Principles of Finance
      <span class="course-meta">Jinhe Center for Economic Research · Spring 2026 · Taught by Prof. Zhao</span>
    </div>
  </summary>
  <div class="course-body">
    <h6>Study Guides</h6>
    <ul>
      <li><a href="{{ '/files/Principles%20of%20Finance/finance_review_notes.pdf' | relative_url }}" target="_blank">Corporate Finance Review Notes (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/知识要点+金融学原理.docx' | relative_url }}" target="_blank">Review Points & Problem Set (DOCX)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/1.0%20金融学原理名词汇总.doc' | relative_url }}" target="_blank">Finance Principles Terms Summary (DOC)</a></li>
    </ul>

    <h6>Chapter Q&A Exercises</h6>
    <ul>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH01_公司理财导论_练习答题与详细题解.pdf' | relative_url }}" target="_blank">CH01: Introduction to Corporate Finance (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH04_资本预算的其他方法_QA_练习答题与详细题解.pdf' | relative_url }}" target="_blank">CH04: Capital Budgeting Methods (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH05_金融市场与NPV_练习答题与详细题解.pdf' | relative_url }}" target="_blank">CH05: Financial Markets & NPV (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH06_练习答题与详细题解.pdf' | relative_url }}" target="_blank">CH06: Capital Market History (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH07_CAPM_QA_练习答题与详细题解.pdf' | relative_url }}" target="_blank">CH07: CAPM (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH08_资产定价模型_练习答题与详细题解.pdf' | relative_url }}" target="_blank">CH08: Asset Pricing Models (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH10_租赁_练习答题与详细题解.pdf' | relative_url }}" target="_blank">CH10: Lease Financing (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_EMH_QA_练习答题与详细题解.pdf' | relative_url }}" target="_blank">Efficient Market Hypothesis (EMH) Part I (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_CH12_EMH_有效市场假说_练习答题与详细题解.pdf' | relative_url }}" target="_blank">CH12: Efficient Market Hypothesis Part II (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_WACC_QA_练习答题与详细题解.pdf' | relative_url }}" target="_blank">Weighted Average Cost of Capital (WACC) (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_MM_QA_练习答题与详细题解.pdf' | relative_url }}" target="_blank">MM Theorem Part I (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_MM_Limits_QA_练习答题与详细题解.pdf' | relative_url }}" target="_blank">MM Theorem Part II (PDF)</a></li>
      <li><a href="{{ '/files/Principles%20of%20Finance/公司理财_Dividends_QA_练习答题与详细题解.pdf' | relative_url }}" target="_blank">Dividend Policy (PDF)</a></li>
    </ul>
  </div>
</details>

<!-- Course 6 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      Principles of Accounting
      <span class="course-meta">Jinhe Center for Economic Research · Fall 2025 · Taught by Prof. Wu</span>
    </div>
  </summary>
  <div class="course-body">
    <h6>Chapter Notes</h6>
    <ul>
      <li><a href="{{ '/files/Chapter1.pdf' | relative_url }}" target="_blank">Chapter I: Introduction to Financial Statements (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_2.pdf' | relative_url }}" target="_blank">Chapter II: Further Look at Financial Statements (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_3.pdf' | relative_url }}" target="_blank">Chapter III: Accounting Information System (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_4.pdf' | relative_url }}" target="_blank">Chapter IV: Accrual Accounting Concepts (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_5.pdf' | relative_url }}" target="_blank">Chapter V: Merchandising Operations & Income Statement (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_6.pdf' | relative_url }}" target="_blank">Chapter VI: Reporting & Analyzing Inventory (PDF)</a></li>
      <li><a href="{{ '/files/Chapter%207.pdf' | relative_url }}" target="_blank">Chapter VII: Fraud, Internal Control, and Cash (PDF)</a></li>
      <li><a href="{{ '/files/Chapter%208.pdf' | relative_url }}" target="_blank">Chapter VIII: Receivables (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_9.pdf' | relative_url }}" target="_blank">Chapter IX: Long-Lived Assets (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_10.pdf' | relative_url }}" target="_blank">Chapter X: Liabilities (PDF)</a></li>
      <li><a href="{{ '/files/Chapter_11.pdf' | relative_url }}" target="_blank">Chapter XI: Stockholders' Equity (PDF)</a></li>
    </ul>
  </div>
</details>

<!-- Course 7 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      Principles of Economics (Macroeconomics)
      <span class="course-meta">Jinhe Center for Economic Research · Fall 2025 · Taught by Prof. Kuo</span>
    </div>
  </summary>
  <div class="course-body">
    <h6>Foundational Chapters</h6>
    <ul>
      <li><a href="{{ '/files/Chapter1%20(1).pdf' | relative_url }}" target="_blank">Chapter 1: Foundations (English) (PDF)</a> · <a href="{{ '/files/Chapter1_Simplified_Chinese.pdf' | relative_url }}" target="_blank">Chapter 1: Foundations (Chinese) (PDF)</a></li>
      <li><a href="{{ '/files/national_income_theory.pdf' | relative_url }}" target="_blank">National Income Theory: Ch 1-3 (PDF)</a></li>
      <li><a href="{{ '/files/经济管理概论.pdf' | relative_url }}" target="_blank">Economic Management Overview (PDF)</a></li>
    </ul>

    <h6>Macroeconomic Models</h6>
    <ul>
      <li><a href="{{ '/files/物价指数笔记.pdf' | relative_url }}" target="_blank">Price Indices & Inflation (PDF)</a></li>
      <li><a href="{{ '/files/宏观框架笔记.pdf' | relative_url }}" target="_blank">Macroeconomic Framework (PDF)</a> · <a href="{{ '/files/通胀框架笔记.pdf' | relative_url }}" target="_blank">Inflation Framework (PDF)</a></li>
      <li><a href="{{ '/files/一般均衡笔记.pdf' | relative_url }}" target="_blank">General Equilibrium Foundations (PDF)</a></li>
      <li><a href="{{ '/files/家庭公司循环.pdf' | relative_url }}" target="_blank">Household-Firm Circular Flow (PDF)</a></li>
    </ul>

    <h6>Money, Banking & Finance</h6>
    <ul>
      <li><a href="{{ '/files/货币需求与流通速度笔记.pdf' | relative_url }}" target="_blank">Money Demand & Velocity (PDF)</a></li>
      <li><a href="{{ '/files/货币供给笔记.pdf' | relative_url }}" target="_blank">Money Supply Mechanics (PDF)</a></li>
      <li><a href="{{ '/files/商业银行笔记.pdf' | relative_url }}" target="_blank">Commercial Banking (Lecture 12) (PDF)</a></li>
      <li><a href="{{ '/files/货币波动和政策笔记.pdf' | relative_url }}" target="_blank">Monetary Fluctuations & Policy (Lecture 11) (PDF)</a></li>
      <li><a href="{{ '/files/baumol模型笔记.pdf' | relative_url }}" target="_blank">Baumol-Tobin Cash Inventory Model (PDF)</a> · <a href="{{ '/files/baumol模型与铸币费.pdf' | relative_url }}" target="_blank">Baumol Model & Seigniorage (PDF)</a></li>
      <li><a href="{{ '/files/铸币费与通胀税笔记.pdf' | relative_url }}" target="_blank">Seigniorage & Inflation Tax (PDF)</a></li>
      <li><a href="{{ '/files/保值债笔记.pdf' | relative_url }}" target="_blank">TIPS Securities (PDF)</a></li>
      <li><a href="{{ '/files/金本位现钞笔记.pdf' | relative_url }}" target="_blank">Gold Standard Discussion (PDF)</a> · <a href="{{ '/files/金币经济笔记.pdf' | relative_url }}" target="_blank">Gold Currency Economics (PDF)</a></li>
      <li><a href="{{ '/files/汇率笔记1.pdf' | relative_url }}" target="_blank">Exchange Rate Mechanics (PDF)</a> · <a href="{{ '/files/国际金融笔记.pdf' | relative_url }}" target="_blank">International Monetary Economics (PDF)</a></li>
      <li><a href="{{ '/files/MEC笔记.pdf' | relative_url }}" target="_blank">Marginal Efficiency of Capital (MEC) (PDF)</a></li>
    </ul>

    <h6>Problem Sets</h6>
    <ul>
      <li><a href="{{ '/files/经济学原理习题.pdf' | relative_url }}" target="_blank">Principles of Economics Exercise Set 1 (PDF)</a> · <a href="{{ '/files/习题2.pdf' | relative_url }}" target="_blank">Exercise Set 2 (PDF)</a></li>
    </ul>
  </div>
</details>

<!-- Course 8 -->
<details class="course-card">
  <summary class="course-title">
    <div>
      Additional Lecture Notes
      <span class="course-meta">Independent Study Notes · Spring 2026</span>
    </div>
  </summary>
  <div class="course-body">
    <ul>
      <li><a href="{{ '/files/AI4LearningEcon/math4econ.pdf' | relative_url }}" target="_blank">Mathematical Analysis for Economics & Finance (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/经济与金融研究的数理方法.pdf' | relative_url }}" target="_blank">Mathematical Methods in Economic & Financial Research (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/ai4econ.pdf' | relative_url }}" target="_blank">AI Applications in Economics & Finance (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/经济增长.pdf' | relative_url }}" target="_blank">Economic Growth Theory (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/产业组织学.pdf' | relative_url }}" target="_blank">Industrial Organization (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/高级微观经济学.pdf' | relative_url }}" target="_blank">Advanced Microeconomic Theory (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/高级宏观经济学.pdf' | relative_url }}" target="_blank">Advanced Macroeconomic Theory (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/计量经济学.pdf' | relative_url }}" target="_blank">Econometric Methods (PDF)</a></li>
      <li><a href="{{ '/files/AI4LearningEcon/game-theory-textbook.pdf' | relative_url }}" target="_blank">Game Theory & Information Economics (PDF)</a></li>
    </ul>
  </div>
</details>
