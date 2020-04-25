const express = require('express');
const bodyParser = require('body-parser');

const mongoose =require('mongoose');
const Promos =require('../models/promotions');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next)=>{
   Promos.find({}).then((promos)=>{
       res.statusCode=200;
       res.setHeader("Content-Type","application/json");
       res.json(promos);
   },(err)=>next(err))
   .catch((err)=>next(err))
})
.post((req,res,next)=>{
    Promos.create(req.body)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('put method is not supported');
})
.delete((req,res,next)=>{
    Promos.remove({})
    .then((promos)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err));
});


promoRouter.route('/:promoID')
.get((req,res,next)=>{
    Promos.findById(req.params.promoID)
    .then((promo)=>{
       if(promo){
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(promo);
       }
       else{
           res.statusCode=404;
           res.end("promo not found");
       }
    },(err)=>next(err))
    .catch((err)=>next(err));
}).post((req,res,next)=>{
    res.statusCode=403;
    res.end('post operation is not supported');
}).put((req,res,next)=>{
    Promos.findByIdAndUpdate(req.params.promoID,
        {$set:req.body},
        {new:true})
        .then((promo)=>{
            res.statusCode=200;
            res.setHeader("Content-Type","application/json");
            res.json(promo);
        })
}).delete((req,res,next)=>{
    Promos.findByIdAndDelete(req.params.promoID)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(promo);
    })
}); 


 module.exports = promoRouter;