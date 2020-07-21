---
title: What is Open Varsity?
author: Rahul Tarak
date: "2020-07-21"
excerpt: What is Open Varsity? and Why does it Exists?
hero: images/hero.jpg
---

Welcome, to Open Varsity! This is The Varsity Publications, UofT Student Newspaper's new engineering blog.

In our first blog post, I want to go over why I made Open Varsity and what content you can expect from this blog.

## What is Open Varsity?

The goal for Open Varsity is to have a platform to communicate the challenges in building and maintaining **_Canada's largest student newspaper_**.

A way to document the problems we face, and the solutions we find to them, this serves two purposes. It helps other people facing the same problems use our solutions and acts as a form of documentation for future varsity engineering teams.

## Why make Open Varsity?

So I joined as the Varsity's backend engineer in June, 2020 (Yes, I got a job in the high of the pandemic, I am as surprised as others).

When I joined I realized the organization in the past years had been very closed off in terms of its engineer, in terms of opening up how things are made or even internally documenting the process.

I wanted to change that, make the organization more open, showcasing our code and our solutions. I also wanted to push for a strong documentation of not only the code itself, but the thought process of the engineering team and felt this would be a great way to do so.

Finally while talking to a friend, I also realized there was a lot of confusion about the kind of engineering required by a student newspaper, and he suggested talking about it.

## What to expect?

Personally, I am not sure what my plan for this blog is entirely except that I want it to exist, I do have a few ideas of things I think could be interesting.
One idea I am excited about is a series of **_blogs detailing every time I crash the website_**, how I managed to do it and how I resolved it. Additionally, I also want to have in some form, **_a development blog_**, in the sense that I talk through the process of building something, not necessarily as a tutorial but rather our thought process.

**Finally due to the pandemic, definitely expect a lot of coverage about how a student newspaper transitions a lot of its print media into digital content.**

The first of this kind of transition would be the UofT student handbook, normally this is printed book given to every freshmen in their orientation kit, but due to covid we are transitioning it into a digital handbook.

## How this blog was made?

A lot of the engineering behind a student newspaper has to do with Content Management, and I want to throw together a blog quickly but not use a legacy content management system like WordPress.

So I took the challenge to learn Gatsby and use Netlify CMS. After messing around with Gatsby and JAMStack for a bit, I realized it would be faster if I used a Gatsby starter.

I will make another blog post about how I was originally building out the blog. How I started learning Gatsby, what problems I ran it, what I liked. Then how I actually build this blog out and about how amazing Gatsby Component Shadowing is as a concept and how useful it is.

The below command is how to install this Gatsby starter. This starter was made by [Narative](https://www.narative.co/) and the full instructions are available at [Novela Starter](https://github.com/narative/gatsby-starter-novela).

```javascript
gatsby new novela-site https://github.com/narative/gatsby-starter-novela
gatsby develop
```