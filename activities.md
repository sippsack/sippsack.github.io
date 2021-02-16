---
layout: page
title: Aktivitäten
description: Aktivitäten bei Konferenzen und User Groups
permalink: /activities/
---

<h2>Aktivitäten</h2>
<ul class="talk-list">
{% for activity in site.data.portfolio.activities %}
	<li><a href="{{ activity.link }}">{{ activity.event }}</a>: {{ activity.activity }} seit {{ activity.since }}</li>
{% endfor %}
</ul>