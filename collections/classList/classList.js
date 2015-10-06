

//Create globally scoped Images collection.
ClassList = new FS.Collection("classLists", {
    stores: [new FS.Store.FileSystem("classLists",{path:"~/uploads"})],
    filter: {
        maxSize: 10485760, //in bytes
        allow: {
            contentTypes: ['text/csv'],
            extensions: ['csv']
        },
        onInvalid: function (message) {
            if(Meteor.isClient){
                alert(message);
            }else{
                console.warn(message);
            }
        }
    }
});


//Use allow to control insert, update, remove and download. In this case we will just allow them all.
ClassList.allow({
    insert: function(userId, file) {
        return true;
    },
    update: function(userId, file, fields, modifier) {
        return true;
    },
    remove: function(userId, file) {
        return true;
    },
    download: function() {
        return true;
    }
});


//If we're on the server publish the collection, otherwise we are on the client and we should subscribe to the publication.
if(Meteor.isServer){

    Meteor.publish('classLists', function (userID) {

        return ClassList.find();

    });

}else{
    console.log("This is my subscription");
    Meteor.subscribe('classLists');
}