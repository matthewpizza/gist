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

## Options

A few options can be passed, for example, here we make the timeout 2 seconds:

```javascript
$('[data-gist]').gist({
  timeout: 2000
})
```

### `timeout`

**Default:** `1000`

**Description:** How long to wait for the `jsonp`.

### `success`

**Default:** `onAjaxSuccess`

**Description:** It is best to leave this alone and let the internal function do the need. It’ll load the needed stylesheet and gist content.

### `error`

**Default:** `onAjaxError`

**Description:** It is also best to leave this alone. It’ll display a link to the gist on failure to load.