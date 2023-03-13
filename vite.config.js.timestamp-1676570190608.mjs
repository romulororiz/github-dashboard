// vite.config.js
import react from "file:///C:/Users/41783/Desktop/R%C3%B4mulo/Coding/Projects/React/github-dashboard/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/41783/Desktop/R%C3%B4mulo/Coding/Projects/React/github-dashboard/node_modules/vite/dist/node/index.js";
import { ViteAliases } from "file:///C:/Users/41783/Desktop/R%C3%B4mulo/Coding/Projects/React/github-dashboard/node_modules/vite-aliases/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic"
    }),
    ViteAliases()
  ],
  define: {
    "process.env": {
      VITE_APP_GITHUB_URL: JSON.stringify(process.env.VITE_APP_GITHUB_URL),
      VITE_APP_GITHUB_TOKEN: JSON.stringify(process.env.VITE_APP_GITHUB_TOKEN)
    }
  },
  server: {
    port: 3e3,
    proxy: {
      "/api": {
        target: "https://api.github.com",
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw0MTc4M1xcXFxEZXNrdG9wXFxcXFJcdTAwRjRtdWxvXFxcXENvZGluZ1xcXFxQcm9qZWN0c1xcXFxSZWFjdFxcXFxnaXRodWItZGFzaGJvYXJkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw0MTc4M1xcXFxEZXNrdG9wXFxcXFJcdTAwRjRtdWxvXFxcXENvZGluZ1xcXFxQcm9qZWN0c1xcXFxSZWFjdFxcXFxnaXRodWItZGFzaGJvYXJkXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy80MTc4My9EZXNrdG9wL1IlQzMlQjRtdWxvL0NvZGluZy9Qcm9qZWN0cy9SZWFjdC9naXRodWItZGFzaGJvYXJkL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgVml0ZUFsaWFzZXMgfSBmcm9tICd2aXRlLWFsaWFzZXMnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0cGx1Z2luczogW1xuXHRcdHJlYWN0KHtcblx0XHRcdGpzeFJ1bnRpbWU6ICdjbGFzc2ljJyxcblx0XHR9KSxcblx0XHRWaXRlQWxpYXNlcygpLFxuXHRdLFxuXHRkZWZpbmU6IHtcblx0XHQncHJvY2Vzcy5lbnYnOiB7XG5cdFx0XHRWSVRFX0FQUF9HSVRIVUJfVVJMOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5WSVRFX0FQUF9HSVRIVUJfVVJMKSxcblx0XHRcdFZJVEVfQVBQX0dJVEhVQl9UT0tFTjogSlNPTi5zdHJpbmdpZnkocHJvY2Vzcy5lbnYuVklURV9BUFBfR0lUSFVCX1RPS0VOKSxcblx0XHR9LFxuXHR9LFxuXHRzZXJ2ZXI6IHtcblx0XHRwb3J0OiAzMDAwLFxuXHRcdHByb3h5OiB7XG5cdFx0XHQnL2FwaSc6IHtcblx0XHRcdFx0dGFyZ2V0OiAnaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbScsXG5cdFx0XHRcdGNoYW5nZU9yaWdpbjogdHJ1ZSxcblx0XHRcdFx0c2VjdXJlOiBmYWxzZSxcblx0XHRcdFx0d3M6IHRydWUsXG5cdFx0XHRcdGNvbmZpZ3VyZTogKHByb3h5LCBfb3B0aW9ucykgPT4ge1xuXHRcdFx0XHRcdHByb3h5Lm9uKCdlcnJvcicsIChlcnIsIF9yZXEsIF9yZXMpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdwcm94eSBlcnJvcicsIGVycik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cHJveHkub24oJ3Byb3h5UmVxJywgKHByb3h5UmVxLCByZXEsIF9yZXMpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdTZW5kaW5nIFJlcXVlc3QgdG8gdGhlIFRhcmdldDonLCByZXEubWV0aG9kLCByZXEudXJsKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRwcm94eS5vbigncHJveHlSZXMnLCAocHJveHlSZXMsIHJlcSwgX3JlcykgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXG5cdFx0XHRcdFx0XHRcdCdSZWNlaXZlZCBSZXNwb25zZSBmcm9tIHRoZSBUYXJnZXQ6Jyxcblx0XHRcdFx0XHRcdFx0cHJveHlSZXMuc3RhdHVzQ29kZSxcblx0XHRcdFx0XHRcdFx0cmVxLnVybFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxWixPQUFPLFdBQVc7QUFDdmEsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxtQkFBbUI7QUFHNUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsTUFBTTtBQUFBLE1BQ0wsWUFBWTtBQUFBLElBQ2IsQ0FBQztBQUFBLElBQ0QsWUFBWTtBQUFBLEVBQ2I7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNQLGVBQWU7QUFBQSxNQUNkLHFCQUFxQixLQUFLLFVBQVUsUUFBUSxJQUFJLG1CQUFtQjtBQUFBLE1BQ25FLHVCQUF1QixLQUFLLFVBQVUsUUFBUSxJQUFJLHFCQUFxQjtBQUFBLElBQ3hFO0FBQUEsRUFDRDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ04sUUFBUTtBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLFFBQ1IsSUFBSTtBQUFBLFFBQ0osV0FBVyxDQUFDLE9BQU8sYUFBYTtBQUMvQixnQkFBTSxHQUFHLFNBQVMsQ0FBQyxLQUFLLE1BQU0sU0FBUztBQUN0QyxvQkFBUSxJQUFJLGVBQWUsR0FBRztBQUFBLFVBQy9CLENBQUM7QUFDRCxnQkFBTSxHQUFHLFlBQVksQ0FBQyxVQUFVLEtBQUssU0FBUztBQUM3QyxvQkFBUSxJQUFJLGtDQUFrQyxJQUFJLFFBQVEsSUFBSSxHQUFHO0FBQUEsVUFDbEUsQ0FBQztBQUNELGdCQUFNLEdBQUcsWUFBWSxDQUFDLFVBQVUsS0FBSyxTQUFTO0FBQzdDLG9CQUFRO0FBQUEsY0FDUDtBQUFBLGNBQ0EsU0FBUztBQUFBLGNBQ1QsSUFBSTtBQUFBLFlBQ0w7QUFBQSxVQUNELENBQUM7QUFBQSxRQUNGO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
