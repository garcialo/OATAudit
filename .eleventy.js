module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("index.js");
	eleventyConfig.addPassthroughCopy("audit.js");
};