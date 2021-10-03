const express= require("express");
const router= express.Router(); 
const controllerStudents= require("../controllers/student.controller.js"); 
const controllerCourses= require("../controllers/courses.controller"); 

router.route("/students").get(controllerStudents.getAllStudents); 
router.route("/students/:studentId").get(controllerStudents.getOneStudent); 
router.route("/students").post(controllerStudents.addOneStudent); 
router.route("/students/:studentId").put(controllerStudents.updateStudent); 
router.route("/students/:studentId").delete(controllerStudents.deleteStudent); 

 router.route("/students/:studentId/courses")
      .get(controllerCourses.getCourses)
      .post(controllerCourses.addCourse);

router.route("/students/:studentId/courses/:courseId")
      .get(controllerCourses.getCourse)
      .delete(controllerCourses.deleteCourse);

module.exports = router;