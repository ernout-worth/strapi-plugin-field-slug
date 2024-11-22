/**
 * @typedef {Record<string, string>} TradOptions
 */

/**
 * Prefixes all translation keys with a plugin ID
 * @param {TradOptions} trad - Object containing translation key-value pairs
 * @param {string} pluginId - Plugin identifier to prefix translation keys with
 * @returns {TradOptions} New object with prefixed translation keys
 * @throws {TypeError} When pluginId is empty
 */
const prefixPluginTranslations = (trad, pluginId) => {
  if (!pluginId) {
    throw new TypeError("pluginId can't be empty");
  }

  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId}.${current}`] = trad[current];
    return acc;
  }, {});
};
export default prefixPluginTranslations;
