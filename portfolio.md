---
layout: page
title: Portfolio
description: Meine Vortragsthemen
permalink: /portfolio/
---

[Aktuelle Vorträge](#current){:class="more scrolly"} |
[Alte Vorträge](#old){:class="more scrolly"} | 
[Workshops](#workshops){:class="more scrolly"} | 
[Bio](#bio){:class="more scrolly"} | 
[Links](#links){:class="more scrolly"} | 
[Fotos](#photos){:class="more scrolly"}

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

<h2 id="bio">Bio</h2>
<ul class="talk-list">
<li>{{ site.data.portfolio.bio }}</li>
<li>{{ site.data.portfolio.bio_en }}</li>
</ul>

<h2 id="links">Links</h2>
<ul class="talk-list">
{% for link in site.data.portfolio.links %}
  <li>{{ link[0] }}: 
  {% if link[1].first %}
    <ul style="margin: 0;" class="talk-list">
    {% for sublink in link[1] %}
      <li><a href="{{ sublink }}" >{{ sublink }}</a></li>
    {% endfor %}
    </ul>
  {% else %}
	  <a href="{{ link[1] }}" >{{ link[1] }}</a>
  {% endif %}
  </li>
{% endfor %}
</ul>

<h2 id="photos">Fotos</h2>
{% for photo in site.data.portfolio.photos %}
<h4>{{ photo[0] }}</h4>
<img src="{{photo[1]}}" />
{% endfor %}
