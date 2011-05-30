What is NoiseCloud?
===================
NoiseCloud was initially created for the Music Hack Day 2011 in Berlin
(check it out at http://wiki.musichackday.org/index.php?title=NoiseCloud).
With NoiseCloud you can collaboratively work on a art-noise installation on
the web. Create basic sound patches, plug them together, build on top of
other people's build while they're still working on it and see what other
people do with your noises.

About the hack
---------------
We wanted to hack on the latest yet-to-come feature for HTML, the Web Audio
API. Using a first implementation in Chromium / Google Chrome, we created an
interactive show and creation room, where people can build their own sound
patches from scratch. In real-time with other users from potentially all over
the world. The sound is generated entirely in the browser and can be created
and customized using simple, so called, "patches". These patches generate or
alter the sound that you hear and they can be directly accessed by all the
other users that are online. Grab some of their noise, combine it with your
own and let other people build on the results again!


Get it up running
==================
To run the server, all you need to do is

* install node.js (see: http://nodejs.org/)
* install npm (see: http://howtonode.org/introduction-to-npm)
* install Socket.io (npm install socket.io)

Then simply execute 'node server.js'