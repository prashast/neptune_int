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

As soon as someone presses the 'Acknowledge' button on the trigger message,
the original message is update as given in the specification and a new message
is sent as well. 

NOTES
======

There's a video attached of the interactive messaging in action because 
in order to run it on your side, the slack channels would have to be reconfigured 
to point to the correct URL's, clientSecret and clientID to be changed which might 
be inconvenient
I've tried to keep the interactive message being displayed as close
to the specifications as possible however there are some formatting discrepancies
that I didn't take care of due to lack of time. 

As of now the messages which are spit out by the server are hardcoded. We can 
add support later for spitting out custom messages based on the real time event that
occurs.
 
