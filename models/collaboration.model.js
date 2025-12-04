import con from "../beatrice.db.js"

export default {
	Create : async (collaborator, playlistId) => {
		return new Promise((resolve, reject) =>{
			con.query("INSERT INTO collaboration (collaborator, playlist_id) VALUES (?, ?)", [collaborator, playlistId], (e, results) => {
				if (!e) resolve("success.")
				else reject(e)
			})
		})
	},
	ReadByCollaborator : async (collaborator) => {
		return new Promise((resolve, reject) => {
			con.query("SELECT collaboration.* FROM collaboration WHERE collaboration.collaborator = ?", [collaborator], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
	ReadByPlaylist : async (playlistId) => {
		return new Promise((resolve, reject) => {
			con.query("SELECT collaboration.* FROM collaboration WHERE collaboration.playlist_id = ?", [playlistId], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
	ReadByBoth : async (id, playlistId) => {
		return new Promise((resolve, reject) => {
			con.query("SELECT collaboration.* FROM collaboration WHERE collaboration.playlist_id = ? AND collaboration.collaborator = ?", [playlistId, id], (e, results) => {
				if (!e) resolve(results[0])
				else reject(e)
			})
		})
	},
	Delete : async (collaborator, playlistId) => {
		return new Promise((resolve, reject) =>{
			con.query("DELETE FROM collaboration WHERE  collaboration.collaborator = ? AND collaboration.playlist_id = ?", [collaborator, playlistId], (e, results) => {
				if (!e) resolve("success.")
				else reject(e)
			})
		})
	},
}