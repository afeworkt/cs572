const mongoose=require('mongoose');
const JobOpening= mongoose.model('JobOpening');
const home = function (req,res) {
    res.send('Welcome to Job Search API');
    res.end();
}
const getAll = function (req,res) {
    let count=5,offset=0;
    const maxCount=10;
    if(req.query){
        if(req.query.count){
            count=parseInt(req.query.count)>maxCount?maxCount:parseInt(req.query.count);
        }
        if(req.query.offset){
            offset=parseInt(req.query.offset);
        }
    }

    JobOpening.find().limit(count).skip(offset).sort({postDate: -1}).exec(function(err,data){
            if(err){
                console.log("Error occured fetching all job openings")
                res.status(500).json(err);
            }else{
                if(!data){
                    res.status(404).json("Openings not found");
                }else{
                    res.status(200).json(data);
                }
            }
    });
}
const getOne = function (req,res) {
    const id=req.params.id;
    if(!req.param || !id || !mongoose.isValidObjectId(id)){
        res.status(400).json({message:"Unable to find resource with id: "+ id})
        return;
    }

    JobOpening.findById(id).exec(function(err,data){
            if(err){
                console.log("Error occured getting job opening with id: "+id)
                res.status(500).json(err);
            }else{
                if(!data){
                    res.status(404).json("Job opening not found by id:"+id);
                }else{
                    
                    res.status(200).json(data);
                }
            }
    });
}

const addOne = function (req,res) {
    const newJob={
        title:req.body.title,
        salary:req.body.salary,
        location:req.body.location,
        description:req.body.description,
        experience:req.body.experience,
        postDate:req.body.postDate?req.body.postDate:Date.now(),
        skills:req.body.skills?req.body.skills:[],
        reviews:[]

    };
    console.log(newJob);
    JobOpening.create(newJob,function(err,data){
        if(err){
            console.log(err);
            res.status(500).json({message:err});
        }else{
            res.status(200).json(data);
        }
    });
}
const updateOne = function (req,res) {
    const id=req.params.id;
    console.log('updating ..........');
    if(!req.param || !id || !mongoose.isValidObjectId(id)){
        res.status(400).json({message:"Unable to update resource with id: "+ id})
        return;
    }

    JobOpening.findById(id).exec(function(err,doc){
        if(err){
            console.log('error on update');
            res.status(500).json({message:"Error while finding resource"});
        }else{
            if(!doc){
                console.log('Document not found');
                res.status(404).json({message:`Job opening with id ${id} not found!`});
            }else{
                doc.title=req.body.title;
                doc.salary=req.body.salary;
                doc.location=req.body.location;
                doc.description=req.body.description;
                doc.experience=req.body.experience;
                doc.skills=req.body.skills;
                doc.postDate=req.body.postDate;
                console.log('Data to be saved', doc);
                doc.save(function(error,updatedPost){
                    if(error){
                        console.log(error);
                        res.status(500).json(err);
                    }else{
                        res.status(204).json(updatedPost);
                    }
                })
            }
        }
    });

}
const deleteOne = function (req,res) {
    const id=req.params.id; 
    console.log('deleting ..........'+id);
    JobOpening.remove({_id:id}, function(err) {
        if (err) {
            // console.log(doc);
            res.status(500).json({message: err});
        } else {
            // console.log(doc);
                res.status(200).json({ "message": `Job posting with id ${id} successfully deleted!` });
          }
    });
}



module.exports={
    home : home,
    getAll:getAll,
    getOne:getOne,
    addOne:addOne,
    updateOne:updateOne,
    deleteOne:deleteOne
};