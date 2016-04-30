---
layout: page
title: Vorträge
description: Konferenzauftritte
permalink: /talks/
---

{% for year in site.data.talks %}
<h2>{{ year[0] }}</h2>
<ul class="talk-list">
    {% for months in year[1] %}
        {% for month in months %}
            {% for talk in month[1] %}
        <li>{{ month[0] }} {{ year[0] }}: {% if talk.link %}<a href="{{ talk.link }}">{% endif %}"{{ talk.title }}"{% if talk.link %}</a>{% endif %} ({{ talk.conference}}{% unless talk.conference contains talk.location %}, {{ talk.location }}{% endunless %}){% if talk.slides %} <a href="{{ talk.slides }}"><img src="{{ site.baseurl }}/images/slides.png"></a>{% endif %}{% if talk.video %} <a href="{{ talk.video }}"><img src="{{ site.baseurl }}/images/youtube.png"></a>{% endif %}</li>
            {% endfor %}
        {% endfor %}
    {% endfor %}
</ul>
{% endfor %}
