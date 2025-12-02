import con from "../db/beatrice.db.js"

export default {
	Create : async (userId) => {
		return new Promise((resolve, reject) =>{
			con.query("INSERT INTO user (user_id) VALUES (?)", [userId], (e, results) => {
				if (!e) resolve("success.")
				else reject(e)
			})
		})
	},
	ReadId : async (id) => {
		return new Promise((resolve, reject) => {
			con.query("SELECT user.* FROM user WHERE user.id = ?", [id], (e, results) => {
				if (!e) resolve(results[0])
				else reject(e)
			})
		})
	},
}