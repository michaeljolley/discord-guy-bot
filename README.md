<div style="text-align:center">
<img src="https://user-images.githubusercontent.com/1228996/130375070-1e69510b-1ef7-46d5-b327-db0a3d6b0ba4.png" width="150px" style="margin: 0 auto;">
</div>

# Guy Bot

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/builders-club/discord-guy-bot/CD) ![GitHub](https://img.shields.io/github/license/builders-club/discord-guy-bot) [![Invite to Discord](https://img.shields.io/badge/discord-invite-blueviolet)](https://discord.com/oauth2/authorize?client_id=878808315528871936&permissions=0&scope=bot%20messages.read)

A friendly Discord bot that helps server members use more inclusive language.

## How Does it Work?

When a user sends a message in a Discord channel that includes a word that is
less than inclusive (i.e. "guys", "bros", "dudes", "chaps", etc.) in the
first 10 or last 5 words, a `guy-bot` reaction is added to the message and a
DM is sent to the author with the following:

> Please bear in mind that the makeup of the {server name here} Discord server
> is very diverse, and some people feel excluded by the use of the term
> “{OFFENDING WORD}”. Maybe you could try using people, team, all, folks,
> everyone, or yall? Thanks for helping us make sure everyone feels welcome
> here.

If that user sends another message that includes a non-inclusive word in the
first 10 or last 5 words within a month, that message will also receive a
`guy-bot` reaction, but the message will be sent in the channel for everyone
to see. Example:

> {author mentioned here}, Please bear in mind that the makeup of the
> {server name here} Discord server is very diverse, and some people
> feel excluded by the use of the term “{OFFENDING WORD}”. Maybe you could
> try using people, team, all, folks, everyone, or yall? Thanks for helping us
> make sure everyone feels welcome here.

## Development and Contributing

Interested in contributing? We ❤️ pull requests!

To make sure our community is safe for all, be sure to review and agree to our
[Code of Conduct](./CODE_OF_CONDUCT.md). Then see the
[Contribution](./CONTRIBUTING.md) guidelines for more information.

## Getting Help

We love to hear from you so if you have questions, comments or find a bug in the
project, let us know! You can either:

- [Open an issue](https://github.com/builders-club/discord-guy-bot/issues/new)
on this repository
- Tweet at me! I'm [@baldbeardbuild on Twitter](https://twitter.com/baldbeardbuild)

## Attribution & Credits

Thanks to [Luke Oliff](https://github.com/lukeocodes). His Slack-based
[guys-bot](https://github.com/lukeocodes/guys-bot) repository was the
inspiration for this project.
