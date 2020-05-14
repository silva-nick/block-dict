const http = require("http");
const dict = require("./dictionary.json");
const querystring = require("querystring");

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
          words = querystring.parse(body);
          console.log(body);
          for (wordIndex in words) {
            let def = dict.find((obj) => {
              return obj.simplified === words[wordIndex];
            });
            if (def !== undefined) {
              delete def.traditional;
              console.log(querystring.stringify(def));
              response.write(querystring.stringify(def) + "}");
            }
            for (word2Index in words) {
              c1 = words[wordIndex] + words[word2Index];
              c2 = words[word2Index] + words[wordIndex];
              def = dict.find((obj) => {
                return obj.simplified === c1 || obj.simplified === c2;
              });
              if (def !== undefined) {
                delete def.traditional;
                console.log(querystring.stringify(def));
                response.write(querystring.stringify(def) + "}");
              }
            }
          }
          response.end();
        });
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(3001);
