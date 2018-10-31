# Prismo for VSCode

[![Visual Studio Marketplace](https://img.shields.io/vscode-marketplace/d/guywaldman.prismo.svg)](https://marketplace.visualstudio.com/items?itemName=guywaldman.prismo)
[![Travis branch](https://img.shields.io/travis/guywald1/vscode-prismo/master.svg)](https://travis-ci.org/guywald1/vscode-prismo)

Visual Studio Code extension to beautify your titles, sections and separators.

[Marketplace](https://marketplace.visualstudio.com/items?itemName=guywaldman.prismo) | [GitHub](https://github.com/guywald1/vscode-prismo)

<!-- ![Preview](https://raw.githubusercontent.com/guywald1/vscode-prismo/master/assets/preview.gif) -->

![Preview](/assets/preview-comments.gif)

---

## Motivation

Prismo is a small, lightweight extension with a very simple premise: it offers assistance in separating your source code into convenient, structured sections.

I like neat and clean source code. Generally, decorated titles in source code (as pretty as they may be) can be obtrusive and even sometimes obnoxious to work with for other developers skimming through your code in the future.

However, in some cases, well-placed titles can add structure to your source code (especially on projects where large files cannot be avoided). This is where Prismo shines.

> You may be familiar with my previous plugins that achieved similar goals - [AutoSect for Atom](https://github.com/guywald1/auto-sect) and [Prismo for vim](https://github.com/guywald1/vim-prismo).

> **Note:** full-width spanning titles can be obtrusive and are recommended to be used with caution. In some instances, in my opinion, they can be helpful.
> An option to configure the width on all title variations is available as `width` (0 for full width).

## Features

- Can comment out a line or several lines into a title
- Formatting is highly configurable (width, dash, format, casing) , and is available in three variations (_normal_, _light_, _hair_)
- Commenting format can be user-defined
- Ability to add regions by selection
- For languages not registered by VSCode by default (read: [language identifiers](https://code.visualstudio.com/docs/languages/identifiers)), the user will specify the format of their choosing

## Features to be Added

- Ability to configure, for each level, whether the width should be absolute or relative (and take indentation into consideration)
- Ability to configure, for each level, whether the title should be padded on the left and whether the title should be padded on the right
- Decorations?

## Top-Level Configuration

### `prismo.commentPatterns`

This is a top-level configuration object containing a mapping of a language identifier to its respective commenting pattern, with the title represented by `%s`.
For example, a row containing `hello world` and the commenting pattern `#%s#` could be commented like so: `# --- hello world --- #`.
For a language not existing in the extension's presets, the user will have to input the appropriate commenting pattern and it will be saved in this object.

Example configuration:

```json
{
  "python": "#%s",
  "javascript": "//%s"
}
```

## Level-specific Configuration

There are three variations/**levels**:

- **Normal**: This title is the regular title you would get when calling `> Prismo: Decorate Title`.
  By default, it spans across the entire document and should be used for top-level separation.
- **Light + Hair**: These title variations are for subtitles.

You can customize the configurations per level, meaning `prismo.normal` contains the configurations for the top-level titles and `prismo.light` and `prismo.hair` contain the same types of options.

`prismo.normal`, `prismo.light` and `prismo.hair` are all objects containing the following properties:

- `dash` (_string_): Type of dash decorating the title, i.e. `-` -> `--- TITLE ---` or `~` -> `~~~ TITLE ---`
- `padding` (_number_): Length of the padding surrounding the title text.
- `shouldUppercase` (_boolean_): Whether the title should be uppercased.
- `width` (_number_): Width of the title.

However, they have different defaults.

### Default Configurations Per Level

- `prismo.normal`:

  - `dash`: "-"
  - `padding`: 1
  - `shouldUppercase`: true
  - `width`: 0 (full width)

- `prismo.light`:

  Same as `prismo.normal`, except:

  - `width`: 40
  - `shouldUppercase`: false

- `prismo.hair`:

  Same as `prismo.normal`, except:

  - `width`: 30
  - `shouldUppercase`: false

## Regions

![Preview](/assets/preview-regionize.gif)

Use **_Prismo -> Regionize_** to add regions to your source code.
Similarly to comments, it draws its patterns from `prismo.regionPatterns` configuration.

Is planned to be more configurable in the future.
