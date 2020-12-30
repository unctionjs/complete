module.exports = {
  presets: [
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-proposal-object-rest-spread",
    ["@babel/plugin-proposal-pipeline-operator", {"proposal": "fsharp"}]
  ],
  env: {
    main: {
      presets: [
        ["@babel/preset-env", {"modules": "cjs", useBuiltIns: "usage", corejs: 3, targets: {"node": 14}}],
        "minify"
      ]
    },
    module: {
      presets: [
        ["@babel/preset-env", {"modules": false, useBuiltIns: "usage", corejs: 3, targets: {"node": 14}}],
        "minify"
      ]
    },
    browser: {
      sourceMaps: "inline",
      presets: [
        ["@babel/preset-env", {useBuiltIns: "usage", corejs: 3}],
        "minify"
      ]
    },
    test:{
      presets: [
        ["@babel/preset-env", {useBuiltIns: "usage", corejs: 3, targets: {"node": "current"}}]
      ],
      "plugins": [
        "annotate-console-log"
      ]
    }
  }
};
