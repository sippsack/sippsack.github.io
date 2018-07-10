---
layout: page
title: Vorträge
description: Auftritte bei Konferenzen und User Groups
permalink: /talks/
---

<h2>Aktivitäten</h2>
<ul class="talk-list">
{% for activity in site.data.portfolio.activities %}
	<li><a href="{{ activity.link }}">{{ activity.event }}</a>: {{ activity.activity }} seit {{ activity.since }}</li>
{% endfor %}
</ul>



{% for year in site.data.talks %}
{% assign yearTalks = year[1] %}
<h2>{{ year[0] }} ({% include numberOfTalksPerYear.html year=yearTalks %})</h2>
<ul class="talk-list">
    {% for months in year[1] %}
        {% for month in months %}
            {% for talk in month[1] %}
        <li>{{ month[0] }} {{ year[0] }}: {% if talk.link %}<a href="{{ talk.link }}">{% endif %}"{{ talk.title }}"{% if talk.link %}</a>{% endif %} ({{ talk.conference}}{% unless talk.conference contains talk.location %}, {{ talk.location }}{% endunless %}){% if talk.slides %} <a class="icon" href="{{ talk.slides }}"><i title="Folien" class="fa fa-slideshare" aria-hidden="true"></i></a>{% endif %}{% if talk.sourcecode %} <a class="icon" href="{{ talk.sourcecode }}"><i title="Sourcecode" class="fa fa-github" aria-hidden="true"></i></a>{% endif %}{% if talk.video %} <a class="icon" href="{{ talk.video }}"><i title="Video" class="fa fa-video-camera" aria-hidden="true"></i></a>{% endif %}</li>
            {% endfor %}
        {% endfor %}
    {% endfor %}
</ul>
{% endfor %}
