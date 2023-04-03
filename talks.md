---
layout: page
title: Vorträge
description: Auftritte bei Konferenzen und User Groups
permalink: /talks/
---

{% assign conferences = site.data.conferences | map: "id" | uniq %}

{% for year in site.data.talks %}
{% assign yearTalks = year[1] %}
<h2>{{ year[0] }} ({% include numberOfTalksPerYear.html year=yearTalks %})</h2>
    {% for months in year[1] %}
        {% for month in months %}
<h4>{{ month[0] }}</h4>
<ul class="talk-list">
        {% for talk in month[1] %}
        {% assign id = "" | append: year[0] | append: "-" | append: month[0] | append: "-" | append: forloop.index %}
        {% include talk.html talk=talk conferences=conferences id=id %}
        {% endfor %}
</ul>
        {% endfor %}
    {% endfor %}
{% endfor %}
