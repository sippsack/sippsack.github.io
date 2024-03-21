---
layout: page
title: Portfolio
description: Meine Vortragsthemen
permalink: /portfolio/
---

{% assign numberOfTalks = site.data.portfolio.talks | where: "type", "talk" | size %}
{% assign numberOfNewTalks = site.data.portfolio.talks | where: "type", "talk" | where: "relevant", "new" | size %}
{% assign numberOfCurrentTalks = site.data.portfolio.talks | where: "type", "talk" | where: "relevant", true | size %}
{% assign numberOfWorkshops = site.data.portfolio.talks | where: "type", "workshop" | size %}

{% assign categories = site.data.portfolio.categories %}

<p>Statistik: {{ numberOfTalks }} Vorträge ({{ numberOfNewTalks }} neu, {{ numberOfCurrentTalks }} aktuell) und {{ numberOfWorkshops }} Workshops
<br />
Kategorien: 
{% for category in categories %}
<i class="fa{% if category.id == 'java' or category.id == 'js'  %}-brands{% endif %} fa-{{ category.symbol }}" title="{{ category.name }}"></i> {{ category.name }} {% unless forloop.last %} | {% endunless %}
{% endfor %}
</p>

<p id="filter">Filter: <a href="#new" class="more scrolly">Ganz neu</a> | 
<a href="#current" class="more scrolly">Noch aktuell</a> |
<a href="#workshops" class="more scrolly">Workshops</a> |
<a href="#old" class="more scrolly">Alte Vorträge</a></p>

<h2 id="new">Ganz neu</h2>
Ideen für neue Vorträge bzw. Workshops, diese Themen sind teilweise schon auf Konferenzen eingereicht und ggf. auch angenommen, aber im Moment noch nicht fertig.

{% assign talks = site.data.portfolio.talks | where: "relevant", "new" %}

{% for talk in talks %}
  {% include portfolio-talk.html talk=talk %}
{% endfor %}

<a href="#filter" class="more scrolly"><i class="fa fa-up-long" title="Hoch"></i></a>

<h2 id="current">Vorhandene Vorträge</h2>
Die nachfolgenden Vorträge kann ich jederzeit bei Konferenzen oder User Groups halten, bei Interesse bitte melden.

{% assign talks = site.data.portfolio.talks | where: "relevant", true | where: "type", "talk" %}

{% for talk in talks %}
  {% include portfolio-talk.html talk=talk %}
{% endfor %}

<a href="#filter" class="more scrolly"><i class="fa fa-up-long" title="Hoch"></i></a>

<h2 id="workshops">Workshops</h2>

{% assign talks = site.data.portfolio.talks | where: "relevant", true | where: "type", "workshop" %}

{% for talk in talks %}
  {% include portfolio-talk.html talk=talk %}
{% endfor %}

<a href="#filter" class="more scrolly"><i class="fa fa-up-long" title="Hoch"></i></a>

<h2 id="old">Alte Vorträge</h2>
{% assign talks = site.data.portfolio.talks | where: "relevant", false %}
{% for talk in talks %}
  {% include portfolio-talk.html talk=talk %}
{% endfor %}

<a href="#filter" class="more scrolly"><i class="fa fa-up-long" title="Hoch"></i></a>
