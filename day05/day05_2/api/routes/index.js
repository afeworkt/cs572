const express= require("express");
const router= express.Router(); 
const controllerStudents= require("../controllers/student.controller.js"); 
const controllerCourses= require("../controllers/courses.controller"); 

router.route("/students").get(controllerStudents.getAllStudents); 
router.route("/students/:studentId").get(controllerStudents.getOneStudent); 

 router.route("/students/:studentId/courses")
      .get(controllerCourses.getCourses);
router.route("/students/:studentId/courses/:courseId")
      .get(controllerCourses.getCourse);
      
module.exports = router;