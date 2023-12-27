import {strictEqual, throws} from 'node:assert';
import {test} from 'node:test';
import {moduleName} from './index.js';

await test('simple string input', () => {
	strictEqual(moduleName('unicorns'), 'unicorns & rainbows');
});

await test('javascript users without typings get error on number', () => {
	// @ts-expect-error moduleName expects a string not a number
	throws(() => moduleName(123), {
		message: 'Expected a string, got number',
	});
});
