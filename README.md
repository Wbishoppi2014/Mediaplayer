### Clone sources to your own virtual machine

`git clone https://github.com/jvanhalen/mediaplayer.git`

copy the files over your OpenShift mediaplayer application.

### Install MySQL 

`sudo apt-get install mysql-server`

Set root password to 'test1234'.

### Preparations
Move to your mediaplayer application folder. 

 - Run command `npm install`
 - Run command `mysql -u root -p < ./database.sql` in your OpenShift application root folder.
 - Run command `nodejs server.js`

### Music from opengameart.org

http://opengameart.org/content/epic-fantasy-music

- http://opengameart.org/sites/default/files/Soliloquy_1.mp3
- http://opengameart.org/sites/default/files/Arabesque.mp3
- http://opengameart.org/sites/default/files/Gran%20Batalla.mp3