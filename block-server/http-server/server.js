const http = require("http");
const dict = require("dictionary.json");

http
  .createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    if (request.method === "GET" && request.url === "/dictionary") {
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
  .listen(3000);
