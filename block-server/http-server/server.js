const http = require("http");
const dict = require("./dictionary.json");
const querystring = require("querystring");

http
  .createServer((request, response) => {
    console.log(request.method);
    console.log(request.url);
    console.log(request.url.indexOf("api/dictionary") > -1);
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
          console.log(words);
          for (word in words) {
            let def = dict.filter((obj) => {
              return obj.simplified === word;
            });
            if (def !== undefined) {
              delete def.traditional;
              response.write(querystring.stringify(def));
            }
            for (word2 in words) {
              c1 = word + word2;
              c2 = word2 + word;
              def = dict.find((obj) => {
                return obj.simplified === c1 || obj.simplified === c2;
              });
              if (def !== undefined) {
                delete def.traditional;
                console.log(querystring.stringify(def));
                response.write(querystring.stringify(def));
              }
            }
          }
        });
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(3001);
