---
order: 0
---

# Using a Userscript Manager

A userscript manager is a browser extension that allows you to organize and run scripts on websites. If you don't already have one, I would recommend [Violentmonkey], [Tampermonkey], [ScriptCat], or [Greasemonkey]. For more choices, see [this comparison table].

You can then use the buttons below to install the latest version of the script directly from the repo, from [GreasyFork], or from the [releases page].

| Source                       | GreasyFork                                            | Releases <Badge type="warning" text="no automatic updates" />                          |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [![Install latest version][latest-source-badge]][latest-source] | [![Install latest version from GreasyFork][latest-greasyfork-badge]][latest-greasyfork] | [![Install latest version from GitHub Releases][latest-release-badge]][latest-release] |

> [!NOTE]
> Userscript managers remember where you installed the script from and periodically check that URL for updates. If you choose to install the script from a local file or from the GitHub Releases page, you will need to manually check for updates.

The sources above are updated when there is a new release. If you want to live on the edge and run the script with unreleased changes, you will have to [build it yourself].

[build it yourself]: /contributing/local-development

[Violentmonkey]: https://violentmonkey.github.io/
[Tampermonkey]: https://www.tampermonkey.net/index.php
[ScriptCat]: https://docs.scriptcat.org/
[Greasemonkey]: https://github.com/greasemonkey/greasemonkey

[this comparison table]: https://github.com/awesome-scripts/awesome-userscripts?tab=readme-ov-file#compatibility

[GreasyFork]: https://greasyfork.org/
[releases page]: https://github.com/jerboa88/komodo/releases

[latest-source-badge]: https://img.shields.io/badge/%F0%9F%A7%A9_Install-komodo.user.js-blue
[latest-greasyfork-badge]: https://img.shields.io/greasyfork/v/545361-komodo-mods-for-komoot?color=%23990000
[latest-release-badge]: https://img.shields.io/github/v/release/jerboa88/komodo

[latest-source]: https://github.com/jerboa88/komodo/raw/refs/heads/main/dist/komodo.user.js
[latest-greasyfork]: https://greasyfork.org/en/scripts/545361-komodo-mods-for-komoot
[latest-release]: https://github.com/jerboa88/komodo/releases/latest
