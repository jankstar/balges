/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , util = require('util');

/**
 * Schema definition
 */

var Address = new Schema({
	data : {
    	street: { type: String }
	,	nr:     { type: Number }
	,	code:   { type: String }
	,   city:   { type: String }
	,   land:   { type: String }
	,   type:   { type: String }
}});

Address
.virtual('data.full')
.get(function () {
	return this.data.street + " " + this.data.nr + "/" + this.data.land + "-" + this.data.code + "/" + this.data.city;
})

var Contact = new Schema({
    data: {
		name: {
        	first: String
      	  , last : String
    	}
  	  , title:      { type: String }
      , salutation: { type: String }
      , email:      { type: String, required: true, index: { unique: true, sparse: true } }
      , birth :     { type: Date }
      , addresses:   [Schema.ObjectId]
}});

Contact
.virtual('data.name.full') // name.full as set/get firt + " " + last name
.get(function () {
  return this.data.name.first + ' ' + this.data.name.last;
})
.set(function (setFullNameTo) {
  var split = setFullNameTo.split(' ')
    , firstName = split[0]
    , lastName = split[1];

  this.set('data.name.first', firstName);
  this.set('data.name.last', lastName);
});

/**
 *
 */
error_log = function(err) {
	if (err) { 
		console.log("Error: " + err.message );
	} else {
		console.log("It is stored in the database." );
	}		
}

/**
 *	
 */

mongoose.connect('127.0.0.1','balges', 27017);
console.log("Verbindung zu mongoDB gestartet ...");
var modAddress = mongoose.model('Address', Address);
var modContact = mongoose.model('Contact', Contact);

/**
 *
 */
modContact.find({}, function (err, docs) {
	docs.forEach(function (elem) {
		console.log("contact: " + elem.data.name.full + " eMail: " + elem.data.email );
		elem.data.addresses.forEach(function (elem_adr) {
			modAddress.findById(elem_adr._id, function (err, doc_adr) {
				if (err) {
					console.log("- Address: " + doc_adr.data.full );						
				}
			})
		})			
	});

//	var newAddress = new modAddress({ data: { street: "Knobelsdorffstr.", nr: "19", code: "14059", city: "Berlin", land: "DE"} })
//	newAddress.save(error_log);
//	var newContact = new modContact({ data: { name: { last: "Kramer", first: "Jan" }, email: "jan.kramer@mac.com" }});
//	newContact.data.addresses.push(newAddress._id);
//	newContact.save(error_log);

	console.log(util.inspect(process.memoryUsage()));
	//process.exit(1);

});