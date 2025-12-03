import model from "../models/song.model.js"

export default {
	Create : async (req) => {
		if (
			!req.query.name ||
			!req.query.url ||
			!req.query.length ||
			!req.query.playlistId
		) return {response:"missing query param"}

		await model.Create(
			req.query.name,
			req.query.url,
			req.query.length,
			req.query.playlistId
		)
		return {response:"success"}
	},
	ReadId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		let rows = await model.ReadId(req.params.id)
		return rows
	},
	ReadPlaylistId : async (req) => {
		if (
			!req.params.id
		) return {response:"missing param"}

		let rows = model.ReadPlaylistId(req.params.id)
		return rows
	},
	Delete : async (req) => {
		if (
			!req.query.id
		) return {response:"missing query param"}

		await model.Delete(req.query.id)
		return {response:"success"}
	}
}