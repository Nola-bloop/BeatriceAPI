import model from "../models/collaboration.model.js"

export default {
	Create : (req, res) => {
		if (
			!req.query.collaborator ||
			!req.query.playlistId
		) res.json({response:"missing query param"})

		model.Create(
			req.query.collaborator,
			req.query.playlistId
		).then((msg) =>{
			res.json({response:msg})
		}).catch((e)=>{ res.json({response:e.toString()}) })
	},
	ReadByCollaborator : (req, res) => {
		if (
			!req.params.id
		) res.json({response:"missing param"})

		model.ReadByCollaborator(
			req.params.id
		).then((rows) =>{
			res.json(rows)
		}).catch((e)=>{ res.json({response:e.toString()}) })
	},
	ReadByPlaylist : (req, res) => {
		if (
			!req.params.id
		) res.send({response:"missing param"})

		model.ReadByPlaylist(
			req.params.id
		).then((rows) =>{
			res.json(rows)
		}).catch((e)=>{ res.json({response:e.toString()}) })
	}
}