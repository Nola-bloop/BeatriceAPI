lapis = require "lapis"

class extends lapis.Application
  [profile: "/:name"]: =>
    @html ->
      div class: "profile", ->
        text "Welcome to the profile of ", @params.name