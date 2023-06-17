module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("dexie.min.js");
	eleventyConfig.addPassthroughCopy("index.js");
	eleventyConfig.addPassthroughCopy("audit.js");
};