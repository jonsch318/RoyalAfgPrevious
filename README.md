# RoyalAfg
Dies ist das Repository zu der Online Casino Webseite des Projektkurs Informatik.
## Voraussetzungen
Folgende tools müssen installiert sein.
 - Node 
 - npm, am besten yarn

## Instalation
In der cmd zu web gehen und die Bibliotheken herunterladen.

    cd .\web\
	yarn install //oder 
	npm install
dann eine neues Fenster öffnen und die Bibliotheken des Servers herunterladen

    cd .\server\
    yarn install //oder
    npm install

## Starten der Anwendung
zwei cmd oder Powershell Fenster öffnen. In dem einem Fenster folgendes ausführen:

    cd .\server\
    yarn start

in auch im anderem Fenster folgendes ausführen:

    cd .\web\
    yarn start //oder falls @angular/cli global installiert wurde
    ng serve --prod
Die Webseite sollte nun auf Port 4200 erreichbar sein.
[Link, falls Server ausgeführt wird.](http://localhost:4200)
