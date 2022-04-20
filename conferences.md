---
layout: page
title: Konferenzen
description: Konferenzen, bei denen ich regelmässig auftrete ...
permalink: /conferences/
---

{% assign all_seasons =  site.data.conferences | map: "season" | uniq %}

{% for season in all_seasons %}
<h2>{{ season }}</h2>
<ul>
{% assign conferences =  site.data.conferences | where: "season", season %}
{% for conference in conferences %}
<li><a href="{{ conference.url }}">{{ conference.name }}</a> ({{ conference.location }}) <img style="height:1em" src="/assets/images/conferences/{{ conference.id }}.png" alt="{{ conference.name }}" /></li>
{% endfor %}
</ul>
{% endfor %}
