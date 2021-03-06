module.exports = {
  presets: [
    '@babel/env',
    '@babel/typescript'
  ],
  plugins:
    [
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
      ['babel-plugin-inline-import', {
      extensions: [
        '.ejs',
      ],
    }],
  ],
};
