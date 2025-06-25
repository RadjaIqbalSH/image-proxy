const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
  entry: './src/signer.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'production',
  plugins: [
    new WebpackObfuscator(
      {
        rotateStringArray: true,
        stringArray: true,
        stringArrayEncoding: ['rc4'], // << Ubah base64 jadi rc4
        stringArrayThreshold: 1,
        compact: true,
        selfDefending: true
      },
      []
    )

  ]
};
