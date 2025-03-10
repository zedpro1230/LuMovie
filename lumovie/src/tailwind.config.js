module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontSize: {
        " xxs": "0.625rem", // 10px
        "xs-plus": "0.8125rem", // 13px
        md: "1.0625rem", // 17px
        "4.5xl": "2.5rem", // 40px
        "2.5xl": "1.6875rem", // 27px
        // Add any other custom sizes you need
      },
    },
  },
  plugins: [],
};
