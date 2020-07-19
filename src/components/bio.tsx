/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import React, { ComponentProps, forwardRef, Ref } from "react"
import styled from "styled-components"
import { rhythm } from "../utils/typography"

const Content = styled.div`
  display: flex;
  margin-bottom: ${rhythm(2.5)};
`

const GatsbyImage = forwardRef(
  (props: ComponentProps<typeof Image>, ref: Ref<Image>) => (
    <Image {...props} ref={ref} />
  )
)

const Avatar = styled(GatsbyImage)`
  border-radius: 100%;
  margin-bottom: 0;
  margin-right: ${rhythm(1 / 2)};
  min-width: 50px;
`

type AuthorType = {
  id: string,
  bio: string
  twitter: string
  picture: string
}



export const Bio: React.FC<{ author: AuthorType }> = ({ author }) => {

  const queryString = ``

  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/gatsby-icon.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  // const { author, social } = data.site.siteMetadata
  const { id, bio, twitter } = author

  return (
    <Content>
      <Avatar
        fixed={data.avatar.childImageSharp.fixed}
        alt={id}
        imgStyle={{ borderRadius: "50%" }}
      />
      <p>
        <p>
          Written by <strong>{id}</strong> {bio}
        </p>
        {` `}

        <a href={`https://twitter.com/${twitter}`}>
          You should follow them on Twitter
        </a>
      </p>
    </Content>
  )
}
