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

//app.use('/main', express.static(__dirname + '/js'));
app.use('/js', express.static('main'));

