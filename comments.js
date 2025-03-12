// Create web server
// 1. Import modules
var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require("querystring");

// 2. Create server
http.createServer(function(req, res) {
    // 3. Parse the requested URL
    var parsedUrl = url.parse(req.url);
    // 4. Get the pathname
    var path = parsedUrl.pathname;
    // 5. Get the query string
    var queryString = querystring.parse(parsedUrl.query);
    // 6. Check the path
    if (path == "/getComments") {
        // 7. Read the comments.json file
        fs.readFile("comments.json", function(err, data) {
            if (err) {
                // 8. Return error message
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.write("Error: File not found");
                res.end();
            } else {
                // 9. Return the comments
                res.writeHead(200, {"Content-Type": "application/json"});
                res.write(data);
                res.end();
            }
        });
    } else if (path == "/postComment") {
        // 10. Get the comment
        var comment = queryString.comment;
        // 11. Read the comments.json file
        fs.readFile("comments.json", function(err, data) {
            if (err) {
                // 12. Return error message
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.write("Error: File not found");
                res.end();
            } else {
                // 13. Parse the comments
                var comments = JSON.parse(data);
                // 14. Add the new comment
                comments.push(comment);
                // 15. Write the comments
                fs.writeFile("comments.json", JSON.stringify(comments), function(err) {
                    if (err) {
                        // 16. Return error message
                        res.writeHead(500, {"Content-Type": "text/plain"});
                        res.write("Error: Internal Server Error");
                        res.end();
                    } else {
                        // 17. Return success message
                        res.writeHead(200, {"Content-Type": "text/plain"});
                        res.write("Comment posted");
                        res.end();
                    }
                });
            }
        });
    } else {
        // 18. Return error message
        res.writeHead(404