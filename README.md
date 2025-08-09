<!-- Project Header -->
<div align="center">
  <img class="projectLogo" src="src/logo.png" alt="Project logo" title="Project logo" width="256">

  <h1 class="projectName">Komodo - Mods for Komoot</h1>

  <p class="projectBadges info">
    <img src="https://johng.io/badges/category/Script.svg" alt="Project category" title="Project category">
    <img src="https://img.shields.io/github/languages/top/jerboa88/komodo.svg" alt="Language" title="Language">
    <img src="https://img.shields.io/github/repo-size/jerboa88/komodo.svg" alt="Repository size" title="Repository size">
    <a href="LICENSE">
      <img src="https://img.shields.io/github/license/jerboa88/komodo.svg" alt="Project license" title="Project license"/>
    </a>
    <a href="https://github.com/semantic-release/semantic-release">
      <img src="https://img.shields.io/badge/semantic--release-conventionalcommits-e10079?logo=semantic-release" alt="Semantic Release" title="Semantic Release"/>
    </a>
  </p>
  <p class="projectBadges status">
    <img src="https://img.shields.io/badge/Experimental-%E2%9A%A0%EF%B8%8E-ca8a04.svg" alt="Experimental" title="Experimental"/>
    <a href="https://github.com/jerboa88/enhancements-for-komoot/releases/latest">
      <img src="https://img.shields.io/github/v/release/jerboa88/enhancements-for-komoot.svg" alt="Latest release" title="Latest release"/>
    </a>
    <a href="https://github.com/jerboa88/komodo/raw/refs/heads/main/dist/komodo.user.js">
      <img src="https://img.shields.io/badge/%F0%9F%A7%A9_Install-komodo.user.js-blue" alt="Install" title="Install"/>
    </a>
  </p>

  <p class="projectDesc">
    A userscript that adds additional features for route planning on Komoot.com.
  </p>

  <br/>
</div>

> [!WARNING]
> This is currently an experimental project or proof-of-concept. It may contain bugs or incomplete features, and is not intended for production use. Breaking changes may be made at any time. Consider more stable alternatives for critical applications.

## 👋 About

Using [Komoot] for route planning? This script may help. It runs in your browser and adds additional features to the site to help you plan your next adventure.

### Features

- **🏷️ Custom tags**:
  - **Add**: Add custom tags like location, activity type, directionality, or difficulty to your routes
  - **Filter**: Filter your saved routes by tags to find the perfect route
  - **Customize**: Customize the appearance of tags using CSS

### Screenshots

| ![Screenshot of Komoot's route list page with Komodo](screenshots/route-list-page.png) |
| ---------------------------------------------------------------------------------- |
| _Komoot's route list page with Komodo - v0.1.0_           |

## 📦 Installation
>
> [!CAUTION]
> For security reasons, I do not recommend running scripts from the internet unless you understand what they are doing. If you are not a developer, I recommend reading the comments in the code and/or asking a LLM like [ChatGPT] or [Claude] to explain it to you.

I recommend using this script with a userscript manager because it will keep the script up-to-date and run it automatically when you visit the appropriate page. If you don't want to do that, you can also run it manually.

### Using a userscript manager

A userscript manager is a browser extension that allows you to organize and run scripts on websites. If you don't already have one, I would recommend [Violentmonkey], [Tampermonkey], [ScriptCat], or [Greasemonkey]. For more choices, see [this comparison table](https://github.com/awesome-scripts/awesome-userscripts?tab=readme-ov-file#compatibility).

Once installed, you can click the button below to install the latest version of the script:

[![Install](https://img.shields.io/badge/%F0%9F%A7%A9_Install-komodo.user.js-blue)](https://github.com/jerboa88/komodo/raw/refs/heads/main/dist/komodo.user.js)

You can also install a specific version of the script on the [releases page](https://github.com/jerboa88/komodo/releases).

### Manually
>
> [!NOTE]
> This only works once. If the page gets reloaded or you navigate away and come back, you will have to run the script again. If you want to run the script automatically, I suggest using a userscript manager.

Alternatively, you can run the script by going to a supported page, copying the code in [dist/komodo.user.js], and pasting it into your browser's devtools console. The following pages are supported:

- Route list page (ex. <https://www.komoot.com/user/YOUR_USER_ID/routes>)
- Route page (ex. <https://www.komoot.com/tour/YOUR_ROUTE_ID>)

<details>
  <summary><b>Detailed instructions:</b></summary>
  <ol>
    <li>Open <a href="https://www.komoot.com/user/YOUR_USER_ID/routes">komoot.com/user/YOUR_USER_ID/routes</a> or <a href="https://www.komoot.com/tour/YOUR_ROUTE_ID">komoot.com/tour/YOUR_ROUTE_ID</a> in your browser</li>
    <li>Open your browser's devtools console (<a href="https://balsamiq.com/support/faqs/browserconsole/">how?</a>)</li>
    <li>Copy the code in <a href="dist/komodo.user.js">dist/komodo.user.js</a> and paste it into the console. If this doesn't work or you see a warning message about pasting, see the <a href="#FAQ">FAQ</a>.</li>
    <li>Press enter to run the script. You should see the page update. If this doesn't happen, see the <a href="#FAQ">FAQ</a>.</li>
  </ol>
</details>

## 🕹️ Usage

All UI elements added to the Komoot website have a lizard icon (🦎) in the top right corner so they can be easily identified.

### Adding tags to routes

Tags can be added to a route by including a specially formatted label in the route name using the Komoot website or app as usual. There is currently no visual editor for tags.

Each tag must be in the format `[tagName:tagValue]` and adhere to the following formatting rules:

- Multiple tags can be added to a route, and they can be added anywhere in the route name (ex. `[status:WIP] My Route [direction:north]`)
  - Note that tags will be stripped from the route name, so if you add them inbetween words, the resulting title may have weird spacing
  - If you want cleaner route names on mobile, consider adding them at the end
- Tag names and values are case-sensitive (ex. `[status:WIP]` is different from `[status:wip]`)
- You can include whitespace around names and values—it will be stripped out when the tag is displayed (ex. `[a:b]`, `[a: b]`, and `[ a : b ]` are all equivalent)
- Spaces in the middle of tag names and values will be preserved, so you can have multi-word names and values (ex. `[Start Point:Home]`)
- The special characters `[`, `]`, and `:` are not allowed in tag names and values because they are used to delimit tags. Emojis, spaces, and all other characters are allowed (ex. `[🚗:💨]` is valid)

For example, setting a route name to `[status:WIP] My Route [Start_Point:Home] [direction:north]` will add the following tags to the route:

![direction: north](https://img.shields.io/badge/direction:%20north-yellowgreen)
![Start Point: Home](https://img.shields.io/badge/Start%20Point:%20Home-yellowgreen)
![status:WIP](https://img.shields.io/badge/status:%20WIP-yellowgreen)

### Loading all routes

This script uses the tags found in the route list to populate the filter controls.

By default, Komoot only loads a handful of routes at a time, so if you notice that some tag names/values are missing from the filter controls, click the `Load All Routes` button to force load the entire list of routes. This may take a few seconds to complete.

### Filtering by tags

On the route list page, you can filter routes by tag.

**Details:**

- A select box will be added to the `Filter by` section for each tag name. You can filter by multiple tag names at once.
- Selecting a value will filter the route list to only show routes with that value.
- Use <kbd>Ctrl</kbd>+<kbd>Click</kbd> to select multiple values or to unselect a previously selected value.

## 🤖 Advanced Usage

### Customizing the appearance of the UI

This script adds various classes, ids, data attributes, and CSS variables to the elements it creates or modifies. You can use these to further customize the appearance of the UI. To add custom CSS to pages, you can use a user style manager like [Stylus].

For example, you could use the following CSS to change the background color and add an emoji to all pills with the name `status` and the value `wip`:

```css
.komodo-pill[data-komodo-tag-name='status'][data-komodo-tag-value='WIP'] {
 background: orange;

 & > div::before {
  content: '🚧 ';
  font-size: x-small;
 }
}
```

| ![Screenshot of custom pills on the route list page](screenshots/route-list-page-custom-pills.png) |
| ---------------------------------------------------------------------------------- |
| _Custom pills on the route list page - v0.1.0_           |

Refer to the following files for details on the attributes added:

- Classes and data attributes: [src/constants.ts]
- CSS variables: [src/styles.css]

HTML `select` elements have their id set to an escaped version of the tag name which can be used for styling. For simple tag names like `status`, the id will also be `status`. For tag names with spaces or special characters like `start point`, the id will be something like `space_u0020_test`. It's probably easiest to inspect the element in your browser's dev tools to see what the id is if you want to use these values.

## ❓ FAQ

### Nothing shows up when I paste in the console / I get a warning when I try to paste in the console

Some browsers prevent you from pasting code in the console because it could be malicious. This is called Paste Protection and you can read more about it on the [Chrome for Developers Blog].

If this happens, follow the instructions in the console to re-enable pasting, and then try again. For Chrome, the following steps should work:

 1. Try to paste something in the console. You should get a warning message about pasting
 2. Type "allow pasting" in the console and press enter

 See [this video] for a visual walkthrough.

### I get an `Uncaught SyntaxError: Unexpected identifier` error when running the script

Make sure that you select the entire file with <kbd>Ctrl</kbd> + <kbd>A</kbd> when copying it. If part of the script is cut off, it won't work.

## 🤝 Contributing

If you encounter any problems with the script, feel free to [create an issue].

Pull requests, bug reports, translations, and other kinds of contributions are greatly appreciated. By contributing code, you agree to license your contributions under the terms of the [LICENSE].

### Background

This project is written in [TypeScript] and uses [Vite] and [vite-plugin-monkey] to bundle the code into a single file that can be installed as a userscript.

We use [Bun] for package management. You can use another package manager if you want, but you'll have to replace refererences to `bun` or `bunx` in the following places:

- Script commands in `package.json`
- Husky hooks in `.husky/*`
- Workflows in `.github/workflows/*`

We use the [Conventional Commits] specification for commit messages. These conventions are enforced using [Commitlint] via [Husky] pre-commit hooks.

We also use [Commitizen], so you can use `bun commit` to commit changes using an interactive prompt instead of `git commit`.

[Biome] is used for linting and formatting.

[Semantic Release] is used to automate the release process.

### Getting Started

To work on the project locally, first clone the repository and run `bun install` to install the dependencies.

To build the script, run `npm run build`. This will create a `dist` folder with the compiled script.

To run the script in development mode, run `npm run dev`. This will start a development server that will watch for changes and rebuild the script automatically.

## 🧾 License

This project is licensed under the MIT License. See [LICENSE] for details.

The project logo is from the [Fluent Emoji] collection, licensed under the [MIT License].

This project is not affiliated with or endorsed by Komoot in any way.

## 🖇️ Related

- **[Better Segments for Strava]** - A userscript for Strava that adds additional stats and features to the starred segments page.

## 💕 Funding

Find this project useful? [Sponsoring me] will help me cover costs and **_commit_** more time to open-source.

If you can't donate but still want to contribute, don't worry. There are many other ways to help out, like:

- 📢 reporting (submitting feature requests & bug reports)
- 👨‍💻 coding (implementing features & fixing bugs)
- 📝 writing (documenting & translating)
- 💬 spreading the word
- ⭐ starring the project

I appreciate the support!

[Better Segments for Strava]: https://github.com/jerboa88/better-segments-for-strava
[Biome]: https://biomejs.dev/
[Bun]: https://bun.sh/
[ChatGPT]: https://chatgpt.com/
[Chrome for Developers Blog]: https://developer.chrome.com/blog/self-xss
[Claude]: https://claude.ai
[Commitizen]: https://commitizen-tools.github.io/commitizen/
[Commitlint]: https://commitlint.js.org/
[Conventional Commits]: https://www.conventionalcommits.org/
[create an issue]: https://github.com/jerboa88/komodo/issues
[dist/komodo.user.js]: dist/komodo.user.js
[Fluent Emoji]: https://github.com/microsoft/fluentui-emoji
[Greasemonkey]: https://github.com/greasemonkey/greasemonkey
[Husky]: https://typicode.github.io/husky/
[Komoot]: https://www.komoot.com/
[LICENSE]: LICENSE
[MIT License]: https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE
[ScriptCat]: https://docs.scriptcat.org/
[Semantic Release]: https://semantic-release.gitbook.io/semantic-release/
[Sponsoring me]: https://johng.io/funding
[src/constants.ts]: src/constants.ts
[src/styles.css]: src/styles.css
[Stylus]: https://github.com/openstyles/stylus
[Tampermonkey]: https://www.tampermonkey.net/index.php
[this video]: https://youtu.be/X5uyCtVD1-o?si=AOrzgez90KiDlA-z&t=11
[TypeScript]: https://www.typescriptlang.org/
[Violentmonkey]: https://violentmonkey.github.io/
[vite-plugin-monkey]: https://github.com/lisonge/vite-plugin-monkey
[Vite]: https://vite.dev/
