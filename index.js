import fddui from './lib';

export default fddui;

// function camelCase(name) {
//   return name.charAt(0).toUpperCase() +
//     name.slice(1).replace(/-(\w)/g, (m, n) => {
//       return n.toUpperCase();
//     });
// }
// const req = require.context('./components', true, /^\.\[^_][\w-]+\/(style\/)?.index\.tsx?$/);

// req.keys().forEach((mod) => {
//   console.log(mod);
//   let v = req(mod);
//   if (v && v.default) {
//     v = v.default;
//   }
//   const match = mod.match(/^\.\/([^_][\w-]+)\/index\.tsx?$/);
//   if (match && match[1]) {
//     exports[camelCase(match[1])] = v;
//   }
// });
