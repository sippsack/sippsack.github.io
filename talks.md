---
layout: page
title: Vorträge
description: Auftritte bei Konferenzen und User Groups
permalink: /talks/
---

<h2>Aktivitäten</h2>
<ul class="talk-list">
    <li>Co-Organisator <a href="http://www.jug-da.de/about/">Java User Group Darmstadt</a> seit 2013</li>
    <li>Programmkomitee <a href="http://www.javaland.eu/">Javaland</a> seit 2013</li>
    <li>Unterstützung Programmbeirat <a href="https://entwicklertag.de/">Entwicklertag Frankfurt</a> seit 2014</li>
    <li>Programmkomitee <a href="https://www.herbstcampus.de/konferenz_programmkomitee.php">Herbstcampus</a> seit 2016</li>
    <li>Mitglied im Advisory Board der <a href="http://www.jax.de/">JAX</a> seit 2016</li>
    <li>Mitglied im Kuratorium der <a href="https://www.ittage.informatik-aktuell.de/konferenz/kuratorium/">IT-Tage 2017</a></li>
</ul>


{% for year in site.data.talks %}
<h2>{{ year[0] }} ({{ year[1] | size }})</h2>
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
