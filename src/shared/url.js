// @ts-check
const { basename } = require('path')

/**
 * Converts a string to lowercase.
 * Replaces all spaces with hyphens.
 *
 * @param {string} name
 * @returns {string}
 */
const normalizeURL = name =>
  name
    .trim()
    .toLowerCase()
    .replace(/ /g, '-')

/**
 * Returns the name of the file without its extension.
 * `/path/to/[filename].[ext]` --> `[filename]`
 *
 * Prepares the filename to be used in a URL
 *
 * @param {string} filename
 * @param {string} extension
 * @return {string}
 */
const filenameToURL = (filename, extension) =>
  normalizeURL(basename(filename, extension))

/**
 * Create a path for the wiki entry.
 *
 * Format: `/[category]/[filename]`
 *
 * @param {object} info
 * @param {string} info.fileAbsolutePath
 * @param {object} info.frontmatter
 * @param {string} info.frontmatter.category
 * @returns {string}
 */
const pathToWikiURL = info => {
  const filename = filenameToURL(info.fileAbsolutePath, '.md')
  const category = normalizeURL(info.frontmatter.category)

  return `/${category}/${filename}`
}

module.exports = { normalizeURL, filenameToURL, pathToWikiURL }
