import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import WikiLink from '../components/WikiLink'

/**
 *
 * @param {object} props
 * @param {object} props.wikiCategory
 * @param {Array<object>} props.wikiCategory.group
 */
export const CategoryPage = props => {
  const {
    data: {
      wikiCategory: { group }
    }
  } = props

  const { category, totalCount, edges } = group[0]

  return (
    <React.Fragment>
      <Helmet title={category} />

      <h1>
        {category} ({totalCount})
      </h1>

      <ul>
        {edges.map(({ node }) => (
          <li key={node.id}>
            <WikiLink {...node} />
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default CategoryPage

export const query = graphql`
  query CATEGORY_PAGE_QUERY($category: String!) {
    wikiCategory: allMarkdownRemark(
      sort: { fields: [frontmatter___title] }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      group(field: frontmatter___category) {
        category: fieldValue
        totalCount
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              title
              category
            }
          }
        }
      }
    }
  }
`
