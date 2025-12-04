import model from "../models/song.model.js"
import playlists from "../models/playlist.model.js"
import userCtrl from "../controllers/user.controller.js"
import collaborationCtrl from "../controllers/collaboration.controller.js"

async function GetVideoLength(videoId){
	const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=AIzaSyBxaqbqnsNVUeh8ERH37-AAY5WluNZPpxw`
	const response = await fetch(url, {
	  method: "GET"
	});
	const videoObj = await response.json()
	if (videoId.error) return {response:"Invalid url."}
	const title = videoObj.item[0].snippet.title
	const ptms = videoObj.item[0].contentDetails.duration
	const minuteMark = ptms.search("M")
	const minutes = Number(ptms.substring(1,(minuteMark-ptms.length)))
	const seconds = Number(ptms.substring(minuteMark+1, -1))
	const songLength = (minutes*60)+seconds
	return [songLength, title]
}

export default {
	Create : async (req) => {
		if (
			!req.query.userId ||
			!req.query.name ||
			!req.query.url ||
			!req.query.playlistId
		) return {response:"missing query param"}

		//sanity checks
		let user = await userCtrl.ReadUserIdInternal(req.query.userId)
		let playlist = playlists.ReadId(req.query.playlistId)

		if (!playlist) return {response:"playlist does not exist."}

		let collaboration = collaborationCtrl.ReadByBothInternal(user.id, playlist.id)

		if (playlist.author !== user.id && !collabotation) return {response:"You are not authorized to edit this playlist."}

		let paramString = req.query.url.split('?')[1];
        let queryString = new URLSearchParams(paramString);
        let videoId = "";
        for(let pair of queryString.entries()) {
        	if (pair[0] == v){
        		videoId = pair[1]
        	}
        }
		let [songLength, title] = await GetVideoLength(videoId)
		if (songLength.response) return songLength //in case of error
		//--------------

		await playlists.Update(
			playlist.id,
			playlist.name,
			playlist.count+1,
			playlist.total_time+songLength,
			playlist.author
		)


		await model.Create(
			title,
			req.query.url,
			songLength,
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

		//sanity checks
		let user = await userCtrl.ReadUserIdInternal(req.query.userId)
		let song = await model.ReadId(req.query.id)
		let playlist = playlists.ReadId(req.query.playlistId)

		if (!song) return {response:"song does not exist."}

		let collaboration = collaborationCtrl.ReadByBothInternal(user.id, playlist.id)

		if (playlist.author !== user.id && !collabotation) return {response:"You are not authorized to edit this playlist."}

		let paramString = song.url.split('?')[1];
        let queryString = new URLSearchParams(paramString);
        let videoId = "";
        for(let pair of queryString.entries()) {
        	if (pair[0] == v){
        		videoId = pair[1]
        	}
        }
		let [songLength, title] = await GetVideoLength(videoId)
		if (songLength.response) return songLength //in case of error
		//--------------



		await playlists.Update(
			playlist.id,
			playlist.name,
			playlist.count-1,
			playlist.total_time-songLength,
			playlist.author
		)

		await model.Delete(req.query.id)

		return {response:"success"}
	}
}