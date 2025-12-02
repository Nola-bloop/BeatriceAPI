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
	}
}