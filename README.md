# Kardeshev Audio Renderer

This is an audio renderer compliant with the Arweave [ANS-108 spec](https://specs.arweave.dev/?tx=rF3z0U1rsUJyJLhKGzigoPZPuxuHn3HRT80SZdGQBd4).

The renderer is available [here](https://audio-renderer_project-kardeshev.arweave.dev).


## Usage

To implement this renderer on your website, you can use an `iframe` html element, or link to it directly.

```html
    <iframe src="https://audio-renderer_project-kardeshev.ar-io.dev/?tx=c0aqsecXGvvO0rO8pqbr5JyC3N8WMtZWc8Upq8jYEYc"
        width="100%" height="100%">
        </iframe>
```

## Developers

To deploy the renderer:
- `yarn`
- `yarn build`

You can then use your method of choice to deploy a permaweb app, we used [dragondeploy](https://dragondeploy.xyz)

## Example

See the [example](./example/index.html)