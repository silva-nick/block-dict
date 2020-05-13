const http = require("http");
const dict = require("./dictionary.json");

http
  .createServer((request, response) => {
    console.log(request.method);
    console.log(request.url);
    console.log(request.url.indexOf("/api/dictionary") > -1);
    let body = [];
    if (
      request.method === "GET" &&
      request.url.indexOf("/api/dictionary") > -1
    ) {
      request
        .on("error", (err) => {
          console.log(err);
        })
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          // respond:
          words = body.split(",");
          for (word of words) {
            let def = dict.filter((obj) => {
              return obj.simplified === word;
            });
            if (def !== undefined) {
              delete def.traditional;
              response.write(def);
            }
            for (word2 of words) {
              c1 = word + word2;
              c2 = word2 + word;
              def = dict.find((obj) => {
                return obj.simplified === c1 || obj.simplified === c2;
              });
              if (def !== undefined) {
                delete def.traditional;
                console.log(def);
                response.write(def);
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
