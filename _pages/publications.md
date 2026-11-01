---
layout: page
permalink: /research/
title: research
description: Working papers, a course paper, and research experience.
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->
{% include bib_search.liquid %}

<div class="publications">

{% bibliography --query @*[showresearch=yes] %}

</div>
