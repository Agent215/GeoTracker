const { getDefaultConfig } = require("metro-config");
const blacklist = require('metro-config/src/defaults/blacklist');


module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts, blacklistRE }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
      blacklistRE: blacklist([/#current-cloud-backend\/.*/]),
    }
  };
})();