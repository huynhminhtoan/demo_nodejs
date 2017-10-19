var app = require('express')(),
   port = process.env.PORT || 3000;

app.get('/',function(req,res){
    res.sendFile(__dirname + "/demo.html");
})

app.listen(port, function() {
  console.log('Listening on port ' + port)
})