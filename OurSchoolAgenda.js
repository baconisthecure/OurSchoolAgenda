Students = new Mongo.Collection("students");


if (Meteor.isClient) {
  // This code only runs on  the client
  Template.body.helpers({
    students: function () {   
        // Otherwise, return all of the tasks
        return Students.find({});
      
    },
    numberStudents: function(){
     return Students.find().size();   
    }
  });
    
     
Template.body.events({


    "submit .new-task": function (event) {

        console.log(event);
        // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
      Meteor.call("addTask",text); 

      // Clear form
      event.target.text.value = "";
      },
    
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);

    }   
});
    
Template.classUploader.events({
'change .fileInput': function (event) {
            FS.Utility.eachFile(event, function(file) {               
                ClassList.insert(file);
            });
            
       }

});        

    
Template.images.images = function() {
	return Images.find();
};
    
Template.classLists.classLists = function() {
    console.log("in here");
	return ClassList.find();
};

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});
    
}
