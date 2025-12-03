import model from "../models/user.model.js"

export default {
	Create : async (req) => {
		if (
			!req.query.userId
		) return {response:"missing query param"}

		await model.Create(req.query.userId)
		return {response:"success"}
	},
	ReadUserId : async (req) => {
		if (
			!req.params.userId
		) return {response:"missing param"}

		let user = await model.ReadUserId(req.params.userId)
		if (Object.keys(user).length === 0){
			await model.Create(req.params.userId)
			user = await model.ReadUserId(req.params.userId)
		}
		return user
	},
	ReadUserIdInternal : async (id) => {
		let user = await model.ReadUserId(userId);
		
		if (!user || Object.keys(user).length === 0) {
		    await model.Create(userId);
		    user = await model.ReadUserId(userId);
		}

		return user;
    }
}