import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['lib/i18n/he.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['chrome74', 'firefox75', 'safari14', 'edge79'],
  outfile: 'esbuild-export/n2words.esm.js',
  format: "esm"
})