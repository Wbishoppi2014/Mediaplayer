DROP DATABASE IF EXISTS mediaplayer;-- "pudotetaan" tietokanta jos se oli luotu aiemmin
DROP USER mediaplayer; -- poistetaan mediaplayer käyttäjä
CREATE USER mediaplayer;-- luodaan käyttäjä nimeltään mediaplayer 
CREATE DATABASE mediaplayer; -- luo tietokanta

USE mediaplayer; -- käytä juuri luotua mediaplayer tietokantaa

CREATE TABLE kayttaja (id INT, PRIMARY KEY (id), tunnus VARCHAR(30) NOT NULL, salasana VARCHAR(60) NOT NULL); -- luodaan kayttajataulu
CREATE TABLE kappale(id INT, PRIMARY KEY (id), artist VARCHAR(20) NOT NULL, genre VARCHAR(20) NOT NULL, songname VARCHAR(20) NOT NULL, pituus VARCHAR(10) NOT NULL, link VARCHAR(80)); -- luodaan kappaletaulu
CREATE TABLE soittolista (kappaleid INT, kayttajaid INT, FOREIGN KEY (kappaleid) REFERENCES kappale(id), FOREIGN KEY (kayttajaid) REFERENCES kayttaja(id)); -- luodaan soittolista taulu

INSERT INTO kayttaja VALUES (1, 'heikki', '61834407e1a3d83baa4ccc9484b13b13463fa97a'); -- lisätään käyttäjätauluun informaatiota. 

INSERT INTO kappale VALUES (1,'Eliot Corley','Klassinen','Peaceful music','3:55','http://opengameart.org/sites/default/files/September%20%28Master%29.mp3');
INSERT INTO kappale VALUES (2,'Eric Matyas','Scifi','Cyber streets','3:30','http://opengameart.org/sites/default/files/Cyber%20Streets.mp3');
INSERT INTO kappale VALUES (3,'Clearside','Scifi','Assimilator','3:25','http://opengameart.org/sites/default/files/Clearside%20-%20Assimilator.wav');
INSERT INTO kappale VALUES (4,'Snabisch','Dance','Dance and loop','2:30','http://opengameart.org/sites/default/files/Dance%20and%20Jump.ogg');
INSERT INTO kappale VALUES (5,'FoxSynergy','Dance','Cluster Block','3:00','http://opengameart.org/sites/default/files/Cluster%20Block%20v0_8.mp3');

INSERT INTO soittolista VALUES(1,1);
INSERT INTO soittolista VALUES(3,1);
INSERT INTO soittolista VALUES(5,1);

GRANT SELECT ON mediaplayer.* TO mediaplayer; -- annetaan mediaplayer käyttäjälle oikeudet mediaplayer tietokantaan



