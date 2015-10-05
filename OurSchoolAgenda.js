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
                console.log(file);
                ClassList.insert(file);
            });
            
       }

});    
    
   Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Meteor.call("setChecked", this._id, ! this.checked);
    },
    "click .delete": function () {
      Meteor.call("deleteTask", this._id);
    }
  }); 
    
    
Template.images.images = function() {
	return Images.find();
};
    
Template.classList.classList = function() {
	return ClassList.find();
};
    
      Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
    
}


Meteor.methods({
  addTask: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function (taskId) {
    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
    Tasks.update(taskId, { $set: { checked: setChecked} });
  }
});
