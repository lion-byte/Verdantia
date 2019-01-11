import React from 'react'
import { Link } from 'gatsby'

import { pathToWikiURL } from '../shared/url'

/**
 * @param {object} props
 * @param {string} props.id
 * @param {string} props.fileAbsolutePath
 * @param {object} props.frontmatter
 * @param {string} props.frontmatter.title
 * @param {string} props.frontmatter.category
 */
const WikiLink = props => {
  const link = pathToWikiURL(props)

  return <Link to={link}>{props.frontmatter.title}</Link>
}

export default WikiLink
