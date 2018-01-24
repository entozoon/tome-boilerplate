const _ = require("lodash"),
  fs = require("fs"),
  dir = require("node-dir"),
  // dirTree = require("directory-tree"),
  articlesDir = "./src/articles/",
  articlesCompiled = "articles-compiled.json";

// DATA STRUCTURE
// Based on the folder structure, loading content from html files and data from jsons
//
//  /article-name
//     data.json
//     content.html
//     /revisions
//       /review-1
//         data.json
//         content.html
//       /review-2
//         data.json
//         content.html
//       /more
//         data.json
//         content.html
//
//  (Ignores folder names!)
//  {
//    "title": "Article Name",
//    "price": 13.99,
//    "revisions": {
//      "more": {
//        "title": "Mooore information",
//        "price": 13.99,
//        "content": "<p>Lorem</p>\n"
//      },
//      "revision-1": {
//        "title": "Revision One",
//        "price": 13.99,
//        "content": "<p>Lorem</p>\n"
//      },
//      "revision-2": {
//        "title": "Revision Two",
//        "price": 13.99,
//        "content": "<p>Lorem</p>\n"
//      }
//    },
//    "content": "<p>Lorem</p>\n"
//  }, { .. }]

const parseFilenames = files => {
  files = files.map(path => {
    // Create a useful file object
    let file = {};
    file.path = path;

    // Strip out the given articles directory from the full path
    // (This is soooooo dodgy but it'll do for now:)
    pathStripped = path.replace(articlesDir, "");
    pathStripped = pathStripped.replace(
      articlesDir.replace("./", "").replace(/\//g, "\\"),
      ""
    );
    // Such a bag of jaff but acceptable for now
    file.pathSplit = pathStripped.split("\\");
    file.name = file.pathSplit[file.pathSplit.length - 1];
    // file.nameSplit = file.name.split(".");
    file.nameStrip = file.name.split("."); //.slice(0, -1);
    // file.type = file.name.split(".").pop();
    file.type = file.nameStrip.pop();
    file.nameStrip = file.nameStrip.join(".");
    file.pathSplit.pop(); // Remove filename from pathSplit

    return file;
  });
  // Strip out root files
  files = files.filter(x => x.pathSplit.length);
  // console.log(files);

  return files;
};

const convertFilesToCompiles = files =>
  new Promise((resolve, reject) => {
    let compiles = {};

    files.forEach(file => {
      // console.log(file.pathSplit, file.nameStrip, file.type);

      if (file.name === "data.json") {
        let injectPath = _.concat(file.pathSplit).join("."); // Pull it up out of .data
        content = JSON.parse(fs.readFileSync(file.path, "utf8"));

        _.set(compiles, injectPath, content); // SO CLOSE but jaffs integers wrong
      }
    });

    // Solve everything with set timeouts
    files.forEach(file => {
      if (file.type === "html") {
        let injectPath = _.concat(file.pathSplit, file.nameStrip).join(".");

        content = JSON.stringify(fs.readFileSync(file.path, "utf8"));
        _.set(compiles, injectPath, content); // SO CLOSE but jaffs integers wrong
      }
    });

    // console.log("\n" + JSON.stringify(compiles) + "\n");

    // Convert the key value style object into an array of objects, collection style!
    compiles = _.toArray(compiles);

    // console.log("\n" + JSON.stringify(compiles) + "\n");

    resolve(compiles);
  });

const writeToFile = data => {
  console.log(
    "\n\n Finished jaffing articles together!\n Saved as: " +
      articlesDir +
      articlesCompiled
  );
  fs.writeFile(
    articlesDir + articlesCompiled,
    JSON.stringify(data),
    err => console.error
  );
  resolve(data);
};

dir
  .promiseFiles(articlesDir)
  .catch(e => console.error(e))
  .then(parseFilenames)
  .then(convertFilesToCompiles)
  .then(writeToFile)
  .then(console.log);

// dir.readFiles(
//   articlesDir,
//   {
//     recursive: true
//   },
//   (err, data, filename, next) => {
//     console.log(filename);
//     next();
//   }
// );

// // Run through the articles directory looking for .json files to grab
// const parseJson = new Promise((resolve, reject) => {
//   // match only filenames with a .txt extension and that don't start with a `.´
//   let articlesJson = [];
//   dir.readFiles(
//     articlesDir,
//     {
//       match: /.json$/,
//       // exclude: /^\./
//       exclude: [articlesCompiled]
//     },
//     (err, data, filename, next) => {
//       if (err) throw err;
//       data = JSON.parse(data);
//       console.log("::::", filename, "::::");
//       // console.log("[[[[[[[[[[", data, "]]]]]]]");

//       // add 'name' value using the folder name, because yolo
//       let filenameSplit = filename.split("\\");
//       data.name = filenameSplit[filenameSplit.length - 2];

//       articlesJson.push(data);
//       next();
//     },
//     (err, files) => {
//       console.log("\n\n Finished jaffing articles together!\n");
//       resolve(articlesJson);
//     }
//   );
// });

// // Run through articles directory again, this time adding in any .html
// const addHtml = articles => {
//   return new Promise((resolve, reject) => {
//     let articlesHtml = [];
//     dir.readFiles(
//       articlesDir,
//       {
//         match: /.html$/
//         // exclude: /^\./
//       },
//       (err, content, filename, next) => {
//         if (err) throw err;
//         articlesHtml.push({
//           // same as articlesJson, ready to merge later
//           filename: filename,
//           content: JSON.stringify(content)
//         });
//         next();
//       },
//       (err, files) => {
//         // Merge the html content into the articles so far
//         _.merge(articles, articlesHtml);
//         resolve(articles);
//       }
//     );
//   });
// };

// // Grab all the files and compile into a nice JSON file
// parseJson.then(addHtml).then(articles => {
//   console.log(
//     "\n\n Finished jaffing articles together!\n Saved as: " +
//       articlesDir +
//       articlesCompiled
//   );
//   fs.writeFile(
//     articlesDir + articlesCompiled,
//     JSON.stringify(articles),
//     err => console.error
//   );
// });
