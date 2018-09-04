# Prismo for VSCode

[![Visual Studio Marketplace](https://img.shields.io/vscode-marketplace/d/guywaldman.prismo.svg)](https://marketplace.visualstudio.com/items?itemName=guywaldman.prismo)
[![Travis branch](https://img.shields.io/travis/guywald1/vscode-prismo/master.svg)](https://travis-ci.org/guywald1/vscode-prismo)

Visual Studio Code extension to beautify your titles, sections and separators.

[Marketplace](https://marketplace.visualstudio.com/items?itemName=guywaldman.prismo)  |  [GitHub](https://github.com/guywald1/vscode-prismo)

<!-- ![Preview](https://raw.githubusercontent.com/guywald1/vscode-prismo/master/assets/preview.gif) -->

![Preview](/assets/preview.gif)

---

## Motivation

I like neat and clean source code. That's about all there is to it.

> You may be familiar with my previous plugins that achieved similar goals - [AutoSect for Atom](https://github.com/guywald1/auto-sect) and [Prismo for vim](https://github.com/guywald1/vim-prismo).

> **Note:** full-width spanning titles can be obtrusive and are recommended to be used with caution. In some instances, in my opinion, they can be helpful.
> An option to configure the width on all title variations is available as `width` (0 for full width).

## Features

* Can comment out a line or several lines into a title
* Formatting is highly configurable (width, dash, format, casing) , and is available in three variations (_normal_, _light_, _hair_)
* For languages not registered by VSCode by default (read: [language identifiers](https://code.visualstudio.com/docs/languages/identifiers)), the user will specify the format of their choosing

## Features to be Added

* Ability to separate a multi-line selection into _regions_ (i.e. starting with `#region <REGION_NAME>` and ending with `#endregion <REGION_NAME>`)
* Decorations?

## Configuration

> For future reference, I will call a section/title/separator by the generic name of _title_.

This extension will help you format your source code titles as you see fit. It is highly configurable so you may set them according to your personal tastes.

There are three variations:

* **Normal**: This title is the regular title you would get when calling `> Prismo: Decorate Title`.
    By default, it spans across the entire document and should be used for top-level separation.
* **Light + Hair**: These title variations are for subtitles.

IMO, _light_ should be used for subtitles and _hair_ for separating your inner-most comment regions.

You have several options to configure Prismo in your `settings.json`.
The top-level ones are for the _normal_ title (calling `> Prismo: Decorate Title`):

### `prismo.dash`

The character to be used as a dash.

**type**: _string_

**Default**: _-_

### `prismo.width`

How wide the title should span.

If it is 0, the title will span across the entire editor width.

**type**: _number_

**Default**: 0

### `prismo.padding`

Padding between the title and the dashes.

> i.e. with a padding of _4_:
> ```
> /* ---    myTitle    ---
> ```

**type**: _number_

**Default**: 1

### `prismo.shouldUppercase`

Whether the title should be uppercased or not.

**type**: _boolean_

**Default**: true

## `prismo.light` and `prismo.hair`

These are configurations for your title variatons.
Both are objects containing the properties:

- dash
- padding
- shouldUppercase
- width

All are identical to the top-level ones, and are specific to each title variation.

However, they have different defaults.

### `prismo.light`

**Defaults**:

* **width**: 40
* **shouldUppercase**: false

### `prismo.hair`

**Defaults**:

* **width**: 30
* **shouldUppercase**: false

### `prismo.commentPatterns`

This is an object containing a mapping of a language identifier to its respective commenting pattern, with the title represented by `%s`.
For example, a row containing `hello world` and the commenting pattern `# %s #` could be commented like so: `# --- hello world --- #`.
For a language not existing in the extension's presets, the user will have to input the appropriate commenting pattern and it will be saved in this object.

Example configuration:

```json
{
    "python": "# %s",
    "javascript": "// %s"
}
```
