DegreeReqs = new Mongo.Collection('degreeReqs');

DegreeReqs.allow({
    insert: function(userId, doc){
        return !!userId;
    },
    update: function(userId, doc){
        return !!userId;
    },
    remove: function(userId, doc){
        return !!userId;
    }
});

DegreeCourseSchema = new SimpleSchema({ //Contains course info. (e.g. COMP-1411)
    Department_Code:{
      type: String,
      label:"Department Code",
      /*autoform: {
        options: function(){
          return LUCourses.find().fetch().map(function (course) {
            return {
              label: (course.Department_Code+" "+course.Course_Number+" "+course.Course_Name),
              value: course.Department_Code+"|||"+course.Course_Number //here ||| is used to tokenize the string in the future. Might be a better way to do this, it's a bit messy.
            };
          });
        }
      }*/
    },
    Course_Number: {
      type: Number,
      label: "Course Number"
    }
});

CourseGroupSchema = new SimpleSchema({ //Contains info related to groups of courses
    Group_Courses:{ //List of all the courses in the group.
      type: [DegreeCourseSchema],
      label: "Courses"
    },
    Number_Required:{ //The number of courses that are required from this group.
      type: Number,
      label: "Number of Credits Required"
    }
});

SpecialGroupSchema = new SimpleSchema({
    Course_Types:{
      label: "Course Type (e.g. CHEM, BIOL)",
      type: [String]
    },
    Minimum_Year_Level:{
      label: "Minimum year level",
      type:Number
    },
    Number_Required:{
      label: "Number of courses required",
      type: Number
    }
});

DegreeReqsSchema = new SimpleSchema({
  Degree_Name:{ //Name of specific degree (e.g. Honours Bachelors of Computer Science vs. Bachelors of Computer Science)
    type: String,
    label: "Degree Name"
  },
  Degree_Credits:{ //Credits required to complete a degree (e.g. 30)
    type: Number,
    decimal: true,
    label:"Credits Required for Degree"
  },
  Number_Electives:{
    label: "Number of semester-long electives student needs",
    type: Number
  },
  Degree_Requirements:{ //any absolute course a student must take (e.g. COMP 1411 - Computer Programming I)
    type: [DegreeCourseSchema],
    label:"Degree Courses",
    optional: true
  },
  Degree_Grouping: { //any situation where the student has a CHOICE of classes to take (e.g. Take 2 of the following 3 courses)
    type: [CourseGroupSchema],
    label: "Course Groupings",
    optional: true
  },
  Elective_Grouping:{ //any situation where the student needs to take two 2nd year PHYS courses etc...
    type: [SpecialGroupSchema],
    label: "Elective Courses (e.g. Choose any two 2nd year CHEM courses)",
    optional: true
  }
});

DegreeReqs.attachSchema(DegreeReqsSchema);
