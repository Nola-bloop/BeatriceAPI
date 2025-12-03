import model from "../models/collaboration.model.js"

export default {
	Create : async (req) => {
		if (
			!req.query.collaborator ||
			!req.query.playlistId
		) return {response:"missing query param"}

		await model.Create(req.query.collaborator,req.query.playlistId)
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
	}
}