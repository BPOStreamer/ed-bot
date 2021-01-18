const express = require('express'),
      app = express();

app.get('/', function(request, response){
  response.sendFile('index.html', {
    root: __dirname
  });
});

app.listen(3000, function() {
  console.log('running')
})

app.use('/js', express.static(__dirname + '/main'));

