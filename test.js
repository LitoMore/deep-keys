import test from 'ava';
import keys from './index.js';

test("should return array composed of it's properties names", (t) => {
	t.deepEqual(
		keys({
			a: 1,
			b: 2,
			c: 3,
			d: 4,
		}),
		['a', 'b', 'c', 'd'],
	);
});

test('should return owned properties', (t) => {
	const object = {a: {b: 1, c: 2}};
	t.deepEqual(keys(object.a), ['b', 'c']);
});

test('should return deep keys', (t) => {
	const object1 = {
		a: 1,
		b: {c: 1},
		c: {d: {e: 1}, f: 1},
		d: {e: {f: {g: 1, h: 2}}},
		e: 2,
		f: {g: []},
	};
	t.deepEqual(keys(object1), [
		'a',
		'b.c',
		'c.d.e',
		'c.f',
		'd.e.f.g',
		'd.e.f.h',
		'e',
		'f.g',
	]);

	const object2 = {
		type: 'customer',
		details: {
			name: 'Ariel',
			age: 26,
			address: {city: 'Tel Aviv', country: 'Israel'},
		},
		isActive: true,
		createdAt: new Date(),
	};
	t.deepEqual(keys(object2), [
		'type',
		'details.name',
		'details.age',
		'details.address.city',
		'details.address.country',
		'isActive',
		'createdAt',
	]);
});

test('should return deep keys including intermediate parent keys', (t) => {
	const object1 = {
		a: 1,
		b: {c: 1},
		c: {d: {e: 1}, f: 1},
		d: {e: {f: {g: 1, h: 2}}},
		e: 2,
		f: {g: []},
	};
	t.deepEqual(keys(object1, true), [
		'a',
		'b',
		'b.c',
		'c',
		'c.d',
		'c.d.e',
		'c.f',
		'd',
		'd.e',
		'd.e.f',
		'd.e.f.g',
		'd.e.f.h',
		'e',
		'f',
		'f.g',
	]);
});

test('should escape . in key names', (t) => {
	const object1 = {a: {'.b': 1}};
	t.deepEqual(keys(object1), ['a.\\.b']);
	const object2 = {'a.': {b: 1}};
	t.deepEqual(keys(object2, true), ['a\\.', 'a\\..b']);
	const object3 = {a: {'b.d': {c: 1}}};
	t.deepEqual(keys(object3), ['a.b\\.d.c']);
	const object4 = {a: {'b.d': {c: 1}}};
	t.deepEqual(keys(object4, true), ['a', 'a.b\\.d', 'a.b\\.d.c']);
});
