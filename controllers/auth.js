// const firebase = require('firebase');
// const admin = require('firebase-admin');

exports.createUser = async function(req, res) {
	try {
		let { email, password, firstName, lastName } = req.body;
		
		res.set("token", 'mytoken');
		res.status(200).json({ message: 'Request recieved', body: req.body })
		// const userRecord = await admin.auth().createUser({
		// 	email,
		// 	emailVerified: true,
		// 	password
		// });
		
		// const customToken =	await	admin.auth().createCustomToken(userRecord.uid);
		
		// Add user to firestore 
		// admin.firestore().setDoc();
		
		// res.setHeaders() token
		// token would be taken from req.headers when authenticating
		
		// res.status(201).json(userRecord);
		
	}	catch(error) {
		res.status(500).send(error);
	}
}

exports.login = async function(req, res) {
	try {
		const userRecord = await admin.auth().signInWithEmailAndPassword(req.body.email, req.body.password);
	
		const customToken = await admin.auth().createCustomToken(userRecord.uid);
	
		// res.setHeaders() token
		// token would be taken from req.headers when authenticating
	
		res.status(204).send();
	
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.updateUser = async function(req, res) {
	try {
console.log(req.headers);

		// req.uid was passed in from authenticate
		// await	getAuth().updateUser(req.uid, {
		// 		displayName: req.body.displayName
		// 	});
		
		res.status(200).send();
	} catch(error) {
			res.status(500).send(error);
	}
}

exports.authenticate = async function(req, res, next) {
	try {
		if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
			const idToken = '';// Get it from req.headers
			const decodedToken = await admin.auth().verifyIdToken(idToken);
			
			if(!decodedToken.uid) {
				throw new Error('');
			}
			
			req.uid = decodedToken.uid;
			
			next();
		} else {
			throw new Error('');
		}
	} catch (error) {
		res.status(401).redirect('/login.html');
	}
}