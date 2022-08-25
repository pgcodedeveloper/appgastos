module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{svg,png,js,css,html}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};