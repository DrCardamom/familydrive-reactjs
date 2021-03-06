const sharedVar = require('../../config/sharedVariables');

 /** 
  * Generate a playlist on the user's Spotufy account. At this point the playlist has no songs in it. 
  * When generate the playlist, in turn you get and set a playlistID(sharedVar.playlistId) and playlistURL(sharedVar.playlistURL.)  
  * 
  */
const generatePlaylistUrl = (req, res, request) => {
  const create_a_playlist_bodyData =
  {
    name: req.body.playlistName,
    description: "Mixed-generation playlist created by the application 'Democratic Carpool Karaoke'. 2 songs from either generation are played by turn.",
    public: true
  }

  let playlistOptions =
  {
    url: 'https://api.spotify.com/v1/users/' + sharedVar.user_id + '/playlists',
    headers: { 'Authorization': 'Bearer ' + sharedVar.access_token,
               'Content-Type' : 'application/json'
             },
    json: true,
    body: create_a_playlist_bodyData
  };

  request.post(playlistOptions, (error, resp, body) =>
  {
    if(!error && resp.statusCode === 200 || 201)
    {
      sharedVar.playlistId = body.id;
      sharedVar.playlistURL = body.external_urls.spotify;

      console.log("============= SUCCESS: Created a playlist  ==============");
    }
    else
    {
      console.log("============= FAIL: Create a playlist  ==============");
      console.log(error);
      console.log(body);
      console.log("error => " + JSON.stringify(error));
      console.log("body => " + JSON.stringify(body));
      console.log(resp.statusCode);
      res.send('failed to create a playlist');
    }
  });
}

module.exports = {
   generatePlaylistUrl:generatePlaylistUrl
}