
MyCollection = new Meteor.Collection('myCollection');

if (Meteor.isServer) {

    MyCollection.remove({});

    Meteor.methods({
        // Chrome: 7000. Firefox: 10000
        addDocs:    function() { for (var i=0; i<20000; ++i) MyCollection.insert({ value: i }); },
        changeDocs: function() { MyCollection.update({}, { $inc: { value: 1 } }, { multi: true }); },
        removeDocs: function() { MyCollection.remove({}); }
    });
}

if (Meteor.isClient) {

	Template.body.helpers({
        getValues: function() { return MyCollection.find(); }
    });

	Template.body.events({
        'click #addDocs':    function(event, template) { Meteor.call('addDocs');    },
        'click #changeDocs': function(event, template) { Meteor.call('changeDocs'); },
        'click #removeDocs': function(event, template) { Meteor.call('removeDocs');  }
	});

    MyCollection.find().observeChanges({
        added:   function(id, doc)    { console.log('Added');   },
        changed: function(id, fields) { console.log('Changed'); },
        removed: function(id)         { console.log('Removed'); }
    });
}
