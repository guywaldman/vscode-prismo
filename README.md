# Prismo for VSCode

Visual Studio Code extension to beautify your titles, sections and separators.

[See in VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=guywaldman.prismo)

[See on GitHub](https://github.com/guywald1/vscode-prismo)

![Preview](https://media.giphy.com/media/xT9IgC3hcjvU59RnfW/giphy.gif)

# Motivation
I like neat and clean source code. It helps to visually separate sections in files (which arguably would be better off in a separate file on occasion) and I don't like manually aligning my titles and conforming to my OCD.

> Note: full-width spanning titles can be obtrusive and are recommended to be used with caution. In some instances, in my opinion, they can be helpful.
> Soon an option to opt-out of full width on the _normal_ title variation will be available.

# Introduction
> You may be familiar with my previous plugins that achieved similar goals - [AutoSect for Atom](https://github.com/guywald1/auto-sect) and [Prismo for vim](https://github.com/guywald1/vim-prismo).

> For future reference, I will call a section/title/separator by the generic name of _title_.

Who among has not wished for an easy way to format our titles? Sometimes, we just want to annotate a certain section of our code in a beautiful manner.

This extension will help you format your source code titles as you see fit. It is highly configurable so you may set them according to your personal tastes.

There are three variations:

### Normal

This title is the regular title you would get when calling `> Prismo: Decorate Title`.
By default, it spans across the entire document and should be used for top-level separation.

### Light and Hair

These title variations are for subtitles.

IMO, _light_ should be used for subtitles and _hair_ for separating your inner-most comment regions.

# Configuration

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

**Default (overrides)**:

**width**: 40
**shouldUppercase**: false

### `prismo.hair`

**Default (overrides)**:

**width**: 30
**shouldUppercase**: false

# Future ImprovementsA

## Region Sectioning

_VSCode_, among other code editors, allows the use of [region](https://code.visualstudio.com/docs/editor/codebasics#_folding) for folding.
The user will be able to execute a command for selecting multiple lines, entering the desired title, and adding comments for making it a region.

  > i.e. seleting:
  > ```javascript
  > const obj = { foo: 'bar' }
  > console.log(obj.foo)
  > ```
  > and entering _myTitle_ would replace the selected lines into something like:
  > ```javascript
  > // ------- myTitle -------
  > 
  > //#region myTitle
  > const obj = { foo: 'bar' }
  > console.log(obj.foo)
  > //#endregion myTitle
  > ```

## Colored Titles

The user will be able to configure colors for their titles (similarly to the [todo-highlight](https://github.com/wayou/vscode-todo-highlight) extension).

## Multiple Variations

The user will be able to set more than three variations for titles and subtitles.

