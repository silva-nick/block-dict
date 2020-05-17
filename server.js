const http = require("http");
const fs = require("fs");
const dict = require("./dictionary.json");
const querystring = require("querystring");

const PORT = process.env.PORT || 3001;

http
  .createServer((request, response) => {
    console.log(request.method);
    console.log(request.url);
    let body = [];
    if (
      request.method === "POST" &&
      request.url.indexOf("/api/dictionary") > -1
    ) {
      request
        .on("error", (err) => {
          console.log(err);
        })
        .on("data", (chunk) => {
          console.log(chunk);
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          // respond:
          let words = querystring.parse(body);
          console.log(body);
          let keys = Object.keys(words);
          let newWord = words[keys[keys.length - 1]];
          console.log("newword: " + newWord);

          let newDef = dict.find((obj) => {
            return obj.simplified === newWord;
          });
          if (newDef !== undefined) {
            delete newDef.traditional;
            console.log(querystring.stringify(newDef));
            response.write(querystring.stringify(newDef) + "}");
          }
          for (wordIndex in words) {
            c1 = words[wordIndex] + newWord;
            c2 = newWord + words[wordIndex];
            def = dict.find((obj) => {
              return obj.simplified === c1 || obj.simplified === c2;
            });
            if (def !== undefined) {
              delete def.traditional;
              console.log(querystring.stringify(def));
              response.write(querystring.stringify(def) + "}");
            }
          }
          response.end();
        });
    } else if (request.method === "GET") {
      const directory =
        request.url === "/"
          ? __dirname + "/block-client/build/index.html"
          : __dirname + "/block-client/build" + request.url;
      console.log(directory);
      fs.readFile(directory, function (err, data) {
        if (err) {
          response.writeHead(404);
          response.end(JSON.stringify(err));
          return;
        }
        response.writeHead(200);
        response.end(data);
      });
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(PORT);
