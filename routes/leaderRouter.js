const express = require('express');
const bodyParser = require('body-parser');

const mongoose =require('mongoose');
const Leaders =require('../models/leaders');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req,res,next)=>{
   Leaders.find({}).then((leaders)=>{
       res.statusCode=200;
       res.setHeader("Content-Type","application/json");
       res.json(leaders);
   },(err)=>next(err))
   .catch((err)=>next(err))
})
.post((req,res,next)=>{
    Leaders.create(req.body)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('put method is not supported');
})
.delete((req,res,next)=>{
    Leaders.remove({})
    .then((leaders)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(leaders);
    },(err)=>next(err))
    .catch((err)=>next(err));
});


leaderRouter.route('/:leaderID')
.get((req,res,next)=>{
    Leaders.findById(req.params.leaderID)
    .then((leader)=>{
       if(leader){
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(leader);
       }
       else{
           res.statusCode=404;
           res.end("leader not found");
       }
    },(err)=>next(err))
    .catch((err)=>next(err));
}).post((req,res,next)=>{
    res.statusCode=403;
    res.end('post operation is not supported');
}).put((req,res,next)=>{
    Leaders.findByIdAndUpdate(req.params.leaderID,
        {$set:req.body},
        {new:true})
        .then((leader)=>{
            res.statusCode=200;
            res.setHeader("Content-Type","application/json");
            res.json(leader);
        })
}).delete((req,res,next)=>{
    Leaders.findByIdAndDelete(req.params.leaderID)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(leader);
    })
}); 


 module.exports = leaderRouter;