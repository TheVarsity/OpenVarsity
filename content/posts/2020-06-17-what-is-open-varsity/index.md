---
title: What is Open Varsity?
author: Rahul Tarak
date: '2020-07-21'
excerpt: What is Open Varsity and why does it exist?
hero: images/hero.jpg
---
Welcome, to Open Varsity! This is *The Varsity*, U of T’s student newspaper’s new engineering blog.

In our first blog post, I want to go over why I made Open Varsity and what content you can expect from this blog.

## What is Open Varsity?

The goal for Open Varsity is to have a platform to communicate the challenges in building and maintaining ***Canada’s largest student newspaper***.

As a way to document the problems we face and the solutions we find to them, this serves two purposes. It helps other people who are facing the same problems use our solutions, and acts as a form of documentation for future *Varsity* engineering teams.

## Why make Open Varsity?

So I joined as *The Varsity*’s back-end web developer in June, 2020. (Yes, I got a job in the high of the pandemic; I am as surprised as others.)

When I joined, I realized that, in past years, the organization had been very closed off in terms of its engineering and opening up how things are made, or even internally documenting the process.

I wanted to change that, make the organization more open, showcasing our code and our solutions. I also wanted to push for a strong documentation of not only the code itself, but the thought process of the engineering team, and felt this would be a great way to do so.

Finally, while talking to a friend, I also realized there was a lot of confusion about the kind of engineering that’s required by a student newspaper, and he suggested talking about it.

## What to expect?

Personally, I am not sure what my plan for this blog is entirely except that I want it to exist. I do have a few ideas for things I think could be interesting. One idea I am excited about is a series of ***blogs detailing every time I’ve crashed the website***, how I managed to do it, and how I resolved it. Additionally, I also want to have in some form, ***a development blog***, in the sense that I talk through the process of building something, not necessarily as a tutorial, but rather working through our thought process.

**Finally, due to the pandemic, definitely expect a lot of coverage about how a student newspaper transitions a lot of its print media into digital content.**

The first of this kind of transition would be the *Varsity* handbook; normally this is a printed book given to every first-year student in their orientation kit, but due to COVID-19 we are transitioning it into a digital handbook.

*The Varsity* has been lucky enough to be in line to receive **GPT-3 access from OpenAI** through **Ilya Sutskever**, one of the **co-founders of OpenAI** and a U of T alum. Once we receive access can definitely expect content related to experimentation with **GPT-3 and how it can be used in a news platform**.

## How this blog was made?

A lot of the engineering behind a student newspaper has to do with content management, and I wanted to quickly throw together a blog, but not use a legacy content-management system like WordPress.

So I took the challenge to learn Gatsby and use Netlify CMS. After messing around with Gatsby and JAMStack for a bit, I realized it would be faster if I used a Gatsby starter.

I will make another blog post about how I was originally building out the blog — how I started learning Gatsby, what problems I ran into with it, and what I liked — then how I actually built this blog out and about how amazing Gatsby Component Shadowing is as a concept and how useful it is.

The below command is how to install this Gatsby starter. This starter was made by [Narative,](https://www.narative.co/) and the full instructions are available at [Novela Starter](https://github.com/narative/gatsby-starter-novela).

```javascript
gatsby new novela-site https://github.com/narative/gatsby-starter-novela
gatsby develop
```
