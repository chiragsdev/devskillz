const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: "./app.js", // Entry point of your server-side code
  output: {
    filename: "bundle.js", // Output file name
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  externals: {
    fs: "commonjs fs", // Exclude 'fs' module
    // Add other Node.js core modules here if needed
  },
  resolve: {
    extensions: [".js", ".json", ".node"],
  },
  stats: {
    errorDetails: true, // Enable error details
  },
};
