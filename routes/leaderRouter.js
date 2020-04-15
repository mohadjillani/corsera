const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('will send all the leaders to you');
})
.post((req,res,next)=>{
    res.end('will post your leaders with name : '+ req.body.name +' and details : '+req.body.details);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('not supported yet');
})
.delete((req,res,next)=>{
    res.end('deleting all leaders');
});


leaderRouter.route('/:leaderID')
.get((req,res,next)=>{
    res.end('will send all the leader number : '+req.params.leaderID);
}).post((req,res,next)=>{
    res.statusCode=403;
    res.end('post operation is not supported');
}).put((req,res,next)=>{
    res.end('updating leader :'+ req.params.leaderID);
}).delete((req,res,next)=>{
    res.end('deleting leader :'+req.params.leaderID);
}); 


 module.exports = leaderRouter;