---
layout: page
title: Portfolio
description: Meine Vortragsthemen
permalink: /portfolio/
---

[Aktuelle Vorträge](#current){:class="more scrolly"} \|
[Alte Vorträge](#old){:class="more scrolly"} \| 
[Workshops](#workshops){:class="more scrolly"} 

<h2 id="current">Aktuelle Vorträge</h2>
Die nachfolgenden Vorträge kann ich jederzeit bei Konferenzen oder User Groups halten, bei Interesse bitte melden.

{% for talk in site.data.portfolio.talks.current %}
<b>{{ talk[0] }}</b>
<p>{{ talk[1] | markdownify }}</p>
{% endfor %}

<h2 id="old">Alte Vorträge</h2>
{% for talk in site.data.portfolio.talks.old %}
<b>{{ talk[0] }}</b>
<p>{{ talk[1] | markdownify }}</p>
{% endfor %}

<h2 id="workshops">Workshops</h2>
{% for year in site.data.portfolio.workshops %}
  {% for workshop in year[1] %}
<b>{{ workshop.title }} ({{ year[0] }})</b>
<p>{{ workshop.abstract | markdownify }}</p>
<p>Dauer: {{ workshop.length }}, Co-Moderatoren: {{ workshop.co-speaker }}</p>
  {% endfor %}
{% endfor %}
