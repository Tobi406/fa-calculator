module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: "no-2009"
        },
        stage: 3,
        features: {
          'custom-properties': false
        },
      },
    ],
    [
      'postcss-purgecss',
      {
        content: [
          './src/**/*.{js,jsx,ts,tsx}',
          './src/**/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ["html", "body"],
      },
    ],
  ],
};
