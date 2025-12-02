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
	ReadUserId : (req, res) => {
		if (
			!req.params.id
		) res.json({response:"missing param"})

		model.ReadUserId(
			req.params.id
		).then((user) =>{
			if (Object.keys(user).length === 0){
				model.Create(req.params.id).then((msg) => {
					model.ReadUserId(req.params.id).then((user) => {
						res.json(user)
					}).catch((e)=>{ res.json({response:e.toString()}) })
				}).catch((e)=>{ res.json({response:e.toString()}) })
			}else res.json(user)
		}).catch((e)=>{ res.json({response:e.toString()}) })
	}
	ReadUserIdInternal : async (id) => {
    if (!id) throw new Error("missing param");

    try {
        let user = await model.ReadUserId(id);

        if (Object.keys(user).length === 0) {
            await model.Create(id);
            user = await model.ReadUserId(id);
        }

        return user;
    } catch (e) {
        throw new Error(e.toString());
    }
}
}