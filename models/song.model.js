import con from "../beatrice.db.js"

export default {
	Create : async (name, url, length, playlistId) => {
		return new Promise((resolve, reject) =>{
			con.query("INSERT INTO song (name, url, length, playlist_id) VALUES (?, ?, ?, ?)", [name, url, length, playlistId], (e, results) => {
				if (!e) resolve("success.")
				else reject(e)
			})
		})
	},
	ReadId : async (id) => {
		return new Promise((resolve, reject) => {
			con.query("SELECT song.* FROM song WHERE song.id = ?", [id], (e, results) => {
				if (!e) resolve(results[0])
				else reject(e)
			})
		})
	},
	ReadPlaylistId : async (playlistId) => {
		return new Promise((resolve, reject) => {
			con.query("SELECT song.* FROM song WHERE song.playlist_id = ?", [playlistId], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
	Delete : async (id) => {
		return new Promise((resolve, reject) =>{
			con.query("DELETE FROM song WHERE id = ?", [id], (e, results) => {
				if (!e) resolve("success.")
				else reject(e)
			})
		})
	},
}