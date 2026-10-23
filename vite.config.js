import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      build: { fileName: 'pornhub-tool.user.js' },
      userscript: {
        name: 'PornhubTool',
        namespace: 'https://github.com/sherlocknieh/',
        version: '2026.10.23.1',
        description: '增强一些XX网站的浏览体验',
        icon: 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2264%22%20height%3D%2264%22%3E%3Ccircle%20cx%3D%2232%22%20cy%3D%2232%22%20r%3D%2232%22%20fill%3D%22black%22%2F%3E%3Ctext%20x%3D%2232%22%20y%3D%2242%22%20text-anchor%3D%22middle%22%20font-size%3D%2232%22%20fill%3D%22white%22%3EPH%3C%2Ftext%3E%3C%2Fsvg%3E',
        match: [
          'https://greasyfork.org/*',
          'https://sleazyfork.org/*',
          'https://*.pornhub.com/*',
          'https://musedam.cc/*',
          'https://nsfw.xxx/*',
          'https://rule34.xxx/*',
          'https://anacams.com/post/*',
          'https://www.sex.com/*/gifs/*'
        ],
        grant: 'none',
      },
    }),
  ],
});
