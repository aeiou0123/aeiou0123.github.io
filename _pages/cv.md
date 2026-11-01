---
layout: page
permalink: /cv/
title: CV
nav: true
nav_order: 5
description: Curriculum vitae of Mengqi Wei.
---

<div class="mb-4">
  <a href="{{ '/assets/pdf/CV_Mengqi_Wei_EN.pdf' | relative_url }}" class="btn btn-sm btn-outline-primary mr-2">English CV (PDF)</a>
  <a href="{{ '/assets/pdf/CV_Mengqi_Wei_ZH.pdf' | relative_url }}" class="btn btn-sm btn-outline-secondary">中文简历 (PDF)</a>
</div>

{% assign cv = site.data.cv.cv %}
<h3>Education</h3>
{% for item in cv.sections.Education %}
<p><strong>{{ item.institution }}</strong><br>{{ item.area }} · {{ item.start_date | date: '%Y.%m' }} – {% if item.end_date == 'present' %}Present{% else %}{{ item.end_date | date: '%Y.%m' }}{% endif %}<br>{{ item.score }}</p>
{% endfor %}

<h3>Research interests</h3>
<ul>{% for item in cv.sections['Research Interests'] %}<li>{{ item.name }}</li>{% endfor %}</ul>

<h3>Research and project experience</h3>
{% for item in cv.sections['Research Experience'] %}
<div class="mb-4"><strong>{{ item.title }}</strong><br>{{ item.date }}<br>{{ item.authors | join: ', ' }}<p>{{ item.summary }}</p></div>
{% endfor %}

<h3>Professional experience</h3>
{% for item in cv.sections.Experience %}
<div class="mb-4"><strong>{{ item.company }}</strong><br>{{ item.position }} · {{ item.start_date | date: '%Y.%m' }} – {{ item.end_date | date: '%Y.%m' }}<ul>{% for highlight in item.highlights %}<li>{{ highlight }}</li>{% endfor %}</ul></div>
{% endfor %}

<h3>Coursework and academic preparation</h3>
{% for item in cv.sections['Selected Coursework'] %}<p><strong>{{ item.name }}:</strong> {{ item.summary }}</p>{% endfor %}

<h3>Honors and awards</h3>
<ul><li>National Scholarship, Ministry of Education · 2025–2026</li><li>Outstanding Student, Xi'an Jiaotong University · 2024–2026</li><li>First-Class Academic Scholarship, Xi'an Jiaotong University · 2024–2025</li><li>Statistical Modeling Competition, Shaanxi Provincial First Prize · 2026</li><li>Digital Business Simulation Sandbox Competition, National Third Prize · 2026</li></ul>

<h3>Skills and languages</h3>
{% for item in cv.sections.Skills %}<p><strong>{{ item.name }}:</strong> {{ item.keywords }}</p>{% endfor %}
