---
layout: page
title: Veröffentlichungen
description: Print-Magazine und Online-Plattformen
permalink: /publications/
---

{% for year in site.data.publications %}
<h2>{{ year[0] }}</h2>
<ul class="talk-list">
    {% for months in year[1] %}
        {% for month in months %}
            {% for talk in month[1] %}
    <li>{{ month[0] }} {{ year[0] }}: "{% if talk.link %}<a href="{{ talk.link }}">{% endif %}{{ talk.title }}{% if talk.link %}</a>{% else %}{{ talk.link }}{% endif %}" ({{ talk.publisher }})</li>            
            {% endfor %}
        {% endfor %}
    {% endfor %}
</ul>
{% endfor %}
