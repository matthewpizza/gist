# async-gist

Gist embeds like this one:

```html
<script src="https://gist.github.com/matthewspencer/005044062dd93fbe59ce.js"></script>
```

Use `document.write()` which is totally uncool if you are doing stuff like `history.pushState()`.

This plugin provides an alternative way to embed gists.

## Usage

In your JavaScript you’ll want:

```javascript
$('[data-gist]').gist()
```

Which maps to the corresponding markup:

```html
<div data-gist="005044062dd93fbe59ce"></div>
```

Or if you want to embed a specific file from a gist:

```html
<div data-gist="005044062dd93fbe59ce" data-file="access_to_tools-sh"></div>
```