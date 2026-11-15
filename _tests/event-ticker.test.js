const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('assets/js/event-ticker.js', 'utf8');

function setup(eventDates, initialDate) {
	let now = new Date(initialDate);
	let interval;
	let dayTimer;
	const listeners = {};
	const items = eventDates.map(dates => ({
		hidden: false,
		querySelectorAll: () => dates.map(date => ({ getAttribute: () => date }))
	}));
	const controls = {
		hidden: true,
		addEventListener: (event, callback) => { listeners['controls:' + event] = callback; }
	};
	const pauseButton = {
		querySelector: () => ({}),
		setAttribute: () => {}
	};
	const ticker = {
		hidden: false,
		querySelectorAll: () => items,
		querySelector: selector => selector === '.event-ticker-controls' ? controls : pauseButton,
		addEventListener: (event, callback) => { listeners['ticker:' + event] = callback; },
		matches: () => false,
		contains: () => false
	};
	class FakeDate extends Date {
		constructor(...args) { super(...(args.length ? args : [now.getTime()])); }
		static now() { return now.getTime(); }
	}
	const document = {
		hidden: false,
		activeElement: null,
		getElementById: () => ticker,
		addEventListener: (event, callback) => { listeners['document:' + event] = callback; }
	};
	const window = {
		matchMedia: () => ({ matches: false, addEventListener: () => {} }),
		clearInterval: () => { interval = undefined; },
		setInterval: callback => { interval = callback; return 1; },
		clearTimeout: () => { dayTimer = undefined; },
		setTimeout: callback => { dayTimer = callback; return 1; }
	};
	vm.runInNewContext(source, { document, window, Date: FakeDate });
	return {
		items, ticker, controls,
		visible: () => items.flatMap((item, index) => item.hidden ? [] : [index]),
		next: () => listeners['controls:click']({ target: { closest: () => ({ getAttribute: () => 'next' }) } }),
		advance: () => interval(),
		setDate: value => { now = new Date(value); dayTimer(); },
		refresh: () => listeners['document:visibilitychange']()
	};
}

test('hides past talks while keeping today and ongoing trainings', () => {
	const ticker = setup([
		['2026-11-14'], ['2026-11-15'], ['2026-11-13', '2026-11-16'],
		['2026-11-17']
	], '2026-11-15T12:00:00');
	assert.deepEqual(ticker.visible(), [1, 2]);
	assert.equal(ticker.controls.hidden, false);
	ticker.next();
	assert.deepEqual(ticker.visible(), [3]);
	ticker.advance();
	assert.deepEqual(ticker.visible(), [1, 2]);
});

test('handles midnight, disappearing controls and an empty ticker', () => {
	const ticker = setup([
		['2026-11-15'], ['2026-11-15', '2026-11-16'], ['2026-11-16']
	], '2026-11-15T23:59:00');
	ticker.next();
	assert.deepEqual(ticker.visible(), [2]);
	ticker.setDate('2026-11-16T00:00:00');
	assert.deepEqual(ticker.visible(), [1, 2]);
	assert.equal(ticker.controls.hidden, true);
	ticker.setDate('2026-11-17T00:00:00');
	assert.deepEqual(ticker.visible(), []);
	assert.equal(ticker.ticker.hidden, true);
});

test('refreshes after the page becomes visible and handles one or no upcoming event', () => {
	const ticker = setup([['2026-11-14'], ['2026-11-15']], '2026-11-15T12:00:00');
	assert.deepEqual(ticker.visible(), [1]);
	assert.equal(ticker.controls.hidden, true);
	ticker.setDate('2026-11-16T12:00:00');
	ticker.refresh();
	assert.equal(ticker.ticker.hidden, true);
});
