(function() {
	'use strict';

	var root = document.getElementById('site-search');
	if (!root) return;
	var input = document.getElementById('search-query');
	var type = document.getElementById('search-type');
	var status = document.getElementById('search-status');
	var results = document.getElementById('search-results');
	var base = root.dataset.baseurl;
	var entries = [];
	var ready = false;
	var failed = false;
	var matches = [];
	var debounce;
	var started = false;
	var opener;

	document.querySelectorAll('[data-open-search]').forEach(function(button) {
		button.addEventListener('click', function() {
			opener = button;
			document.body.classList.remove('is-menu-visible');
			root.showModal();
			document.body.classList.add('is-search-open');
			input.focus();
			if (!started) {
				started = true;
				loadEntries();
			}
		});
	});
	document.getElementById('search-close').addEventListener('click', function() { root.close(); });
	root.addEventListener('click', function(event) {
		var rect = root.getBoundingClientRect();
		if (event.target === root && (event.clientX < rect.left || event.clientX > rect.right ||
			event.clientY < rect.top || event.clientY > rect.bottom)) root.close();
	});
	root.addEventListener('close', function() {
		document.body.classList.remove('is-search-open');
		if (opener) {
			var target = opener.closest('#menu') ? document.querySelector('#header [data-open-search]') : opener;
			target.focus();
		}
	});

	function normalize(text) {
		return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss');
	}

	function text(node) {
		return node.textContent.replace(/\s+/g, ' ').trim();
	}

	function add(title, body, kind, url) {
		if (!title) return;
		entries.push({title: title, body: body, kind: kind, url: url,
			search: normalize(title + ' ' + body), searchTitle: normalize(title)});
	}

	async function load(path) {
		var response = await fetch(base + path);
		if (!response.ok) throw new Error(path + ': HTTP ' + response.status);
		return new DOMParser().parseFromString(await response.text(), 'text/html');
	}

	function appendHighlighted(parent, value, words) {
		// Keep original character positions even when normalization expands characters.
		var normalized = '';
		var positions = [];
		var offset = 0;
		Array.from(value).forEach(function(character) {
			var part = normalize(character);
			for (var i = 0; i < part.length; i++) positions.push({start: offset, end: offset + character.length});
			normalized += part;
			offset += character.length;
		});
		var ranges = [];
		words.forEach(function(word) {
			var from = 0;
			var at;
			while ((at = normalized.indexOf(word, from)) !== -1) {
				ranges.push({start: positions[at].start, end: positions[at + word.length - 1].end});
				from = at + word.length;
			}
		});
		ranges.sort(function(a, b) { return a.start - b.start; });
		var merged = [];
		ranges.forEach(function(range) {
			var previous = merged[merged.length - 1];
			if (previous && range.start <= previous.end) previous.end = Math.max(previous.end, range.end);
			else merged.push(range);
		});
		offset = 0;
		merged.forEach(function(range) {
			parent.append(document.createTextNode(value.slice(offset, range.start)));
			var mark = document.createElement('mark');
			mark.textContent = value.slice(range.start, range.end);
			parent.append(mark);
			offset = range.end;
		});
		parent.append(document.createTextNode(value.slice(offset)));
	}

	function words() {
		return normalize(input.value.trim()).split(/\s+/).filter(Boolean);
	}

	function renderResults() {
		var query = words();
		matches.forEach(function(entry) {
			var li = document.createElement('li');
			var heading = document.createElement('h3');
			var link = document.createElement('a');
			link.href = entry.url;
			appendHighlighted(link, entry.title, query);
			heading.append(link);
			var meta = document.createElement('p');
			meta.className = 'search-result-meta';
			meta.textContent = entry.kind;
			var excerpt = document.createElement('p');
			var at = normalize(entry.body).indexOf(query[0]);
			var start = Math.max(0, at - 70);
			var snippet = entry.body.slice(start, start + 260);
			appendHighlighted(excerpt, (start ? '… ' : '') + snippet + (start + 260 < entry.body.length ? ' …' : ''), query);
			li.append(heading, meta, excerpt);
			results.append(li);
		});
	}

	function search() {
		results.replaceChildren();
		var query = words();
		if (failed) return;
		if (!ready) {
			status.textContent = 'Suchdaten werden geladen …';
			return;
		}
		if (!query.length) {
			status.textContent = 'Gib einen Suchbegriff ein.';
			return;
		}
		matches = entries.filter(function(entry) {
			return (!type.value || entry.kind === type.value) && query.every(function(word) { return entry.search.includes(word); });
		}).sort(function(a, b) {
			function score(entry) {
				return query.reduce(function(total, word) { return total + (entry.searchTitle.includes(word) ? 1 : 0); }, 0);
			}
			return score(b) - score(a) || a.title.localeCompare(b.title, 'de');
		});
		status.textContent = matches.length ? matches.length + ' Treffer' : 'Keine Treffer. Versuche andere oder weniger Suchbegriffe.';
		renderResults();
	}

	document.getElementById('search-form').addEventListener('submit', function(event) {
		event.preventDefault();
		clearTimeout(debounce);
		search();
	});
	input.addEventListener('input', function() {
		clearTimeout(debounce);
		debounce = setTimeout(search, 150);
	});
	type.addEventListener('change', search);
	function loadEntries() {
		status.textContent = 'Suchdaten werden geladen …';

	Promise.all([load('/portfolio/'), load('/talks/'), load('/publications/')]).then(function(pages) {
		pages[0].querySelectorAll('#main .inner > div[id]').forEach(function(node) {
			var title = node.querySelector('h4 span');
			if (!title) return;
			var heading = node.querySelector('h4');
			add(text(title), text(node), text(heading).includes('Workshop:') ? 'Workshop' : 'Vortragsthema',
				base + '/portfolio/#' + encodeURIComponent(node.id));
		});
		pages[1].querySelectorAll('#main .talk-list > li[id]').forEach(function(node) {
			var title = node.querySelector('b');
			if (!title) return;
			add(text(title), text(node), 'Auftritt', base + '/talks/#' + encodeURIComponent(node.id));
		});
		pages[2].querySelectorAll('#main .talk-list > li').forEach(function(node) {
			var link = node.querySelector('a:not(.icon)');
			var title = link ? text(link) : text(node);
			if (!title) return;
			var target = base + '/publications/';
			if (link) {
				var url = new URL(link.getAttribute('href'), location.origin + base + '/publications/');
				if (url.protocol === 'https:' || url.protocol === 'http:') target = url.href;
			}
			add(title, text(node), 'Artikel', target);
		});
		ready = true;
		search();
	}).catch(function(error) {
		failed = true;
		console.error('Suchdaten konnten nicht geladen werden:', error);
		status.textContent = 'Die Suchdaten konnten nicht geladen werden. Bitte lade die Seite erneut.';
	});
	}
})();
