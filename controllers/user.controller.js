import model from "../models/user.model.js"

export default {
	Create : (req, res) => {
		if (
			!req.query.userId
		) res.json({response:"missing query param"})

		model.Create(
			req.query.userId
		).then((msg) =>{
			res.json({response:msg})
		}).catch((e)=>{ res.json({response:e.toString()}) })
	},
	ReadId : (req, res) => {
		if (
			!req.params.id
		) res.json({response:"missing param"})

		model.ReadId(
			req.params.id
		).then((user) =>{
			res.json(user)
		}).catch((e)=>{ res.json({response:e.toString()}) })
	}
}