/**
 * Simplifying styling
 *
 * Makes it easier to adjust the styles of the Venia storefront.
 * This is a customization of the solution from the web.
 * @see https://dev.to/chrisbrabender/simplifying-styling-in-pwa-studio-1ki1
 *
 * @param targetables
 */
module.exports = (targetables, settings) => {
    const { useScssOverCss = false } = settings || {};
    const extension = useScssOverCss ? 'scss' : 'css';
    const globby = require('globby');
    const fs = require('fs');
    const path = require('path');
    const magentoPath = path.resolve(__dirname, '..', '..', '@magento');

    (async () => {
        // Load CSS files from src/components
        const componentsPath = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'src',
            'components'
        );

        const paths = await globby(`${componentsPath}/**/*.${extension}`);

        paths.forEach((myPath) => {
            let absolutePath = myPath.replace(
                componentsPath,
                path.resolve(magentoPath, 'venia-ui', 'lib', 'components')
            );

            if (useScssOverCss) {
                /**
                 * need to change the extension from SCSS to CSS
                 * because we target the CSS files in Venia.
                 */
                absolutePath = absolutePath.replace('.scss', '.css');
            }

            // Identify if local component maps to 'venia-ui' component
            fs.stat(absolutePath, (err, stat) => {
                if (!err && stat && stat.isFile()) {
                    /**
                     * This means we matched a local file to something in venia-ui
                     * Next: find the JS component from our CSS file name
                     */
                    const jsComponentPath = absolutePath.replace('.module.css', '.js');

                    // Load the relevant 'venia-ui' component
                    const module = targetables.module(jsComponentPath);
                    // Add import to for the custom CSS classes
                    module.addImport(`import customClasses from "${myPath}"`);
                    // Update the `mergeClasses()` method to inject the additional custom css
                    module.insertAfterSource(
                        'const classes = useStyle(defaultClasses, ',
                        'customClasses, '
                    );
                }
            });
        });
    })();
};
