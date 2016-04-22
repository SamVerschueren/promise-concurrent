import test from 'ava';
import delay from 'delay';
import timeSpan from 'time-span';
import inRange from 'in-range';
import m from './';

const p1 = () => delay(300).then(() => 'foo');
const p2 = () => delay(200).then(() => 'bar');
const p3 = () => delay(100).then(() => 'baz');
const p4 = () => Promise.reject(new Error('foo'));

test('error', async t => {
	t.throws(m('foo'), 'Expected an array of promise functions');
});

test('promise rejects', async t => {
	t.throws(m([p1, p4], 1), 'foo');
});

test('no concurrency equals `Promise.all`', async t => {
	const end = timeSpan();
	t.deepEqual(await m([p1, p2, p3]), ['foo', 'bar', 'baz']);
	t.true(inRange(end(), 290, 320));
});

test('concurrency `0` equals `Promise.all`', async t => {
	const end = timeSpan();
	t.deepEqual(await m([p1, p2, p3], 0), ['foo', 'bar', 'baz']);
	t.true(inRange(end(), 290, 320));
});

test('concurrency `3` equals `Promise.all`', async t => {
	const end = timeSpan();
	t.deepEqual(await m([p1, p2, p3], 3), ['foo', 'bar', 'baz']);
	t.true(inRange(end(), 290, 320));
});

test('concurrency `1`', async t => {
	const end = timeSpan();
	t.deepEqual(await m([p1, p2, p3], 1), ['foo', 'bar', 'baz']);
	t.true(inRange(end(), 590, 650));
});

test('concurrency `2`', async t => {
	const end = timeSpan();
	t.deepEqual(await m([p1, p2, p3], 2), ['foo', 'bar', 'baz']);
	t.true(inRange(end(), 290, 320));
});
