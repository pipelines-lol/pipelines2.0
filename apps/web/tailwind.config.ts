import sharedConfig from "@pipelines/tailwind-config";
module.exports = {
  content: ["./src/app/**/*.tsx", "./src/components/**/*.tsx"],
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        "pipelines-gray-100": "#F7F7F7",
        "pipelines-gray-500": "#444444",
        "pipeline-blue-200": "#0265AC",
      },
      animation: {
        "infinite-scroll": "infinite-scroll 265s linear infinite",
        blob: "blob 7s infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-180%)" },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "50%": {
            transform: "translate(0px, -5px) scale(1.2)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
};
