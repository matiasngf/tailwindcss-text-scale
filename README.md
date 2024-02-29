<img src="https://raw.githubusercontent.com/matiasngf/tailwindcss-text-scale/main/text-scale-logo.png"/>

Scale your text between breakpoints to create a better responsive experience.

```html
<h2 className="text-min-lg text-max-4xl">
  This text will scale between lg on mobile and 4xl on desktop.
</h2>
```

<a href="https://tailwindcss-text-scale.vercel.app/" target="_blank">Demo</a> | 
<a href="https://www.npmjs.com/package/tailwindcss-text-scale" target="_blank">NPM</a> |
<a href="https://github.com/matiasngf/tailwindcss-text-scale" target="_blank">GitHub</a>

## Installation

```bash
npm i -d tailwindcss-text-scale
```

Add the pluign on your `tailwind.config.js` file:

```tsx
import textScalePlugin from 'tailwindcss-text-scale'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    textScalePlugin({
      minScreen: 320, // optional, defaults to theme.screens.sm
      maxScreen: 1920, // optional, defaults to theme.screens.2xl
    })
  ],
}
```

> If you dont have a screens.sm or screens.2xl on your theme, you need to set the options `minScreen` and `maxScreen`.

## Scaling text

`text-min-[size]` and `text-max-[size]` will scale your font-size between the two breakpoints.

```html
<h2 className="text-min-lg text-max-4xl">
  Scaled text
</h2>
```

You can use any font-size you want:

```html
<h2 className="text-min-[13px] text-max-[20px]">
  Scaled text
</h2>
```

To scale the text correclty you should use pixels or rems only.

## Breakpoints

if you need to set a custom breakpoint for a component, you can use the `text-screen-min-[size]` and `text-screen-max-[size]` classes.

```html
<div className="text-screen-min-[300px] text-screen-max-lg">
  <h2 className="text-min-xs text-max-[40px]">
    Scale this text between 300px and screen-lg.
  </h2>
</div>
```

## Plugin configurations

### Setting custom breakpoints

By default the plugin will use `screens.sm` and `screens.lg` as the min and max breakpoint for the text scaling. You can set custom breakpoints on the plugin configuration:

```tsx
textScalePlugin({
  maxScreen: 1920,
  minScreen: 320,
})
```

### Custom classNames

If you don't like using `text-min-[size]`, you can customize the variable name on the plugin configuration. For example, if you want your classes to be `scale-text-min-[size]`, you can set:

```tsx
textScalePlugin({
  prefix: 'scale-text',
})
```

Now, to scale your text, use:

```html
<h2 className="scale-text-min-xs scale-text-max-lg">
  Scaled!
</h2>
```

And to customize breakpoints:

```html
<div className="scale-text-screen-min-sm scale-text-screen-max-xl">
  {...content}
</div>
```