Students = new Mongo.Collection("students");




//If we're on the server publish the collection, otherwise we are on the client and we should subscribe to the publication.
if(Meteor.isServer){

    Meteor.publish('students', function () {

        return Students.find();

    });

}else{
    Meteor.subscribe('students');
}