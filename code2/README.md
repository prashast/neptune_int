DESIGN
=======
The slack app has been built using Node.js. The web server
has been designed to listen on the host machine itself on 4390 port
and ngrok was used in order to make http://localhost:4390 publically
visible to the Slack API.

After authenticating our app with the dummy slack channel that I'd
set up, I chose to use the incoming-webhook API in order to post 
interactive messages into the slack channel.

As of now for the prototype I am sending the 'trigger message' once 
as a POC. Later, we can add support for making these messages event-driven


NOTES
======

I've tried to keep the interactive message being displayed as close
to the specifications however there are some formatting discrepancies
that I didn't take care of due to lack of time. 

 
