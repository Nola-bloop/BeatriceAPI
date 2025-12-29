import con from "../beatrice.db.js"

export default {
	Create : async (user, day, month, year) => {
		console.log("creating bday")
		return new Promise((resolve, reject) =>{
			con.query("INSERT INTO birthday (user_id, `date`) VALUES (?, ?)", [user, `${year}-${month}-${day}`], (e, results) => {
				if (!e) resolve("success.")
				else reject(e)
			})
		})
	},
	ReadId : async (id) => {
		return new Promise((resolve, reject) =>{
			con.query("SELECT * FROM birthday WHERE id = ?", [id], (e, results) => {
				if (!e) resolve(results[0])
				else reject(e)
			})
		})
	},
	ReadUser : async (userId) => {
		return new Promise((resolve, reject) =>{
			con.query("SELECT * FROM birthday WHERE user_id = ?", [userId], (e, results) => {
				if (!e) resolve(results)
				else reject(e)
			})
		})
	},
	Update : async (userId, day, month, year) => {
		console.log("updating bday")
		return new Promise((resolve, reject) =>{
			con.query("UPDATE birthday SET `user_id` = ?", [userId], (e, results) => {
				if (!e) resolve("success.")
				else reject(e)
			})
		})
	},
	Delete : async (birthdayId) => {
		return new Promise((resolve, reject) =>{
			con.query("DELETE FROM birthday WHERE  birthday.id = ?", [birthdayId], (e, results) => {
				if (!e) resolve("success.")
				else reject(e)
			})
		})
	},
	FlagOn : async (birthdayId) => {
		return new Promise((resolve, reject) =>{
			con.query("UPDATE birthday SET `flag` = 1 WHERE id = ?", [birthdayId], (e, results) => {
				if (!e) resolve("success.")
				else reject(e)
			})
		})
	},
	FlagOff : async (birthdayId) => {
		return new Promise((resolve, reject) =>{
			con.query("UPDATE birthday SET `flag` = 0 WHERE id = ?", [birthdayId], (e, results) => {
				if (!e) resolve("success.")
				else reject(e)
			})
		})
	},
}