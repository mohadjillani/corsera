const express = require('express');
const bodyParser = require('body-parser');

const protionRouter = express.Router();
protionRouter.use(bodyParser.json());

protionRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('will send all the promotions to you');
})
.post((req,res,next)=>{
    res.end('will post your promotions with name : '+ req.body.name +' and details : '+req.body.details);
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('not supported yet');
})
.delete((req,res,next)=>{
    res.end('deleting all promotions');
});


protionRouter.route('/:promoID')
.get((req,res,next)=>{
    res.end('will send all the promotion number : '+req.params.promoID);
}).post((req,res,next)=>{
    res.statusCode=403;
    res.end('post operation is not supported');
}).put((req,res,next)=>{
    res.end('updating promotion :'+ req.params.promoID);
}).delete((req,res,next)=>{
    res.end('deleting promotion :'+req.params.promoID);
}); 


 module.exports = protionRouter;