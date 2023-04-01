/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.tsx"],
  // @ts-ignore
  presets: [require("@sc/tailwind-config")],
  plugins: [require("@tailwindcss/forms")],
};

module.exports = config;
