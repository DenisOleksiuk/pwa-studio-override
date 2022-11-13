# PWA Studio override

Example of how to connect extension to PWA Studio.

```js
function localIntercept(targets) {
    const { Targetables } = require('@magento/pwa-buildpack');
    const targetables = Targetables.using(targets);
    const { addOverrideTargetables } = require('pwa-studio-override/targets');

    addOverrideTargetables(targetables, {
        styles: {
            useScssOverCss: true
        }
    });
}

module.exports = localIntercept;
```
