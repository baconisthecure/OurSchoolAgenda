Students = new Mongo.Collection("students");

Students.attachSchema(new SimpleSchema({
  firstName: {
    type: String,
    label: "First Name",
    max: 20
  },
  lastName: {
    type: String,
    label: "Last Name",
      max: 20
  },
 nickName: {
    type: String,
    label: "Nick Name",
     optional: true,
     max: 20
  },
  dateOfBirith: {
    type: Date,
    label: "Birth Day",
    optional: true
  },
    
    tags: { type: Array, optional:true},
    'tags.$': { type:Object}, 
    'tags.$.FirstName':{type:String},
    'tags.$.LastName':{type:String},
    'tags.$.emailAddress':{type:String},
    'tags.$.PrimaryCaregiver':{type:Boolean,defaultValue:true},
      
  notes: {
    type: String,
    label: "notes",
    optional: true,
    max: 1000
  }
}));


//If we're on the server publish the collection, otherwise we are on the client and we should subscribe to the publication.
if(Meteor.isServer){

    Meteor.publish('students', function () {

        return Students.find();

    });

}else{
    Meteor.subscribe('students');
}