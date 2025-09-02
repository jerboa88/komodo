---
order: 0
---

# Tags

Komodo lets you add arbitrary tags to tours to help you organize and filter them. Tags are shown as pills under the title of each tour.

When viewing tours, you can choose to either include, exclude, or ignore them based on their tags.

## Add tags

> Supported pages: [<Badge type="info">tour view</Badge>]

Tags can be added to a tour by including a specially formatted label in the tour name using the Komoot website or app as usual. There is currently no visual editor for tags.

For example, setting a tour name to `[status:WIP] My Tour [Start Point:Home] [direction:north]` will add the following tags to the tour:

::: info My Tour
<p>
  <Badge type="tip" text="direction: north" />
	<Badge type="tip" text="Start Point: Home" />
	<Badge type="tip" text="status: WIP" />
</p>
:::

### Tag formats

Tags can be written in several ways. Here are some examples:

| Example                            | Explanation                                                                                                                     | Input                      | Preview                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------- |
| **Single tag**                     | A tag is made up of a name, separator, and value, surrounded by square brackets.                                                | `[direction:North]`        | <Badge type="tip" text="direction: North" />                                       |
| **Multiple tags**                  | You can include multiple tags in a tour, and they can be anywhere in the tour name.                                             | `[dir:N] [type:loop]`      | <Badge type="tip" text="dir: N" /><Badge type="tip" text="type: loop" />           |
| **Multiple tags w/ the same name** | You can even have multiple tags with the same name.                                                                             | `[if:sunny] [if:rainy]`    | <Badge type="tip" text="if: sunny" /><Badge type="tip" text="if: rainy" />         |
| **Multiple inline values**         | To save space, you can add multiple values in a single tag, separated by commas. They will still be displayed as separate tags. | `[members:Jerry,Liu]`      | <Badge type="tip" text="members: Jerry" /><Badge type="tip" text="members: Liu" /> |
| **Nameless tags**                  | Tags don't need to have a name. This is useful for tags that are either true or false.                                          | `[downhill] [low traffic]` | <Badge type="tip" text="downhill" /><Badge type="tip" text="low traffic" />        |
| **Multiple inline nameless tags**  | You can have multiple values in a nameless tag.                                                                                 | `[downhill, low traffic]`  | <Badge type="tip" text="downhill" /><Badge type="tip" text="low traffic" />        |

> [!TIP]
> Note that tags will be stripped from the tour name when displayed, so if you add them between words, the resulting title may have weird spacing.
>
> If you want cleaner tour names on mobile, consider adding them at the end.

### Allowed characters

Tags can contain almost any value:

| Example                     | Explanation                                                                                                  | Input                             | Preview                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------- | --------------------------------------------------------------------------- |
| **Capital letters**         | Tags are case-sensitive.                                                                                     | `[a:b] [A:B]`                     | <Badge type="tip" text="a: b" /><Badge type="tip" text="A: B" />            |
| **Whitespace**              | You can include whitespace around names and values—it will be stripped out when the tag is displayed.        | `[a:b]`, `[a: b]`, or `[ a : b ]` | <Badge type="tip" text="a: b" />                                            |
| **Multi-word names/values** | Spaces in the middle of tag names and values will be preserved, so you can have multi-word names and values. | `[Start Point:Home]`              | <Badge type="tip" text="Start Point: Home" />                               |
| **Numbers**                 | Numbers are allowed.                                                                                         | `[priority:6] [420:yes]`          | <Badge type="tip" text="priority: 6" /><Badge type="tip" text="420: yes" /> |
| **Emojis**                  | Emojis are allowed.                                                                                          | `[📍:ATL] [by:🚗]`                  | <Badge type="tip" text="📍: ATL" /><Badge type="tip" text="by: 🚗" />         |
| **Special characters**      | Most special characters are allowed. See below for details.                                                  | `[difficulty:!@#$%]`              | <Badge type="tip" text="difficulty:!@#$%" />                                |

> [!TIP]
> Although you can use emojis, it might be better to use easy to type names/values and replace them with emojis for display purposes using CSS. This is described in more detail in the [advanced usage] section.
>
> If you use Komoot on mobile, it might be a good idea to name tags such that you can filter them using the built-in search function.

### Disallowed characters

The special characters `[`, `]`, and `:`, and `,` are not allowed in tag names and values because they are used to delimit tags. Using one of these values may result in undefined behavior. Emojis, spaces, and all other characters are allowed.

> [!TIP]
> The delimiters used by the script are defined in [src/constants.ts]. If you need to use different characters, you can change them and [build the script] yourself.

## View tags

> Supported pages: [<Badge type="info">tour list</Badge>] [<Badge type="info">tour view</Badge>] [<Badge type="info">tour zoom</Badge>]

Tags are automatically extracted from tour titles and displayed as pills. If the tour title in multiple locations on the page, the associated tag pills will only be displayed once to prevent clutter. Tags will also be removed from the the page (document) title if applicable.

## Filter by tags

> Supported pages: [<Badge type="info">tour list</Badge>]

On tour list pages (i.e. `Saved routes` and `Completed activities`), you can filter tours by tag. A group of checkboxes will be added to the `Filter by` section for each tag name.

By default, nothing will be filtered out of the list. Click a checkbox once to only show tours with that value. Click the checkbox a second time to **exclude** any tours with that value. You can click once more to reset the checkbox.

| ![Screenshot of an unselected checkbox](/checkbox-unselected.png) | ![Screenshot of an include checkbox](/checkbox-include.png) | ![Screenshot of an exclude checkbox](/checkbox-exclude.png) |
| ----------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| _An unselected checkbox_                                          | _An include checkbox_                                       | _An exclude checkbox_                                       |

You can filter by multiple tag names/values at the same time. By include/exclude checking all checkboxes in a tag name group, you can effectively filter tours by the presence of that tag name. For example, exclude checking all checkboxes for the `status` tag name will show you tours that you haven't assigned a status.

> [!TIP]
> It is also possible to search through tags using the search box, because the built-in Komoot search feature still uses the original tour titles.
>
> This means keyword order is important while searching, and because keywords you enter may unexpectedly match tags, you may want to name them accordingly to avoid this.
>
> For example, you could search for `[status:` to get all tours with tag name `status`.

## Load all tours

> Supported pages: [<Badge type="info">tour list</Badge>]

This script uses the tags found in the tour list to populate the filter controls.

By default, Komoot only loads a handful of tours at a time, so if you notice that some tag names/values are missing from the filter controls, click the `Load All Routes`/`Load All Activities` button to force load the entire list of tours. This may take a few seconds to complete.

[src/constants.ts]: https://github.com/jerboa88/komodo/blob/main/src/constants.ts

[advanced usage]: /docs/advanced-usage/customizing-the-ui
[build the script]: /contributing/local-development
[<Badge type="info">tour list</Badge>]: /docs/usage/#supported-pages
[<Badge type="info">tour view</Badge>]: /docs/usage/#supported-pages
[<Badge type="info">tour zoom</Badge>]: /docs/usage/#supported-pages
