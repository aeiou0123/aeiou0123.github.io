---
layout: page
title: projects
permalink: /projects/
description: Applied quantitative tools and open-source course notes.
nav: true
nav_order: 3
horizontal: true
---

<!-- pages/projects.md -->
<div class="projects">

{% assign sorted_projects = site.projects | sort: "importance" %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>

</div>
