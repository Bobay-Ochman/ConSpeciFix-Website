var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    qs = require('querystring'),
    port = process.env.PORT || 3000



const runSpawn = require('child_process').spawn;

fs.writeFile("server.log","Starting Log...",function(err){});

const testSpawn = require('child_process').spawn;
const testCode = testSpawn('./test.sh');
testCode.stdout.on('data', function (data) {
  serverLog('Test stdout: ' + data.toString());
});
testCode.stderr.on('data', function (data) {
  serverLog('Test stderr: ' + data.toString());
});

function serverLog(data){
  console.log("***"+ Date.now()+" "+data);
}



http.createServer(function(request, response) {
  serverLog(request.method);
  serverLog(request.url);
  if(request.method==="GET"){
    var uri = url.parse(request.url).pathname
      , filename = path.join(process.cwd(), uri);

    fs.exists(filename, function(exists) {
      if(!exists) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
      }

      if (fs.statSync(filename).isDirectory()) filename += '/index.html';

      fs.readFile(filename, "binary", function(err, file) {
        if(err) {        
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(err + "\n");
          response.end();
          return;
        }

        response.writeHead(200);
        response.write(file, "binary");
        response.end();
      });
    });
  }

  if(request.method==="POST"){
    if (request.url === "/goFile") {
      console.log('Request recieved.');
      var requestBody = '';
      request.on('data', function(data) {
        requestBody += data;
        if(requestBody.length > 1e7) {
          response.writeHead(413, 'Request Entity Too Large', {'Content-Type': 'text/html'});
          response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
        }
      });
      request.on('end', function() {
        console.log('End recieved');
        serverLog('Server record of requestBody:');
        serverLog(requestBody);
        serverLog('End of Server record of requestBody');
        const runCode = runSpawn('python',['engines/speciate/go.py',requestBody]);
        runCode.stdout.on('data', function (data) {
          serverLog('stdout: ' + data.toString());
        });
        runCode.stderr.on('data', function (data) {
          serverLog('stderr: ' + data.toString());
        });
        runCode.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
          response.writeHead(200, {"Content-Type": "text/plain"});
          console.log(''+ new Date().getTime());
          response.write(''+ new Date().getTime());
          serverLog(`child process exited with code ${code}`);
          response.end();
        });
        runCode.on('error', (err) => {
          serverLog(err);
          console.log('what is going on');
          console.log(err);
        });
      });
    } else {
      response.writeHead(404, 'Resource Not Found', {'Content-Type': 'text/html'});
      response.end('<!doctype html><html><head><title>404</title></head><body>404: Resource Not Found</body></html>');
    }
  }

}).listen(parseInt(port, 10));

console.log("Server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");