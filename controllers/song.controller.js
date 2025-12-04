import model from "../models/song.model.js"
import playlists from "../models/playlist.model.js"
import userCtrl from "../controllers/user.controller.js"
import collaborationCtrl from "../controllers/collaboration.controller.js"
import 'dotenv/config'


function parseISO8601Duration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);

    return hours * 3600 + minutes * 60 + seconds;
}
function GetVideoId(url){
	try {
        const paramString = url.split('?')[1];
        if (paramString) {
            const query = new URLSearchParams(paramString);
            const videoId = query.get("v");
            if (videoId) return videoId;
        }

        // fallback for https://youtu.be/VIDEOID
        const match = url.match(/youtu\.be\/([^?]+)/);
        if (match) return match[1];

        return null;
    } catch {
        return null;
    }
}
async function GetVideoLength(videoId){
	const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${process.env.DBUSER}`;
    
    const response = await fetch(url);
    const videoObj = await response.json();

    if (videoObj.error) return [{ response: "Invalid API request." }, null];
    if (!videoObj.items || videoObj.items.length === 0)
        return [{ response: "Invalid video ID." }, null];

    const data = videoObj.items[0];
    const title = data.snippet.title;
    const durationISO = data.contentDetails.duration;

    const songLength = parseISO8601Duration(durationISO);

    return [songLength, title];
}

export default {
	Create : async (req) => {
		if (
			!req.query.userId ||
			!req.query.url ||
			!req.query.playlistId
		) return {response:"missing query param"}

		//sanity checks
		let user = await userCtrl.ReadUserIdInternal(req.query.userId)
		let playlist = await playlists.ReadId(req.query.playlistId)

		if (!playlist) return {response:"playlist does not exist."}

		let collaboration = collaborationCtrl.ReadByBothInternal(user.id, playlist.id)

		if (playlist.author !== user.id && !collaboration) return {response:"You are not authorized to edit this playlist."}


		let videoId = GetVideoId(req.query.url)
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
			!req.query.id ||
			!req.query.userId
		) return {response:"missing query param"}

		//sanity checks
		let user = await userCtrl.ReadUserIdInternal(req.query.userId)
		let song = await model.ReadId(req.query.id)
		let playlist = await playlists.ReadId(song.playlist_id)
		console.log(user)
		console.log(playlist)
		console.log(song)
		if (!playlist) return {response:"This playlist does not exist. " + song.playlist_id}

		if (!song) return {response:"song does not exist."}

		let collaboration = collaborationCtrl.ReadByBothInternal(user.id, playlist.id)

		if (playlist.author !== user.id && !collabotation) return {response:"You are not authorized to edit this playlist."}

		let videoId = GetVideoId(song.url)
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