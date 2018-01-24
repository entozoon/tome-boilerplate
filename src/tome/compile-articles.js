const _ = require("lodash"),
  fs = require("fs"),
  dir = require("node-dir"),
  // dirTree = require("directory-tree"),
  articlesDir = "./src/articles/",
  articlesCompiled = "articles-compiled.json";

// let myMap = new Map();
// var keyObj = {},
//   keyFunc = function() {};

// // setting the values
// myMap.set(["a"], "value with 'a string'");
// myMap.set(["a", " string"], "value associated with 'a string'");
// myMap.set(keyObj, "value associated with keyObj");
// myMap.set(keyFunc, "value associated with keyFunc");

// console.log(myMap);

// return;

// const treeYeah = dirTree(articlesDir, (item, PATH) => {
//   console.log(item);
// });
// // { path: './src/articles/',
// //   name: 'articles',
// //   children: []
// // }
// console.log(treeYeah);
// console.log(treeYeah.children[0]);
// console.log(treeYeah.children[0].children);
// console.log(treeYeah.children[0].children.children);
// console.log(treeYeah.children[0].children[2].children);

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
// (Ignores folder names (maybe)!)
//[
//  {
//    "title": "Article Name", // from data.json
//    "price": 9.99, // from data.json
//    "name": "article-name",
//    "content": "<p>Lorem ipsum</p>",
//    "revisions": {
//      "1": {
//        "title": "Revision 1",
//        "content": "<p>Lorem ipsum</p>"
//      },
//      "1": {
//        "title": "Revision 1",
//        "content": "<p>Lorem ipsum</p>"
//      },
//      "more": {
//        "title": "Revision 1",
//        "content": "<p>Lorem ipsum</p>"
//      }
//    }
//  }
//], [ { .. } ]

const convertFilesToCompiles = files =>
  new Promise((resolve, reject) => {
    let compiles = {};

    files.forEach(file => {
      // console.log(file.pathSplit, file.nameStrip, file.type);

      // file.pathSplit = file.pathSplit.map(x => _.toString(x).toString() + "?");

      if (file.name === "data.json") {
        let injectPath = _.concat(file.pathSplit).join("."); // Pull it up out of .data
        // content = JSON.parse(fs.readFileSync(file.path, "utf8"));
        let content = { name: "example" };

        // Pull it up out of .data
        // injectPath = injectPath.slice(0, -1);
        _.set(compiles, injectPath, content); // SO CLOSE but jaffs integers wrong
      }
      // let injectPath = "a[b][]";

      // console.log(_.concat(injectPath, "name"));

      // Ignore folder names, just use data
      // _.set(compiles, _.concat(file.pathSplit, "name"), file.nameStrip);
      // console.log(compiles);
      // console.log("");

      // let injection = [];
      // _.setWith(compiles, file.pathSplit, "x", (value, er, err, errr) => {
      //   console.log(":::");
      //   console.log(value);
      //   console.log(er);
      //   console.log(err);
      //   console.log(errr);
      //   console.log("");
      // });
      // _.assignIn(compiles, file.pathSplit);
    });

    // Solve everything with set timeouts
    files.forEach(file => {
      // console.log(file.pathSplit, file.nameStrip, file.type);

      // file.pathSplit = file.pathSplit.map(x => _.toString(x).toString() + "?");

      if (file.type === "html") {
        let injectPath = _.concat(file.pathSplit, file.nameStrip).join(".");
        // console.log(injectPath);
        // file.pathSplit.push("content");

        // content = fs.readFileSync(file.path, "utf8");
        let content = "example";
        _.set(compiles, injectPath, content); // SO CLOSE but jaffs integers wrong

        // console.log(content);
      }
    });

    console.log("\n" + JSON.stringify(compiles) + "\n");

    // Convert the key value style object into an array of objects, collection style!
    compiles = _.toArray(compiles);

    // Extra data up a level

    console.log("\n" + JSON.stringify(compiles) + "\n");

    resolve(compiles);
  });

dir
  .promiseFiles(articlesDir)
  .then(files => {
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
  })
  .catch(e => console.error(e))
  .then(convertFilesToCompiles)
  .then(console.log);

return;

dir.readFiles(
  articlesDir,
  {
    recursive: true
  },
  (err, data, filename, next) => {
    console.log(filename);
    next();
  }
);

return;

// Run through the articles directory looking for .json files to grab
const parseJson = new Promise((resolve, reject) => {
  // match only filenames with a .txt extension and that don't start with a `.´
  let articlesJson = [];
  dir.readFiles(
    articlesDir,
    {
      match: /.json$/,
      // exclude: /^\./
      exclude: [articlesCompiled]
    },
    (err, data, filename, next) => {
      if (err) throw err;
      data = JSON.parse(data);
      console.log("::::", filename, "::::");
      // console.log("[[[[[[[[[[", data, "]]]]]]]");

      // add 'name' value using the folder name, because yolo
      let filenameSplit = filename.split("\\");
      data.name = filenameSplit[filenameSplit.length - 2];

      articlesJson.push(data);
      next();
    },
    (err, files) => {
      console.log("\n\n Finished jaffing articles together!\n");
      resolve(articlesJson);
    }
  );
});

// Run through articles directory again, this time adding in any .html
const addHtml = articles => {
  return new Promise((resolve, reject) => {
    let articlesHtml = [];
    dir.readFiles(
      articlesDir,
      {
        match: /.html$/
        // exclude: /^\./
      },
      (err, content, filename, next) => {
        if (err) throw err;
        articlesHtml.push({
          // same as articlesJson, ready to merge later
          filename: filename,
          content: JSON.stringify(content)
        });
        next();
      },
      (err, files) => {
        // Merge the html content into the articles so far
        _.merge(articles, articlesHtml);
        resolve(articles);
      }
    );
  });
};

// Grab all the files and compile into a nice JSON file
parseJson.then(addHtml).then(articles => {
  console.log(
    "\n\n Finished jaffing articles together!\n Saved as: " +
      articlesDir +
      articlesCompiled
  );
  fs.writeFile(
    articlesDir + articlesCompiled,
    JSON.stringify(articles),
    err => console.error
  );
});
