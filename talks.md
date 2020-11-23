---
layout: page
title: Vorträge
description: Auftritte bei Konferenzen und User Groups
permalink: /talks/
---

{% for year in site.data.talks %}
{% assign yearTalks = year[1] %}
<h2>{{ year[0] }} ({% include numberOfTalksPerYear.html year=yearTalks %})</h2>
    {% for months in year[1] %}
        {% for month in months %}
<h4>{{ month[0] }}</h4>
<ul class="talk-list">
        {% for talk in month[1] %}
		<li>{% if talk.canceled %}Abgesagt: {% endif %}{% if talk.link %}<a {% if talk.canceled %} style="text-decoration:line-through;"{% endif %} href="{{ talk.link }}">{% endif %}"<b>{{ talk.title }}</b>"{% if talk.link %}</a>{% endif %} ({{ talk.conference}}{% unless talk.conference contains talk.location %}, {{ talk.location }}{% endunless %}){% if talk.slides %} <a class="icon" href="{{ talk.slides }}"><i title="Folien" class="fa fa-slideshare" aria-hidden="true"></i></a>{% endif %}{% if talk.sourcecode %} <a class="icon" href="{{ talk.sourcecode }}"><i title="Sourcecode" class="fa fa-github" aria-hidden="true"></i></a>{% endif %}{% if talk.video %} <a class="icon" href="{{ talk.video }}"><i title="Video" class="fa fa-video-camera" aria-hidden="true"></i></a>{% endif %}</li>
        {% endfor %}
</ul>
        {% endfor %}
    {% endfor %}
{% endfor %}
