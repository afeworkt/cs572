const express= require("express");
const router= express.Router(); 
const controllerCycling= require("../controllers/cyclingevent.controller.js"); 
const controllerDescipline= require("../controllers/disciplines.controller"); 

router.route("/cyclingevents").get(controllerCycling.getAllEvents); 
router.route("/cyclingevents/:cyclingEventId").get(controllerCycling.getOneCyclingEvent); 
router.route("/cyclingevents").post(controllerCycling.addOneCyclingEvent); 
router.route("/cyclingevents/:cyclingEventId").put(controllerCycling.updateCyclingEvent); 
router.route("/cyclingevents/:cyclingEventId").delete(controllerCycling.deleteCyclingEvent); 

 router.route("/cyclingevents/:cyclingEventId/disciplines")
      .get(controllerDescipline.getDisciplines)
      .post(controllerDescipline.addDiscipline);

router.route("/cyclingevents/:cyclingEventId/disciplines/:disciplineId")
      .get(controllerDescipline.getDiscipline)
      .delete(controllerDescipline.deleteDiscipline);

module.exports = router;