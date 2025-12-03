import con from "../beatrice.db.js"

export default {
	Create : async (name, count, total_time, author) => {
		return new Promise((resolve, reject) =>{
			con.query("INSERT INTO playlist (name, count, total_time, author) VALUES (?, ?, ?, ?)", [name, count, total_time, author], (e, results) => {
				if (!e) resolve("success.")
				else reject(e)
			})
		})
	},
	ReadUser : async (id) => {
		console.log("readuser id: "+id)
		return new Promise((resolve, reject) => {
			con.query("SELECT playlist.* FROM playlist INNER JOIN `user` ON `user`.id = playlist.author WHERE `user`.user_id = ? UNION SELECT playlist.* FROM `playlist` INNER JOIN `collaboration` ON playlist.id = collaboration.playlist_id INNER JOIN `user` ON user.id = collaboration.collaborator WHERE user.user_id = ?", [id, id], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
	ReadId : async (id) => {
		return new Promise((resolve, reject) => {
			con.query("SELECT playlist.* FROM playlist WHERE playlist.id = ?", [id], (e, results) => {
				if (!e) resolve(results[0])
				else reject(e)
			})
		})
	},
	Update : async (id, name, count, total_time, author) => {
		return new Promise((resolve, reject) =>{
			con.query("UPDATE playlist SET name = ?, count = ?, total_time = ?, author = ? WHERE id = ?", [name, count, total_time, author, id], (e, results) => {
				if (!e) resolve("success.")
				else reject(e)
			})
		})
	},
	Delete : async (id) => {
		return new Promise((resolve, reject) =>{
			con.query("DELETE FROM playlist WHERE id = ?", [id], (e, results) => {
				if (!e) resolve("success.")
				else reject(e)
			})
		})
	},
}