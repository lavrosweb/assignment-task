import importCss from 'rollup-plugin-import-css'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
	input: "src/app.js",
	output: {
		dir: "dist",
		format: "iife"
	},
	plugins: [importCss({
      output: 'bundle.css',
      outputPath: 'dist',
      extract: true,
      minify: false
    }), nodeResolve()]
}