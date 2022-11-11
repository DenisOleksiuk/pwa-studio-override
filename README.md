# PWA Studio override

```js
function localIntercept(targets) {
    const { Targetables } = require('@magento/pwa-buildpack');
    const targetables = Targetables.using(targets);
    const {
        addExtensibilityTargetables
    } = require('@vasilii-burlacu/pwa-studio-extensibility/targets');

    addExtensibilityTargetables(targetables, {
        styles: {
            useScssOverCss: true
        }
    });
}

module.exports = localIntercept;
```
