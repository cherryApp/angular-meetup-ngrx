const { build } = require('esbuild');
const liveServer = require("live-server");
const path = require('path');
const fs = require('fs');

const times = [new Date().getTime(), new Date().getTime()];

let convertMessage = ({ message, start, end }) => {
  let location
  if (start && end) {
    let lineText = source.split(/\r\n|\r|\n/g)[start.line - 1]
    let lineEnd = start.line === end.line ? end.column : lineText.length
    location = {
      file: filename,
      line: start.line,
      column: start.column,
      length: lineEnd - start.column,
      lineText,
    }
  }
  return { text: message, location }
}

const scssPlugin = {
  name: "scss",
  setup(build) {
    const path = require("path")
    const sass = require("sass")

    build.onLoad({ filter: /\.scss$/ }, async args => {
      try {
        const result = sass.renderSync({ file: args.path })
        return {
          contents: result.css.toString(),
          // contents: 'body { color: blue; }',
          loader: "css",
        }
      } catch (e) {
        return { errors: [convertMessage(e)] }
      }

    })
  },
};

const zoneJsPlugin = {
  name: "zoneJs",
  setup(build) {
    const fs = require('fs');
    build.onLoad({ filter: /main\.ts$/ }, async (args) => {
      try {
        const source = await fs.promises.readFile(args.path, 'utf8');
        const contents = `import 'zone.js';\n${source}`;
        return { contents, loader: 'ts' };
      } catch (e) {
        return { errors: [convertMessage(e)] }
      }
    });
  },
};

let angularComponentDecoratorPlugin = {
  name: 'angularDecorator',
  async setup(build) {
    let path = require('path');
    let fs = require('fs');

    const dirPath = path.join(__dirname, 'dist');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    let indexFileContent = await fs.promises.readFile(
      path.join(__dirname, 'src/index.html'),
      'utf8',
    );

    // console.log(indexFileContent)

    indexFileContent = indexFileContent.replace(
      /\<\/body\>/gm,
      `<script src="esbuild-main.js"></script></body>`
    );

    indexFileContent = indexFileContent.replace(
      /\<\/head\>/gm,
      `<link rel="stylesheet" href="esbuild-main.css"></head>`
    );

    await fs.promises.writeFile(
      path.join(__dirname, 'dist/esbuild-index.html'),
      indexFileContent,
      'utf8',
    );

    build.onStart(() => {
      console.log('build started');
      times[0] = new Date().getTime();
    });

    build.onEnd(() => {
      times[1] = new Date().getTime();
      console.log(`EsBuild complete in ${times[1] - times[0]}ms`);
    });

    build.onLoad({ filter: /\.component\.ts$/ }, async (args) => {
      // This converts a message in Svelte's format to esbuild's format


      let getValueByPattern = (regex = new RegExp(''), str = '') => {
        let m;
        let results = [];

        while ((array1 = regex.exec(str)) !== null) {
          results.push(array1[1]);
        }

        return results.pop();
      };

      // Load the file from the file system
      let source = await fs.promises.readFile(args.path, 'utf8');
      let filename = path.relative(process.cwd(), args.path);

      // Convert Svelte syntax to JavaScript
      try {
        const templateUrl = getValueByPattern(/^ *templateUrl *\: *['"]*([^'"]*)/gm, source);
        const styleUrls = getValueByPattern(/^ *styleUrls *\: *\[['"]([^'"\]]*)/gm, source);

        let contents = source.replace(/\@Component/gmi, `
          import templateSource from '${templateUrl}';
          import styleSheet from '${styleUrls}';
          @Component
        `);

        contents = contents.replace(
          /^ *templateUrl *\: *['"]*([^'"]*)['"]/gm,
          "template: templateSource || ''"
        );

        contents = contents.replace(
          /^ *styleUrls *\: *\[['"]([^'"\]]*)['"]\]/gm,
          "styles: [styleSheet || '']"
        );
        return { contents, loader: 'ts' };
      } catch (e) {
        return { errors: [convertMessage(e)] }
      }
    });
  },
};

const liveServerParams = {
  port: 8181, // Set the server port. Defaults to 8080.
  host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: "./dist", // Set root directory that's being served. Defaults to cwd.
  open: false, // When false, it won't load your browser by default.
  // ignore: 'scss,my/templates', // comma-separated string for paths to ignore
  file: "/esbuild-index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
  // mount: [['/components', './node_modules']], // Mount a directory to a route.
  logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
  middleware: [function (req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};

let liveServerIsRunning = false;
build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/esbuild-main.js',
  treeShaking: true,
  loader: {
    '.html': 'text',
    '.css': 'text',
  },
  sourcemap: true,
  minify: true,
  watch: {
    onRebuild(error, result) {
      if (error) console.error('watch build failed:', error);
      else {

        console.log('watch build succeeded:', result);
      }
    },
  },
  plugins: [
    zoneJsPlugin,
    scssPlugin,
    angularComponentDecoratorPlugin,
  ],
}).then( async (result) => {
  if (!liveServerIsRunning) {
    liveServer.start(liveServerParams);
    liveServerIsRunning = true;
  }
});
