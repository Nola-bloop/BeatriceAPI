import model from "../models/song.model.js"

export default {
	Create : (req, res) => {
		if (
			!req.query.name ||
			!req.query.url ||
			!req.query.length ||
			!req.query.playlistId
		) res.json({response:"missing query param"})

		model.Create(
			req.query.name,
			req.query.url,
			req.query.length,
			req.query.playlistId,
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
		).then((rows) =>{
			res.json(rows)
		}).catch((e)=>{ res.json({response:e.toString()}) })
	},
	ReadPlaylistId : (req, res) => {
		if (
			!req.params.id
		) res.send({response:"missing param"})

		model.ReadPlaylistId(
			req.params.id
		).then((rows) =>{
			res.json({
				hits: rows
			})
		}).catch((e)=>{ res.json({response:e.toString()}) })
	},
	Delete : (req, res) => {
		if (
			!req.query.id
		) res.send({response:"missing query param"})

		model.ReadId(
			req.query.id
		).then((song) => {
			model.Delete(
				req.query.id
			).then((msg) =>{
				res.json({"response":msg})
			}).catch((e)=>{ res.json({response:e.toString()}) })
		}).catch((e)=>{ res.json({response:e.toString()}) })
	}
}