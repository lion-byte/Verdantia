import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'

import WikiLink from './WikiLink'

const WIKI_LIST_QUERY = graphql`
  query WIKI_LIST_QUERY {
    wikiList: allMarkdownRemark(sort: { fields: [frontmatter___title] }) {
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

const CategoryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));

  .category {
    h2 {
      margin-top: 0;
    }
  }
`

export const WikiList = props => {
  return (
    <CategoryGrid>
      <StaticQuery query={WIKI_LIST_QUERY}>
        {({ wikiList }) => {
          return wikiList.group.map(group => (
            <section key={group.category} className='category'>
              <h2>
                {group.category} ({group.totalCount})
              </h2>

              <ul>
                {group.edges.map(({ node }) => (
                  <li key={node.id}>
                    <WikiLink {...node} />
                  </li>
                ))}
              </ul>
            </section>
          ))
        }}
      </StaticQuery>
    </CategoryGrid>
  )
}

export default WikiList
