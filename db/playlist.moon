 import Model from require "lapis.db.model"

class Playlist extends Model
	@relations ->
    has_many :collaborations

class Collaboration extends Model
	@relations ->
    belongs_to :playlist


GetUserPlaylists = (userId) ->
	authored_playlists = Playlist\select "WHERE author = ?", userId

  	-- 2. Find all collaboration entries for this user
	user_collaborations = Collaboration\select "WHERE user_id = ?", userId