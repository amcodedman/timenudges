const { model, set } = require("mongoose");
const {
  DayModel,SheduleModel,timeNModel,IDayModel,ISheduleModel,InstituteModel,OneTimeS,Message,HolidaysModel
} = require("./../models/Database");

const express = require("express");
const { User } = require("../models/users");
const routes = express.Router();
/** creation */
routes.route("/regularday").post(async (req, res) => {
  try {
    const table= req.body.table ;
    const data = new DayModel({

      ...req.body
    });
    const conten = await data.save();

    await timeNModel.findByIdAndUpdate(
      { _id: table},
      {
        $push: {
          days: conten._id,
        },
      },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json(conten);
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error)
  }
});

routes.route("/createregularshedule").post(async (req, res) => {
  try {
    const day = req.body.day;
    const data = new SheduleModel({
      ...req.body
    });
    const content = await data.save();

    await DayModel.findByIdAndUpdate(
      { _id: day },
      {
        $push: {
          shedules: content._id
        },
      },
      { new: true, useFindAndModify: true }
    );
    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
routes.route("/createregulartable").post(async (req, res) => {
  try {
    const user= req.body.user;

    const data = new timeNModel({
      ...req.body,
    });
    const content = await data.save();
    await User.findByIdAndUpdate(
      { _id: user },
      {
        $set: {
          timetable: content._id,
        },
      },
      { new: true}
    );
    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});






routes.route("/instituteregularday").post(async (req, res) => {
  try {
    const table= req.body.table ;
    const data = new IDayModel({
      ...req.body
    });
    const conten = await data.save();

    await InstituteModel.findByIdAndUpdate(
      { _id: table},
      {
        $push: {
          days: conten._id,
        },
      },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json(conten);
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error)
  }
});

routes.route("/createinstituteshedule").post(async (req, res) => {
  try {
    const day = req.body.day;
    const data = new ISheduleModel({
      ...req.body,from:Date.now(),to:Date.now()
    });
    const content = await data.save();

    await IDayModel.findByIdAndUpdate(
      { _id: day },
      {
        $push: {
          shedules: content._id
        },
      },
      { new: true, useFindAndModify: true }
    );
    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
routes.route("/createinstitutetable").post(async (req, res) => {
  try {
    const user= req.body.user;

    const data = new InstituteModel({
      ...req.body,
    });
    const content = await data.save();
    await User.findByIdAndUpdate(
      { _id: user },
      {
        $set: {
          institution: content._id,
        },
      },
      { new: true}
    );
    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});


routes.route("/createtask").post(async (req, res) => {
  try {
    const user= req.body.user;

    const data = new OneTimeS({
      ...req.body,
    });
    const content = await data.save();
    await User.findByIdAndUpdate(
      { _id: user },
      {
        $push: {
          task: content._id,
        },
      },
      { new: true,useFindAndModify: true}
    );
    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});


routes.route("/createtask").post(async (req, res) => {
  try {
    

    const data = new HolidaysModel({
      ...req.body,
    });
    const content = await data.save();
    
    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});



routes.route("/message").post(async (req, res) => {
  try {
    

    const data = new Message({
      ...req.body,
    });
    const content = await data.save();
    
    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});




routes.route("/modifyishedule").patch(async (req, res) => {
  try {

    const data = new ISheduleModel.findByIdAndUpdate({_id:req.params.id},{
      $set:{
        ...req.body
      }
    },{new:true});
  
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});


routes.route("/modifytask").patch(async (req, res) => {
  try {

    const data = new OneTimeS.findByIdAndUpdate({_id:req.params.id},{
      $set:{
        ...req.body
      }
    },{new:true});
  
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/modifyholiday").patch(async (req, res) => {
  try {

    const data = new HolidaysModel.findByIdAndUpdate({_id:req.params.id},{
      $set:{
        ...req.body
      }
    },{new:true});
  
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/modifyshedule").patch(async (req, res) => {
  try {

    const data = new SheduleModel.findByIdAndUpdate({_id:req.params.id},{
      $set:{
        ...req.body
      }
    },{new:true});
  
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/deleteiday/:id").delete(async (req, res) => {
  try {
    
const _id=req.params.id;
    const data = IDayModel.findByIdAndDelete({_id:_id});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/deleteday/:id").delete(async (req, res) => {
  try {
    
const _id=req.params.id;
    const data = DayModel.findByIdAndDelete({_id:_id});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/deleteishedule/:id").delete(async (req, res) => {
  try {
    
const _id=req.params.id;
    const data = ISheduleModel.findByIdAndDelete({_id:_id});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/deleteshedule/:id").delete(async (req, res) => {
  try {
    
const _id=req.params.id;
    const data = SheduleModel.findByIdAndDelete({_id:_id});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/deletemessages/:id").delete(async (req, res) => {
  try {
    
const _id=req.params.id;
    const data = Message.findByIdAndDelete({_id:_id});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/deletetask/:id").delete(async (req, res) => {
  try {
    
const _id=req.params.id;
    const data = OneTimeS.findByIdAndDelete({_id:_id});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});



routes.route("/deleteholiday/:id").delete(async (req, res) => {
  try {
    
const _id=req.params.id;
    const data = HolidaysModel.findByIdAndDelete({_id:_id});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
















module.exports = routes;
