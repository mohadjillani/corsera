const express = require('express');
const bodyParser = require('body-parser');

const mongoose =require('mongoose');
const Dishes = require('../models/dishes');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get((req,res,next)=>{
    Dishes.find({}).then((dishes)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(dishes);
        },(err)=>{next(err);})
        .catch((err)=>{next(err);})
})
.post((req,res,next)=>{
   Dishes.create(req.body).then((dish)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(dish);
        },(err)=>{next(err);})
        .catch((err)=>{next(err);})
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('not supported yet');
})
.delete((req,res,next)=>{
    Dishes.remove({}).then((resp)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(resp);
        },(err)=>{next(err);})
        .catch((err)=>{next(err);})
});


dishRouter.route('/:dishid')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishid).then((dish)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(dish);
        },(err)=>{next(err);})
        .catch((err)=>{next(err);})
}).post((req,res,next)=>{
    res.statusCode=403;
    res.end('post operation is not supported');
}).put((req,res,next)=>{
    Dishes.findByIdAndUpdate(req.params.dishid,
        {$set : req.body},
        {new:true}
        ).then((dish)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(dish);
        },(err)=>{next(err);})
        .catch((err)=>{next(err);})
}).delete((req,res,next)=>{
    Dishes.findByIdAndRemove(req.params.dishid).then((resp)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(resp);
    },(err)=>{next(err);})
    .catch((err)=>{next(err);})
}); 


dishRouter.route('/:dishid/comments')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishid).then((dish)=>{
        if(dish){
            res.statusCode=200;
            res.header("Content-Type","application/json");
            res.json(dish.comments);
        }
        else{
            err = new Error('Dish ' + req.params.dishid + ' not found');
            err.statusCode=404;
            return next(err);
        }
    },(err)=>{next(err);})
    .catch((err)=>{next(err);})
}).post((req,res,next)=>{
    Dishes.findById(req.params.dishid).then((dish)=>{
        if(dish){
            dish.comments.push(req.body);
            dish.save().then((dish)=>{
                res.statusCode=200;
                res.header("Content-Type","application/json");
                res.json(dish);
            })
        }
        else{
            err = new Error('Dish ' + req.params.dishid + ' not found');
            err.statusCode=404;
            return next(err);
        }
    },(err)=>{next(err);})
    .catch((err)=>{next(err);} )
}).put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /comments/'
        + req.params.dishid + '/comments');
}).delete((req,res,next)=>{
    Dishes.findById(req.params.dishid).then((dish)=>{
       if(dish){
          if(dish.comments.length){
            for (var i = (dish.comments.length -1); i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save().then(()=>{
                res.statusCode=200;
                res.header("Content-Type","application/json");
                res.json(dish);
            });
    
          }else{
            res.end("no comment found");
            err.statusCode=404;
            return next(err);
          }
       }
       else{
        res.end("no dish found");
        err.statusCode=404;
        return next(err);
       }
    }).catch(()=>{next(err)});
});


dishRouter.route('/:dishid/comments/:commentId')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishid).then((dish)=>{
        if(dish){
            if(dish.comments.id(req.params.commentId))
            {
                res.statusCode=200;
                res.header("Content-Type","application/json");
                res.json(dish.comments.id(req.params.commentId));
            }
            else
            {
                res.statusCode =404
                res.end("No comment found");
                
            }

        }else{
            res.statusCode =404
            res.end("no dish found");
        }
    },(err)=>next(err))
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('post operation is not supported');
})
.put((req,res,next)=>{
    Dishes.findById(req.params.dishid).then((dish)=>{
        if(dish){
            if(dish.comments.id(req.params.commentId))
            {
                if(dish.comments.id(req.params.commentId).rating)
                {
                    dish.comments.id(req.params.commentId).rating=req.body.rating;
                }
                if(dish.comments.id(req.params.commentId).comment)
                {
                    dish.comments.id(req.params.commentId).comment=req.body.comment;
                }
                dish.save().then((dish)=>{
                    res.statusCode=200;
                    res.header("Content-Type","application/json");
                    res.json(dish.comments.id(req.params.commentId));
                },
                (err)=>next(err))
            }
            else
            {
                res.statusCode =404
                res.end("No comment found");
                
            }

        }else{
            res.statusCode =404
            res.end("no dish found");
        }
    },(err)=>next(err))
})
.delete((req,res,next)=>{
    Dishes.findById(req.params.dishid).then((dish)=>{
        if(dish){
            if(dish.comments.id(req.params.commentId))
            {
                dish.comments.id(req.params.commentId).remove()
                dish.save().then((dish)=>{
                    res.statusCode=200;
                    res.header("Content-Type","application/json");
                    res.json(dish);
                },(err)=>next(err))
            }
            else
            {
                res.statusCode =404
                res.end("No comment found");
                
            }

        }else{
            res.statusCode =404
            res.end("no dish found");
        }
    },(err)=>next(err))
})



 module.exports = dishRouter;
 