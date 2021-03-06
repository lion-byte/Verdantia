import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import { FaBars } from 'react-icons/fa'

import { normalizeURL } from '../shared/url'

const StyledNav = styled.nav`
  font-size: 1.25em;

  a,
  button {
    background-color: transparent;
    border: none;
    display: block;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    padding: 0.25em 1ch;
    text-decoration: none;
  }

  .menu-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-align: left;
    width: 100%;
  }

  .menu {
    transition: all 0.3s ease-out;

    .js & {
      max-height: 0;
      overflow: hidden;
    }

    &.active {
      max-height: 25em;
    }

    ul {
      border-top: 1px solid ${props => props.theme.black};
      list-style: none;
      margin: 0;
      padding: 0;
    }

    a {
      border-bottom: 1px solid ${props => props.theme.black};

      &[aria-current] {
        border-bottom: 1px solid ${props => props.theme.primaryColor};
      }
    }
  }

  @media screen and (min-width: 55em) {
    .menu-button {
      display: none;
    }

    .menu {
      .js & {
        max-height: none;
      }

      ul {
        border: 0;
        margin: 0 0 0 -0.25em;
      }

      li {
        display: inline-block;
        margin: 0 0.25em;
      }

      a {
        border: 0;
      }
    }
  }
`

const CATEGORY_LIST_QUERY = graphql`
  query CATEGORY_LIST_QUERY {
    categories: allMarkdownRemark(sort: { fields: [frontmatter___title] }) {
      group(field: frontmatter___category) {
        category: fieldValue
      }
    }
  }
`

export class Nav extends React.Component {
  state = { menuActive: false }

  toggleMenu = () =>
    this.setState(currentState => ({ menuActive: !currentState.menuActive }))

  hideMenu = () => this.setState({ menuActive: false })

  render () {
    const { menuActive } = this.state

    return (
      <StyledNav>
        <button className='menu-button' onClick={this.toggleMenu}>
          <FaBars />
          <span> {menuActive ? 'Close' : 'Menu'}</span>
        </button>

        <div
          className={menuActive ? 'menu active' : 'menu'}
          onClick={this.hideMenu}
        >
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>

            <StaticQuery query={CATEGORY_LIST_QUERY}>
              {({ categories }) =>
                categories.group.map(group => (
                  <li key={group.category}>
                    <Link to={`/${normalizeURL(group.category)}`}>
                      {group.category}
                    </Link>
                  </li>
                ))
              }
            </StaticQuery>
          </ul>
        </div>
      </StyledNav>
    )
  }
}

export default Nav
