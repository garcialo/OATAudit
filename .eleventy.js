module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("dexie.min.js");
	eleventyConfig.addPassthroughCopy("db_setup.js");
	eleventyConfig.addPassthroughCopy("index.js");
	eleventyConfig.addPassthroughCopy("rules.js");
	eleventyConfig.addPassthroughCopy("audit.js");
};