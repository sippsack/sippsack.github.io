(function() {
	'use strict';

	var ticker = document.getElementById('events');
	if (!ticker) return;

	var items = Array.prototype.slice.call(ticker.querySelectorAll('.event-ticker-item'));
	var pageSize = 2;
	if (items.length <= pageSize) return;

	var controls = ticker.querySelector('.event-ticker-controls');
	var pauseButton = ticker.querySelector('[data-ticker="pause"]');
	var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	var paused = reducedMotion.matches;
	var page = 0;
	var pageCount = Math.ceil(items.length / pageSize);
	var timer;

	function render() {
		items.forEach(function(item, index) {
			item.hidden = Math.floor(index / pageSize) !== page;
		});
	}

	function schedule() {
		window.clearInterval(timer);
		if (paused || document.hidden || ticker.matches(':hover') || ticker.contains(document.activeElement)) return;
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
	document.addEventListener('visibilitychange', schedule);
	reducedMotion.addEventListener('change', function(event) {
		paused = event.matches;
		updatePauseButton();
		schedule();
	});

	controls.hidden = false;
	updatePauseButton();
	render();
	schedule();
})();
