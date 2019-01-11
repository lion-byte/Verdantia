const { resolve } = require('path')

const { normalizeURL, pathToWikiURL } = require('./src/shared/url')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const CategoryPage = resolve(__dirname, './src/templates/CategoryPage.js')
  const WikiPage = resolve(__dirname, './src/templates/WikiPage.js')

  return graphql(`
    query CreatePagesQuery {
      wikis: allMarkdownRemark {
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              category
            }
          }
        }
      }
    }
  `).then(({ errors, data }) => {
    if (errors) {
      return Promise.reject(errors)
    }

    const uniqueCategories = new Set()

    const {
      wikis: { edges }
    } = data

    // Create a page for each Wiki entry
    edges.forEach(({ node }) => {
      const wikiPath = pathToWikiURL(node)

      uniqueCategories.add(node.frontmatter.category)

      createPage({
        path: wikiPath,
        component: WikiPage,
        context: {
          id: node.id
        }
      })
    })

    // Create a page for each Wiki item category
    uniqueCategories.forEach(category => {
      const categoryPath = `/${normalizeURL(category)}`

      createPage({
        path: categoryPath,
        component: CategoryPage,
        context: {
          category
        }
      })
    })
  })
}
