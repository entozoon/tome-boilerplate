// var requireDir = require("require-dir");
// var dir = requireDir("../articles", { recurse: true });

// console.log(dir);

var _ = require("lodash");
const articlesDir = "./src/articles/",
  articlesCompiled = "articles-compiled.json";

const fs = require("fs");

// fs.readdirSync(articlesDir).forEach(file => {
//   console.log(file);

//   var data = fs.readFileSync(articlesDir + file, "utf8");
//   console.log(data);
// });

const dir = require("node-dir");

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
    (err, content, filename, next) => {
      if (err) throw err;
      content = JSON.parse(content);
      console.log("::::", filename, "::::");
      // console.log("[[[[[[[[[[", content, "]]]]]]]");
      articlesJson.push(content);
      next();
    },
    (err, files) => {
      console.log("\n\n Finished jaffing articles together!\n");
      resolve(articlesJson);
    }
  );
});

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

parseJson.then(addHtml).then(articles => {
  console.log(articles);

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
