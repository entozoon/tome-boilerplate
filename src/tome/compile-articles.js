const _ = require("lodash"),
  fs = require("fs"),
  dir = require("node-dir"),
  articlesDir = "./src/articles/",
  articlesCompiled = "articles-compiled.json";

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
