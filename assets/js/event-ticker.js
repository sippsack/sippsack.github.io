(function() {
	'use strict';

	var ticker = document.getElementById('events');
	if (!ticker) return;

	var allItems = Array.prototype.slice.call(ticker.querySelectorAll('.event-ticker-item'));
	var items = [];
	var pageSize = 2;

	var controls = ticker.querySelector('.event-ticker-controls');
	var pauseButton = ticker.querySelector('[data-ticker="pause"]');
	var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	var paused = reducedMotion.matches;
	var page = 0;
	var pageCount = 0;
	var timer;
	var dayTimer;

	function today() {
		var date = new Date();
		return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' +
			String(date.getDate()).padStart(2, '0');
	}

	function refreshEvents() {
		var currentDay = today();
		items = allItems.filter(function(item) {
			var dates = item.querySelectorAll('time[datetime]');
			return dates.length && dates[dates.length - 1].getAttribute('datetime') >= currentDay;
		});
		pageCount = Math.ceil(items.length / pageSize);
		page = Math.max(0, Math.min(page, pageCount - 1));
		ticker.hidden = items.length === 0;
		controls.hidden = items.length <= pageSize;
		render();
		schedule();

		window.clearTimeout(dayTimer);
		var tomorrow = new Date();
		tomorrow.setHours(24, 0, 0, 0);
		dayTimer = window.setTimeout(refreshEvents, tomorrow.getTime() - Date.now() + 100);
	}

	function render() {
		allItems.forEach(function(item) { item.hidden = true; });
		items.forEach(function(item, index) {
			item.hidden = Math.floor(index / pageSize) !== page;
		});
	}

	function schedule() {
		window.clearInterval(timer);
		if (items.length <= pageSize || paused || document.hidden || ticker.matches(':hover') || ticker.contains(document.activeElement)) return;
		timer = window.setInterval(function() {
			page = (page + 1) % pageCount;
			render();
		}, 8000);
	}

	function updatePauseButton() {
		pauseButton.querySelector('i').className = paused ? 'fa-solid fa-play' : 'fa-solid fa-pause';
		pauseButton.setAttribute('aria-pressed', String(paused));
		pauseButton.setAttribute('aria-label', paused ? 'Automatischen Wechsel starten' : 'Automatischen Wechsel pausieren');
	}

	controls.addEventListener('click', function(event) {
		var button = event.target.closest('button');
		if (!button) return;
		var action = button.getAttribute('data-ticker');
		if (action === 'pause') {
			paused = !paused;
			updatePauseButton();
		} else {
			page = Math.max(0, Math.min(pageCount - 1, page + (action === 'next' ? 1 : -1)));
			render();
		}
		schedule();
	});

	ticker.addEventListener('mouseenter', schedule);
	ticker.addEventListener('mouseleave', schedule);
	ticker.addEventListener('focusin', schedule);
	ticker.addEventListener('focusout', function() {
		window.setTimeout(schedule, 0);
	});
	document.addEventListener('visibilitychange', refreshEvents);
	reducedMotion.addEventListener('change', function(event) {
		paused = event.matches;
		updatePauseButton();
		schedule();
	});

	updatePauseButton();
	refreshEvents();
})();
