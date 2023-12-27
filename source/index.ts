export function moduleName(input: string | undefined): string {
	if (typeof input !== 'string' && input !== undefined) {
		throw new TypeError(`Expected a string, got ${typeof input}`);
	}

	const sanetized = input?.trim() ?? 'Glitter';
	return sanetized + ' & rainbows';
}
