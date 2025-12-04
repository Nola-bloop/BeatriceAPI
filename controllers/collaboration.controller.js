import model from "../models/collaboration.model.js"
import userCtrl from "../controllers/user.controller.js"
import playlists from "../models/playlist.model.js"

export default {
	Create : async (req) => {
		if (
			!req.query.userId ||
			!req.query.collaborator ||
			!req.query.playlistId
		) return {response:"missing query param"}

		let user = await userCtrl.ReadUserIdInternal(req.query.userId)
		let collaborator = await userCtrl.ReadUserIdInternal(req.query.collaborator)
		let playlist = await playlists.ReadId(req.query.playlistId)
		if (!playlist) return {response:"This playlist does not exist."}

		//check if collaboration exists
		let collaboration = await model.getByBoth(user.id, playlist.id)
		if (collaboration) return {response:"User is already a collaborator."}


		if (playlist.author != user.id) return {response:"You are not the author of this playlist."}

		await model.Create(collaborator.id,playlist.id)
		return {"response": "success"}
	},
	ReadByCollaborator : async (req, res) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		let rows = await model.ReadByCollaborator(req.params.id)
		return rows
	},
	ReadByPlaylist : async (req, res) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		let rows = await model.ReadByPlaylist(req.params.id)
		return rows
	},
	ReadByBothInternal : async (id, playlistId) => {
		return await model.ReadByBoth(id, playlistId)
	},
	Delete : async (req) => {
		if (
			!req.query.userId ||
			!req.query.collaborator ||
			!req.query.playlistId
		) return {response:"missing query param"}

		let user = await userCtrl.ReadUserIdInternal(req.query.userId)
		let collaborator = await userCtrl.ReadUserIdInternal(req.query.collaborator)
		let playlist = await playlists.ReadId(req.query.playlistId)
		if (!playlist) return {response:"This playlist does not exist."}

		if (playlist.author != user.id) return {response:"You are not the author of this playlist."}

		await model.Delete(collaborator.id,playlist.id)
		return {"response": "success"}
	}
}