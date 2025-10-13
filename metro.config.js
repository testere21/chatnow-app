const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Metro bundler hatalarını önlemek için
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Cache ayarları - InternalBytecode.js hatasını önlemek için
config.cacheStores = [];

// Resolver ayarları - InternalBytecode.js dosyasını ignore et
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.blacklistRE = /InternalBytecode\.js$/;

// Transformer ayarları
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    keep_fnames: true,
    mangle: {
      keep_fnames: true,
    },
  },
  // Source map ayarları
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

// Serializer ayarları
config.serializer = {
  ...config.serializer,
  createModuleIdFactory: function () {
    return function (path) {
      // InternalBytecode.js hatasını önlemek için
      if (path.includes('InternalBytecode.js')) {
        return 'InternalBytecode';
      }
      return path;
    };
  },
};

module.exports = config;
