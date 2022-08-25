module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{svg,js,css,html}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};