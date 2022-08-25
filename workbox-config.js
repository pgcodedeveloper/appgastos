module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{svg,png,js,css,html,json,jsx}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};