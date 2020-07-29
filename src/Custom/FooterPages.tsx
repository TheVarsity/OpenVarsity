import React from 'react';
import styled from '@emotion/styled';
import mediaqueries from '@styles/media';



const FooterPages = ({ pages }: { pages: Array<{ name: string, url: string, external?: boolean }> }) => {
  console.log(pages)
  const first = pages[0]
  console.log(first, first.name)
  return (
    <div>
      {pages.map((page) => {
        if (page.external) {
          return (
            <FooterLinkContainer href={page.url} rel="noopener noreferrer" target="_blank">
              {page.name}
            </FooterLinkContainer>
          )
        }
        return (
          <FooterLinkContainer href={page.url}>
            {page.name}
          </FooterLinkContainer>
        )
      })}
    </div>

  )
}

const FooterLinkContainer = styled.a`
  position: relative;
  margin-left: 3.2rem;
  text-decoration: none;
  max-width: 16px;
  color: ${p => p.theme.colors.primary};
  opacity : 0.6;
   
  
  &:hover {
      
      color: ${p => p.theme.colors.accent};
      * {
        transition: fill 0.25s var(--ease-in-out-quad);
      }
    }
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -50%;
    top: -20%;
    width: 200%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    margin: 0 2.2rem;
  `};
`;

export default FooterPages;