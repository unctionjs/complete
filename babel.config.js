module.exports = {
  "sourceMaps": "inline",
  presets: [
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-proposal-object-rest-spread",
  ],
  env: {
    main: {
      presets: [
        ["@babel/preset-env", {useBuiltIns: "usage", corejs: "3.6", targets: {"node": 10}}],
        "minify"
      ]
    },
    browser: {
      presets: [
        ["@babel/preset-env", {useBuiltIns: "usage", corejs: "3.6"}],
        "minify"
      ]
    },
    test:{
      presets: [
        ["@babel/preset-env", {useBuiltIns: "usage", corejs: "3.6", targets: {"node": "current"}}],
        "minify"
      ],
      "plugins": [
        "annotate-console-log"
      ]
    }
  }
};
