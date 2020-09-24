---
title: Search on Static Sites | Building The Varsity’s Student Handbook part 1
author: Rahul Tarak
date: '2020-09-19'
excerpt: >-
  How we made a U of T’s all digital first-year student handbook for 2020. In
  this part, we will cover motivation, basic project setup, and searching on a
  static site.
hero: images/cover.png
---
This is going to be a series of three or four posts talking about the more interesting things we did while making [handbook.thevarsity.ca](https://handbook.thevarsity.ca/). If you haven’t checked it out yet, I would highly recommend it; for starters, this series will make a lot more sense but also it is just full of really good articles and illustrations.

For some context, this year as a result of COVID-19 the annual *Varsity* student handbook had to be shifted from a physical version to a digital medium. As the first digital handbook we definitely had some pain points but also a lot of opportunities to innovate on what had been done before.

At *The Varsity*, we use WordPress and Elementor and I am personally not a fan, and definitely planning to move away from them more and more through the coming year. But moving a huge site like thevarsity.ca with over 20 years of articles is very complicated; the handbook on the other hand gave us an opportunity for a fresh start.

At *The Varsity* Volume 141’s engineering team, we ♥ TS and are always looking to modernize our tech stack. For the handbook, we went with a very similar stack to Open Varsity with:

* Gatsby
* React
* TS
* Netlify CMS
* Bulma

You can start with same netlify starter template as us, here:

```shell
git clone https://github.com/matsuri-tech/gatsby-starter-netlify-cms
```

This is a typescript version of the netlify starter template.

I am not really planning to talk about the basic setup or creating basic articles but in this post rather I want to focus on a few main topics I’ve listed below.

* Search on a static site
* Custom React TS hooks
* Animating lines on the frontpage
* Specific image optimization with Gatsby Image

# Search on a static site

I thought this would be a much more complicated problem then it really was. I had heard of things like Angolia and such, but I expected setting up search to be a tedious process. It really wasn’t and I want to talk about how I did it.

We used **elasticlunr** search, which you can find more about [here.](https://www.gatsbyjs.com/plugins/@gatsby-contrib/gatsby-plugin-elasticlunr-search/)

To install the package, use this.

```shell
yarn install @gatsby-contrib/gatsby-plugin-elasticlunr-search
# or
npm install --save @gatsby-contrib/gatsby-plugin-elasticlunr-search
```

## Setting up Gatsby Config

Here you will notice a slight difference from the documentation, where we pass the `slug` as the `path` parameter. This is a required change if you want to open the link after search rather than just display titles.

```javascript
  {
            resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
            options: {
                // Fields to index
                fields: [`title`, `tags`],
                // How to resolve each field`s value for a supported node type
                resolvers: {
                    // For any node of type MarkdownRemark, list how to resolve the fields` values
                    MarkdownRemark: {
                        title: node => node.frontmatter.title,
                        tags: node => node.frontmatter.tags,
                        path: node => node.fields.slug
                    }
                }
            }
        }
```

In this same vein, you could easily add more fields to index or pass more parameters to the markdown remark.

## Setting up the search wrapper

This would be the most basic setup for the search wrapper, but you would normally expect to find this on a navbar or something like that. Then obviously it would have more styling and be more complex. Our search wrapper is our navbar, which you can find [here ](<https://github.com/TheVarsity/Survival-Handbook/blob/bfc7417857d850e471036f1ddce0afe81977e294/src/components/Navbar.tsx#L64-L67>)

```jsx
const SearchWrapper = () => {
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={(data) => (
      <header>
        <Search searchIndex={data.siteSearchIndex.index} />
      </header>
    )}
  />;
};
```

## Setting up the search bar

**Note: to the best of my knowledge elasticlunr does not have typescript type definitions and hence you won’t get proper type support on it.**

Here I am going to directly show you our search page, as it has the linking and everything built in. Feel free to restyle it however you want. This project was using styled-jsx but there is no need for this.

Similarly, we can also ignore the isMobile and toggle as they are meant to change the styling of the element depending on state changes.

```jsx
import { Index } from "elasticlunr";
import { Link } from "gatsby";
import React, { ChangeEvent, useEffect, useState } from "react";

import { isMobile } from "react-device-detect";

type SearchProps = { searchIndex: any; toggle: boolean };

// Search component
const Search: React.FC<SearchProps> = ({ searchIndex, toggle }) => {
  const [state, setState] = useState<{
    query: string;
    results: Array<{ path: string; title: string; id: number }>;
  }>({
    query: "",
    results: [],
  });
  const [index, setIndex] = useState();

  const getOrCreateIndex = () => {
    if (!index) {
      setIndex(Index.load(searchIndex));
    }
  };

  const search = (evt: ChangeEvent<HTMLInputElement>) => {
    const query = evt.target.value;
    getOrCreateIndex();
    if (index) {
      setState({
        query,
        // Query the index with search string to get an [] of IDs
        results: index
          .search(query, { expand: true })
          // Map over each ID and return the full document
          .map(({ ref }: { ref: any }) => index.documentStore.getDoc(ref)),
      });
    }
  };

  useEffect(() => {
    if (!toggle) {
      setState({ query: ``, results: [] });
    }
    console.log(toggle);
  }, [toggle]);

  return (
    <div>
      <input
        type="text"
        value={state.query}
        onChange={search}
        className="input is-hovered is-large"
        placeholder="Search ..."
      />
      {state.results.length && toggle ? (
        <ul
          className="py-3 mt-2"
          style={{
            position: isMobile ? "static" : "absolute",
            width: isMobile ? "95vw" : "23vw",
            borderRadius: "5px",
            backgroundColor: "rgba(51, 51, 51, 0.8)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {state.results.map((page, index) => (
            <li key={page.id}>
              <Link to={`${page.path}`} className="has-text-white">
                <p className="search-result">{page.title}</p>
              </Link>
              <div className="divider-wrapper">
                {index !== state.results.length - 1 ? (
                  <div className="divider" />
                ) : null}
              </div>
              {/* @ts-ignore Styled JSX*/}
              <style jsx>
                {`
                  .search-result {
                    word-wrap: auto;
                    margin: 0 5px;
                  }
                  .divider-wrapper {
                    display: flex;
                    justify-content: center;
                  }
                  .divider {
                    display: block;
                    position: relative;
                    border-top: 0.1rem solid white;
                    height: 0.1rem;
                    margin: 0.5rem 0;
                    text-align: center;
                    width: 90%;
                  }
                `}
              </style>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
export default Search;
```

And that is about it — we now have a search set up on a static site.

# Conclusion

Static sites are genuinely amazing; they provide so many features and a lot of flexibility to developers while having absolutely amazing performance for end-users.

While there are inherent drawbacks for certain use cases with using static sites, they are really good at what they do and more and more, we are seeing that they are able to have features you’d only expect in non-static sites, such as powerful searching.

In the next part of this series, I will likely be covering custom react hooks and showing off a *Varsity* package with typescript react hooks, which will be expanded upon through the year as we create more hooks for our own projects.
