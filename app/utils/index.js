const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { getUserById } = require("../actions");

const cloudinary =  require("cloudinary");
const dotenv =  require("dotenv");

const result  = dotenv.config();

try{
	if(result.error) throw result.error;
}catch(e){
	console.log(e);
}

function getUserId(context) {
	const Authorization = context.request.get("Authorization");
	if (Authorization) {
		const token = Authorization.replace("JWT ", "");
		const { _id } = jwt.verify(token, SECRET_KEY);
		return getUserById(_id);
	}
	throw new Error("Not authenticated");
}

module.exports = {
	getUserId
};
