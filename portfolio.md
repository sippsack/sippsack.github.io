---
layout: page
title: Portfolio
description: Meine Vortragsthemen
permalink: /portfolio/
---

<h2>Aktuelle Vorträge</h2>
Die nachfolgenden Vorträge kann ich jederzeit bei Konferenzen oder User Groups halten, bei Interesse bitte melden.

{% for talk in site.data.portfolio.talks.current %}
<b>{{ talk[0] }}</b>
<p>{{ talk[1] }}</p>
{% endfor %}

<h2>Alte Vorträge</h2>
{% for talk in site.data.portfolio.talks.old %}
<b>{{ talk[0] }}</b>
<p>{{ talk[1] }}</p>
{% endfor %}

<h2>Workshops</h2>
{% for year in site.data.portfolio.workshops %}
  {% for workshop in year[1] %}
<b>{{ workshop.title }} ({{ year[0] }})</b>
<p>{{ workshop.abstract }}</p>
<p>Dauer: {{ workshop.length }}, Co-Moderatoren: {{ workshop.co-speaker }}</p>
  {% endfor %}
{% endfor %}

<h2 id="bio">Bio</h2>
<ul class="talk-list">
<li>{{ site.data.portfolio.bio }}</li>
<li>{{ site.data.portfolio.bio_en }}</li>
</ul>

<h2 id="links">Links</h2>
<ul class="talk-list">
{% for link in site.data.portfolio.links %}
	<li>{{ link[0] }}: <a href="{{ link[1] }}" >{{ link[1] }}</a></li>
{% endfor %}
</ul>

<h2 id="photos">Fotos</h2>
{% for photo in site.data.portfolio.photos %}
<h4>{{ photo[0] }}</h4>
<img src="{{photo[1]}}" />
{% endfor %}
