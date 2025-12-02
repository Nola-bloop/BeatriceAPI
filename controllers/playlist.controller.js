import model from "../models/playlist.model.js"
import song from "../models/song.model.js"
import collaboration from "../models/collaboration.model.js"
import userCtrl from "../controllers/user.controller.js"

export default {
	Create : (req, res) => {
		if (
			!req.query.name ||
			!req.query.count ||
			!req.query.total_time ||
			!req.query.userId
		) res.send({response:"missing query param"})

		userCtrl.ReadUserIdInternal(
			req.query.userId
		).then((user) => {
			model.Create(
				req.query.name,
				req.query.count,
				req.query.total_time,
				user.id,
			).then((msg) =>{
				res.json({response:msg})
			}).catch((e)=>{ res.json({response:e.toString()}) })
		}).catch((e)=>{ res.json({response:e.toString()}) })
	},
	ReadUser : (req, res) => {
		if (
			!req.params.userId
		) res.send({response:"missing query param"})

		userCtrl.ReadUserIdInternal(
			req.query.userId
		).then((user) => {
			model.ReadUser(
				req.params.userId
			).then((rows) =>{
				res.json({
					hits: rows,
				})
			}).catch((e)=>{ res.json({response:e.toString()}) })
		}).catch((e)=>{ res.json({response:e.toString()}) })
	},
	ReadId : (req, res) => {
		if (
			!req.params.id
		) res.send({response:"missing params"})

		model.ReadId(
			req.params.id
		).then((playlist) =>{
			song.ReadPlaylistId(playlist.id).then((songs) =>{
				collaboration.ReadByPlaylist(playlist.id).then((collaborators) => {
					playlist.songs = songs
					playlist.collaborations = collaborators
					res.json(playlist)
				}).catch((e)=>{ res.json({response:e.toString()}) })
			}).catch((e)=>{ res.json({response:e.toString()}) })
		}).catch((e)=>{ res.json({response:e.toString()}) })
	},
	Update : (req, res) => {
		if (
			!req.query.id || (
				!req.query.name &&
				!req.query.count &&
				!req.query.total_time &&
				!req.query.author
			)
		) res.json({response:"missing query param"})

		userCtrl.ReadUserIdInternal(
			req.query.userId
		).then((user) => {
			model.ReadId(
				req.query.id
			).then((playlist) => {
				if (user.id == playlist.author){
					model.Update(
					req.query.id,
					req.query.name ?? playlist.name,
					req.query.count ?? playlist.count,
					req.query.total_time ?? playlist.total_time,
					user.id ?? playlist.author
					).then((msg) =>{
						res.json({response:msg})
					}).catch((e)=>{ res.json({response:e.toString()}) })
				}
			}).catch((e)=>{ res.json({response:e.toString()}) })
		}).catch((e)=>{ res.json({response:e.toString()}) })
	},
	Delete : (req, res) => {
		if (
			!req.query.id
		) res.json({response:"missing query param"})
		
		userCtrl.ReadUserIdInternal(
			req.query.userId
		).then((user)=> {
			model.ReadId(
				req.query.id
			).then((playlist) => {
				if (user.id == playlist.author){
					model.Delete(
						req.query.id
					).then((msg) =>{
						res.json({"response":msg})
					}).catch((e)=>{ res.json({response:e.toString()}) })
				}
			}).catch((e)=>{ res.json({response:e.toString()}) })
		})
	}
}