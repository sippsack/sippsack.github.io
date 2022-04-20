---
layout: page
title: Konferenzen
description: Konferenzen, bei denen ich regelmässig auftrete ...
permalink: /conferences/
---

{% for season in site.data.conferences %}
<h2>{{ season[0] }}</h2>
<ul>
{% for conference in season[1] %}
<li><a href="{{ conference.url }}">{{ conference.name }}</a> ({{ conference.location }}) <img style="height:1em" src="/assets/images/conferences/{{ conference.id }}.png" alt="{{ conference.name }}" /></li>
{% endfor %}
</ul>
{% endfor %}
