---
layout: page
title: Veröffentlichungen
description: Print-Magazine und Online-Plattformen
permalink: /publications/
---

{{ site.data.publications }}
<ul>
{% for publication in site.data.publications %}
    <li>
        {{publication.years | size}}
    </li>
{% endfor %}
</ul>

2014: Heise Developer  
2015: Heise Developer  
