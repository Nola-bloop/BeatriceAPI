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
			if (!user){
				model.Create(req.params.id).then((msg) => {
					model.ReadId(req.params.id).then((user) => {
						return res.json(user)
					}).catch((e)=>{ res.json({response:e.toString()}) })
				}).catch((e)=>{ res.json({response:e.toString()}) })
			}else res.json(user)
		}).catch((e)=>{ res.json({response:e.toString()}) })
	}
}