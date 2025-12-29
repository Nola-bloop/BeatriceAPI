import model from "../models/birthday.model.js"
import userCtrl from "../controllers/user.controller.js"

export default {
	Create : async (req) => {
		if (
			!req.query.userId ||
			!req.query.day ||
			!req.query.month ||
			!req.query.year
		) return {response:"missing query param"}

		if (req.query.day > 31 || req.query.day < 1) return {response:"Invalid date."}
		if (req.query.month > 12 || req.query.day < 1) return {response:"Invalid month."}
		if (req.query.year > new Date().getFullYear() || req.query.day < 1) return {response:"Invalid year. Cannot be higher than current year."}

		let user = await userCtrl.ReadUserIdInternal(req.query.userId)
		let possibleBday = await model.ReadUser(user.id)

		if (typeof possibleBday !== "undefined"){
			console.log(possibleBday)
			await model.Update(user.id, req.query.day, req.query.month, req.query.year)
		}
		else await model.Create(user.id, req.query.day, req.query.month, req.query.year)
		return {"response": "success"}
	},
	ReadId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		let birthday = await model.ReadId(req.params.id)
		return birthday
	},
	ReadUser : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		let user = await userCtrl.ReadUserIdInternal(req.query.userId)

		let birthday = await model.ReadUser(user.id)
		return birthday
	},
	Read : async (req) => {
		let birthdays = await model.Read()
		return birthdays
	},
	GetShowBool : async (req) => {
		if (
			!req.params.userId &&
			!req.params.birthdayId
		) return {response:"missing param"}

		let user
		if (req.params.userId)
			user = await userCtrl.ReadUserIdInternal(req.query.userId)

		let birthday

		if (typeof user !== "undefined")
			birthday = await model.ReadUser(user.id)
		else
			birthday = await model.ReadId(req.params.birthdayId)

		if (!birthday) return {response:"No birthday found."}



		let presetValue = birthday.flag
		let date = new Date(birthday.date)
		date.setMonth(date.getMonth())

		let warningThreshold = new Date(birthday.date)
		warningThreshold.setUTCDate(warningThreshold.getUTCDate() - 7) //warn 1 week earlier
		
		let today = new Date()

		if (today > warningThreshold && today < date && presetValue === 0){
			model.FlagOn(birthday.id)
			return {show: true}
		}
		else if (today > warningThreshold && today > date) model.FlagOff(birthday.id)

		return {show:false}
	},
	Delete : async (req) => {
		if (
			!req.query.userId ||
			!req.query.birthdayId
		) return {response:"missing query param"}

		let user = await userCtrl.ReadUserIdInternal(req.query.userId)
		let birthday = await model.ReadId(req.query.birthdayId)
		if (!birthday) return {response:"This birthday does not exist."}

		if (birthday.user_id != user.id) return {response:"You did not create this birthday."}

		await model.Delete(collaborator.id,playlist.id)
		return {"response": "success"}
	}
}