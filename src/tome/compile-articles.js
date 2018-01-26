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

// Take all the files and create a useful data structure
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

    files.forEach(file => {
      if (file.type === "html") {
        let injectPath = _.concat(file.pathSplit, file.nameStrip).join(".");

        content = JSON.stringify(fs.readFileSync(file.path, "utf8"));
        _.set(compiles, injectPath, content); // SO CLOSE but jaffs integers wrong
      }
    });

    // Convert the key value style object into an array of objects, collection style!
    compiles = _.toArray(compiles);

    // console.log("\n" + JSON.stringify(compiles) + "\n");

    resolve(compiles);
  });

// Write data into a nice JSON file
const writeToFile = data => {
  return new Promise((resolve, reject) => {
    console.log(
      "\n\n Finished jaffing articles together!\n Saved as: " +
        articlesDir +
        articlesCompiled
    );
    fs.writeFileSync(
      articlesDir + articlesCompiled,
      JSON.stringify(data),
      err => reject
    );
    resolve(data);
  });
};

dir
  .promiseFiles(articlesDir)
  .catch(console.error)
  .then(parseFilenames)
  .then(convertFilesToCompiles)
  .then(writeToFile);
// .then(console.log);
