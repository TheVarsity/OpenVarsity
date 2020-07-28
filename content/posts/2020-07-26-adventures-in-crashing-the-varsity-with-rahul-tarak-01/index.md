---
title: Adventures in crashing The Varsity with Rahul Tarak | 01
author: Rahul Tarak
date: '2020-07-26'
excerpt: >-
  A series where I go through every incident of me crashing the site, how I
  managed to do it, what I learnt from it, and what I changed
hero: images/hero.jpg
---
This is the first blog post in the series I call *Adventures in Crashing* The Varsity *with Rahul Tarak*. The idea for this series is the fact that I crashed the main site twice in my first month, which is actually what inspired me to make this blog.

So, what is this series? **No it is not an incident report.** It is meant to be much less formatted and more detailed, not focused on revealing the solution but rather my thought process and every step along the way.

I was actually planning on starting this series with reflecting on those two crashes I mentioned earlier, but yesterday night I got a ping about <https://spine.thevarsity.ca/> being broken on Google Chrome, so we are going to start there. This crash is not exactly my fault, but I expect most will be, so this series will truly focus on my adventures in crashing *The Varsity*.

## The crash

**ERR_SSL_PROTOCOL_ERROR**

Let me give some context about *The Varsity*’s engineering. While there has been some great work from the team, it built its infrastructure like an engineering team — this is one of the things I wanted to change. So, *The Varsity* did not have any uptime monitoring, and I use Firefox as my main browser, so I did not catch the error and don’t know exactly when it occurred.

### Interesting things about this crash

The outage was only on Chromium, but it’s weirder than that. It worked on Firefox, Safari, and Firefox mobile, but it even worked on Chrome if you went to another link before opening the SPINE link. If you went to https://form.thevarsity.ca/ before https://spine.thevarsity.ca/ it worked perfectly, which was extremely odd. Also, interestingly enough, there weren’t any server side changes made to these configurations before the error in at least a month.

I didn’t really care to check IE, also, I won’t because it’s not worth the trouble.

## Debugging

This crash happened at 2:00 am for me, so it was pretty late, but as the only back-end web developer I had to work through fixing the error.

As I had only joined about two months ago, and *The Varsity* has a huge legacy code base from over the last 15 years, I am not fully comfortable with the entire code base. But, from my previous experience crashing the entire site I had picked up how to debug some **nginx** errors.

So, I went through the standard googling of a bunch of errors and experimenting with the code base. I don’t want to spend much time talking about that because the final way I solved the issue is far more interesting. Though, here are some semi-related issues I found: [\[1]](https://community.letsencrypt.org/t/err-ssl-protocol-error-only-in-chrome-and-mobile-browser/72014) and [\[2]](https://community.letsencrypt.org/t/nginx-err-ssl-protocol-error/4143).

None of these solutions really helped, but this felt like one of those DNS errors that would just go away, so, after working through the night till about 8:00 am with no results, I crashed.

During the debug session, I was talking to a friend about this issue and we were talking about how we need better tools to diagnose DNS and SSL issues.

## Debugging with GPT-3

All credit goes to my friend, [@itsarnavb](https://twitter.com/itsarnavb), for the idea to debug with GPT-3; we literally asked it the question and it helped us diagnose the issue. I want to walk through parts of that conversation.

> A conversation with artificial intelligence

***The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.***

***Human: Hello, who are you?***

***AI: I am an AI created by OpenAI. How can I help you today?***

***Human: Can you help me debug an SSL configuration error?***

AI: Sure. What’s wrong?

***Human: When I open the website, it shows ‘ERR_SSL_PROTOCOL_ERROR’***

AI: The server’s TLS configuration does not support the protocol you are trying to use.

***Human: How do I fix that?***

AI: Check your server‘s configuration. Make sure that TLSv1.0 or TLSv1.1 is supported.

***Human: How do I check that?***

AI: For Ubuntu systems, this can be done by running the command:

```zsh
openssl s_client -connect example.com:443 .
```

AI: Make sure to replace example.com:443 with your server’s IP address.

***Human: Okay, this is what it returned:***

````zsh
---------------------------
CONNECTED(00000003)
depth=2 O = Digital Signature Trust Co., CN = DST Root CA X3
verify return:1
depth=1 C = US, O = Let's Encrypt, CN = Let's Encrypt Authority X3
verify return:1
depth=0 CN = thevarsity.ca
verify return:1
---
Certificate chain
 0 s:/CN=thevarsity.ca
   i:/C=US/O=Let's Encrypt/CN=Let's Encrypt Authority X3
 1 s:/C=US/O=Let's Encrypt/CN=Let's Encrypt Authority X3
   i:/O=Digital Signature Trust Co./CN=DST Root CA X3
---
Server certificate
-----BEGIN CERTIFICATE-----
<truncated>
-----END CERTIFICATE-----
subject=/CN=thevarsity.ca
issuer=/C=US/O=Let's Encrypt/CN=Let's Encrypt Authority X3
---
No client certificate CA names sent
Peer signing digest: SHA512
Server Temp Key: ECDH, P-256, 256 bits
---
SSL handshake has read 3305 bytes and written 320 bytes
Verification: OK
---
New, TLSv1.2, Cipher is ECDHE-RSA-AES128-GCM-SHA256
Server public key is 2048 bit
Secure Renegotiation IS supported
Compression: NONE
Expansion: NONE
No ALPN negotiated
SSL-Session:
    Protocol  : TLSv1.2
    Cipher    : ECDHE-RSA-AES128-GCM-SHA256
    Session-ID: 0F2989E575AB0412BFD704DA862C789213198DD37655E0D1A1D0FC49E6A8E91C
    Session-ID-ctx:
    Master-Key: 85277981B0AB390FB218AB262397C27129FB9D7AB98070A2F905E8B1A25D0BD4D060D6168F41D4A396FC6A7B809094E8
    PSK identity: None
    PSK identity hint: None
    SRP username: None
    TLS session ticket lifetime hint: 86400 (seconds)
    TLS session ticket: <truncated>
    Start Time: 1595783988
    Timeout   : 7200 (sec)
    Verify return code: 0 (ok)
    Extended master secret: no
---
closed
---------------------------```
````

AI: I think that the issue is caused by the server being behind an HTTP proxy, not an HTTPS proxy.

***Human: Can you elaborate? I’m using nginx***

AI: There are two ways to solve this problem. You can either disable the proxy and connect directly, or setup TLS termination on your host and let your host deal with it. The second option is preferred because it makes future maintenance easier. I can write a tutorial explaining how to do that if you want.

***Human: Awesome! Go ahead***

AI: Just for clarification, we are currently logged in to your server, yes?

***Human: Yes***

AI: Okay, the first step is to use your distribution’s package manager to install stunnel. For Ubuntu and Debian systems, this can be done by running the command: sudo apt-get install stunnel. For CentOS and RedHat systems, this can be done by running the command: sudo yum install stunnel. Please replace apt-get with yum if you are using one of these.

***Human: Great, what do we do with stunnel?***

AI: Stunnel is a program that can be used to encapsulate TCP connections inside of SSL connections. This is useful because we can connect to the server through an HTTP proxy, and send traffic through stunnel using SSL. This is known as TLS termination. Stunnel listens on port 443, so this means that our proxy must connect to stunnel, and not directly to the server. Then, we will configure nginx to connect to stunnel instead of directly to the server.

### Dissecting the conversation

First, wow that was literally amazing! What OpenAI has done with GPT-3 is truly incredibly; the way this can be used to diagnose errors in the future is going to be amazing.

Let’s start by saying I am not a networking expert my any means, but I think the GPT-3 answer here is slightly wrong. But its ability to cut through so much networking literature and give extremely useful ideas is amazing. While we were diagnosing, we were changing the GPT-3 answer slightly, and continuing on it was constantly able to generate amazing results.

The idea of the error being something to do with TLS version was spot on; this is what caused the problem with Chrome and not other browsers. Its comment about supporting TLSv1 and TLSv1.1 was perfect. The solution with stunnel was incorrect, but it was also missing a lot of context about our system.

### The real solution and how GPT-3 helped me find it

Let me start by saying I have no idea what actually caused the site to crash or what changed to prevent it from working.

But in the process of debugging, I tried changing the configurations files a lot. At the beginning of this process I made a duplicate file of SPINE as a backup, but, like the idiot I am, this file was in the sites-enabled folder instead of the sites-available folder, which was preventing me from fixing the TLS issue.

I am assuming that if I didn’t make this mistake, I would have solved the issue in my debugging and messing-around phase. But because of this mistake, I didn’t and here GPT-3 came in clutch. It helped me look at the exact bug of the TLS version and also gave me the diagnostic commands in `openssl` and `nmap` to detect TLS versions.

## Adding real-time monitoring

So, this crash immediately brought up the need for real-time monitoring. Realizing this was an issue I immediately added pagerduty and tried several real-time monitoring solutions

A few of them are linked below. (Some of these pages might expire with trials ending.)

* Apex Ping, http://status.ping.apex.sh/ffec0775-28fa-4b12-b44c-d2617700578b
* Fresh Ping https://statuspage.freshping.io/46090-TheVarsityPublications
* Uptime Robot https://stats.uptimerobot.com/E6LKNcWg40
* Uptime.com https://uptime.com/s/varsity

## Conclusion

I am was definitely not expecting to make the first post about this, but I guess that is going to be the trend in this series.

This bug definitely wasn’t something fun to debug yesterday, but diagnosing it with GPT-3 was amazing, and it was such a relief to solve the issue.

Here are more random snippets of my conversation with GPT-3 about this: [here](https://gist.github.com/CryogenicPlanet/81570ac097d42b35ee206de9bf3db02c) or https://gist.github.com/CryogenicPlanet/81570ac097d42b35ee206de9bf3db02c
