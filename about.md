---
layout: page
title: Über mich und meine Aktivitäten
description: Aktivitäten bei Konferenzen, User Groups und Vereinen
permalink: /about/
---

[Bio](#bio){:class="more scrolly"} | 
[Aktivitäten](#activities){:class="more scrolly"} | 
[Links](#links){:class="more scrolly"} | 
[Fotos](#photos){:class="more scrolly"}

<h2 id="bio">Bio</h2>
<ul class="talk-list">
<li>{{ site.data.about.bio }}</li>
<li>{{ site.data.about.bio_en }}</li>
</ul>

<h2 id="activities">Aktivitäten</h2>
<ul class="talk-list">
{% for activity in site.data.about.activities %}
	<li><a href="{{ activity.link }}">{{ activity.event }}</a>: {{ activity.activity }} seit {{ activity.since }}</li>
{% endfor %}
</ul>

<h2 id="links">Links</h2>
<ul class="talk-list">
{% for link in site.data.about.links %}
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
{% for photo in site.data.about.photos %}
<h4>{{ photo[0] }}</h4>
{% if photo[1].show %}
{% for img in photo[1].images %}<img style="margin:10px;" src="{{img}}" alt="{{img}}" />{% endfor %}
{% else %}
{% for img in photo[1].images %}[Download {{img}}]({{img}})<br/>{% endfor %}
{% endif %}
{% endfor %}
