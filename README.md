# Kappa Tea!

This is Starry Monlark's personal website, based on the [fuwari](https://github.com/saicaca/fuwari/) template, which is powered by [Astro](https://astro.build/).

The title is *偏微分茶会*, or *Partial Differential Tea Time*.

Well, the name in English is a bit too long, and I'd rather call it *Kappa Tea!*, where *kappa* means the greek letter `κ`, and *kappa tea* sounds like some kind of misspelling of *cuppa tea (cup of tea)*.

For more details, please view the website's [About](https://www.monlark.top/about/) page and [Open Source Licenses](https://www.monlark.top/open-source-licenses/) page.

...or if you're interested , you can view my posts on [https://www.monlark.top/](https://www.monlark.top/).

## TO-DO List

### Feature Extensions

#### Practical Features

- [x] Custom frontmatter `series` for posts, and `Series` (i18n name is Post Collections) widget showing posts of the same series
- [ ] An series page to classify posts by `series` (by `categories` if `series` undefined, and classified as "Uncategorized" if both undefined), similar to the existing archive page (where posts are simply listed chronologically)
- [ ] Templates for tiny files sharing, as a replacement of the old blog's [MIDI column](https://blog.strmnl.top/midi/)

#### Trivial Matters to Make Life Easier

- [x] Custom icon & title for the home buttton of the navigation bar
- [ ] Custom fonts *(partially implemented)*
- [x] Custom footer, can be configurated through `src/config.ts` or stringified JSON in environment variables.

### Bug Fixes / Issue Resolutions

- [ ] Broken TOC in some scaling ratios *([matsuzaka-yuki/Mizuki #32](https://github.com/matsuzaka-yuki/Mizuki/issues/32))*
- [ ] A "word" overflows when it is extremely long, even when it is actually a link *([#7](https://github.com/StrMnL/diff-teatime/issues/7))*
- [ ] Sidebar's `sidebar-sticky` section always refreshes when switching between different pages, even when nothing changes *([#8](https://github.com/StrMnL/diff-teatime/issues/8))*