---
order: 0
---

# Tags

## Adding tags to routes

Tags can be added to a route by including a specially formatted label in the route name using the Komoot website or app as usual. There is currently no visual editor for tags.

Each tag must be in the format `[tagName:tagValue]` and adhere to the following formatting rules:

- Multiple tags can be added to a route, and they can be added anywhere in the route name (ex. `[status:WIP] My Route [direction:north]`)
	- Note that tags will be stripped from the route name, so if you add them inbetween words, the resulting title may have weird spacing
	- If you want cleaner route names on mobile, consider adding them at the end
- Tag names and values are case-sensitive (ex. `[status:WIP]` is different from `[status:wip]`)
- You can include whitespace around names and values—it will be stripped out when the tag is displayed (ex. `[a:b]`, `[a: b]`, and `[ a : b ]` are all equivalent)
- Spaces in the middle of tag names and values will be preserved, so you can have multi-word names and values (ex. `[Start Point:Home]`)
- The special characters `[`, `]`, and `:` are not allowed in tag names and values because they are used to delimit tags. Emojis, spaces, and all other characters are allowed (ex. `[🚗:💨]` is valid)

For example, setting a route name to `[status:WIP] My Route [Start Point:Home] [direction:north]` will add the following tags to the route:

::: info My Route
<p>
  <Badge type="tip" text="direction: north" />
	<Badge type="tip" text="Start Point: Home" />
	<Badge type="tip" text="status: WIP" />
</p>
:::

## Loading all routes

This script uses the tags found in the route list to populate the filter controls.

By default, Komoot only loads a handful of routes at a time, so if you notice that some tag names/values are missing from the filter controls, click the `Load All Routes` button to force load the entire list of routes. This may take a few seconds to complete.

## Filtering by tags

On the route list page, you can filter routes by tag. A group of checkboxes will be added to the `Filter by` section for each tag name.

By default, nothing will be filtered out of the list. Click a checkbox once to only show routes with that value. Click the checkbox a second time to **exclude** any routes with that value. You can click once more to reset the checkbox.

You can filter by multiple tag names/values at the same time. By include/exclude checking all checkboxes in a tag name group, you can effectively filter routes by the presence of that tag name. For example, exclude checking all checkboxes for the `status` tag name will show you routes that you haven't assigned a status.

It is also possible to search through tags using the search box, because the built-in Komoot search feature still uses the original route titles. This means keyword order is important while searching, and because keywords you enter may unexpectedly match tags, you may want to name them accordingly to avoid this. For example, you could search for `[status:` to get all routes with tag name `status`.
