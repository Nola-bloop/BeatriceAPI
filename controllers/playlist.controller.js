import model from "../models/playlist.model.js"
import song from "../models/song.model.js"
import collaboration from "../models/collaboration.model.js"
import userCtrl from "../controllers/user.controller.js"

export default {
	Create : async(req) => {
		if (
			!req.query.name ||
			!req.query.userId
		) return {response:"missing query param"}

		let user = await userCtrl.ReadUserIdInternal(req.query.userId)
		await model.Create(req.query.name, 0, 0, user.id)
		return {"response":"success"}
	},
	ReadUser : async (req) => {
		if (
			!req.params.userId
		) return {response:"missing query param"}

		let user = await userCtrl.ReadUserIdInternal(req.params.userId)
		let rows = await model.ReadUser(user.user_id)
		return rows
	},
	ReadId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing params"}

		let playlist = await model.ReadId(req.params.id)
		let songs = await song.ReadPlaylistId(playlist.id)
		let collaborations = await collaboration.ReadByPlaylist(playlist.id)
		playlist.songs = songs
		playlist.collaborations = collaborators
		return playlist
	},
	Update : async (req) => {
		if (
			!req.query.id || 
			!req.query.userId ||
			(
				!req.query.name &&
				!req.query.author
			)
		) return {response:"missing query param"}

		let user = await userCtrl.ReadUserIdInternal(req.query.userId)
		let playlist = await model.ReadId(req.query.id)
		if (user.id === playlist.author){
			await model.Update(
				req.query.id,
				req.query.name ?? playlist.name,
				playlist.count,
				playlist.total_time,
				user.id ?? playlist.author
			)
			return {response: "success"}
		}
		else return {response:"You are not the author of this playlist."}
	},
	Delete : async (req) => {
		if (
			!req.query.id ||
			!req.query.userId
		) return {response:"missing query param"}
		

		let user = await userCtrl.ReadUserIdInternal(req.query.userId)
		let playlist = await model.ReadId(req.query.id)
		if (user.id === playlist.author){
			model.Delete(playlist.id)
			return {response:"success"}
		}
		else return {response:"You are not the author of this playlist."}
	}
}