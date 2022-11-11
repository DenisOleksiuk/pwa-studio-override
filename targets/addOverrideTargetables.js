const stylesInterceptor = require('../targetables/styles');
const componentsInterceptor = require('../targetables/components');

module.exports = (targetables, options) => {
    const { styles: stylesOptions } = options || {};
    stylesInterceptor(targetables, stylesOptions);
    componentsInterceptor(targetables);
};
