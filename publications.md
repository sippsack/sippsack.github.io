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
            {% for publication in month[1] %}
    <li{% if publication.highlight %} style="background: #fff6d6; border-left: 4px solid #f0b400; padding: 0.4em 0.6em;"{% endif %}>{{ month[0] }} {{ year[0] }}: "{% if publication.link %}<a href="{{ publication.link }}">{% endif %}{{ publication.title }}{% if publication.link %}</a>{% else %}{{ publication.title }}{% endif %}" ({{ publication.publisher }}){% if publication.pdf %} <a class="icon" href="{{ publication.pdf }}"><i title="PDF" class="fa-solid fa-file-pdf" aria-hidden="true"></i></a>{% elsif publication.link %} <a class="icon" href="{{ publication.link }}"><i title="Artikel online" class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>{% endif %}{% if publication.highlight %}<br><i class="fa-solid fa-trophy" aria-hidden="true"></i> <strong>{% if publication.highlight_link %}<a href="{{ publication.highlight_link }}">{{ publication.highlight }}</a>{% else %}{{ publication.highlight }}{% endif %}</strong>{% endif %}
	</li>            
            {% endfor %}
        {% endfor %}
    {% endfor %}
</ul>
{% endfor %}
