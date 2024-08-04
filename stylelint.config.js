export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-vue/scss",
    "stylelint-config-html",
  ],
  rules: {
    "color-function-notation": "legacy",
    "color-hex-length": "long",
    "no-descending-specificity": null,
    "no-empty-source": null,
    "max-nesting-depth": null,
    "selector-max-compound-selectors": null,
    "declaration-block-no-redundant-longhand-properties": null,
    "media-feature-range-notation": null,
    "function-url-quotes": "never",
    "selector-max-id": 2,
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep"],
      },
    ],
  },
}
