'use strict';

module.exports = function(pluCodes) {

	pluCodes.howAboutThemApples = function(cb){
		pluCodes.find({
			where: {
				commodity: 'APPLES'
            }}, function (err, apples){
				cb(null, apples);
			})
		};	

	pluCodes.remoteMethod(
		'howAboutThemApples', {
			http: {
				path: '/howAboutThemApples',
				verb: 'get'
			},
			description: "returns APPLES",
			returns: {
				arg: 'PLUSet',
				type: 'json'

			}
		});


	pluCodes.sizes = function(cb){
		pluCodes.getDataSource().connector.connect(function(err, db) {
		  var collection = db.collection('pluCodes');
		  collection.distinct('size', function(err, data) {
		    if (err) return cb(err);
		    return cb(null, data);
		  });
		});
	}

	pluCodes.remoteMethod(
		'sizes', {
			http: {
				path: '/sizes',
				verb: 'get'
			},
			description: 'Gets list of sizes',
			returns: {
				arg: 'sizes',
				type: 'json'
			}
		});

};

