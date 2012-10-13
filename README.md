# PHP Usergroup Hamburg

## Technik

Für die Generierung der Webseite nutzen wir Jekyll-Bootstrap. 
Die Dokumentation findet man unter: <http://jekyllbootstrap.com>

Ein Jekyll Server kann einfach im Root Verzeichnis gestartet werden.

## Template

Das Template ist zu finden im Ordner `_includes/themes/phpughh`.

## CSS Generierung

Das CSS wird per Less generiert. Falls nicht bekannt kann man dies [hier](http://lesscss.org/) nachlesen. 

Im Root Verzeichnis gibt es ein Bash-Script `compile`. Wenn Less korrekt installiert wurde, sollte dies
aufgerufen werden können, um eine neue CSS Datei im richtigen Verzeichnis zu erstellen.

## Assets

Assets findet man im Verzeichnis `assets/themes/phpughh` wieder. Icons sollten wenn möglich
in Spritesheets konvertiert werden. Ein sehr schönes HTML5 Tool dafür findet man unter <http://draeton.github.com/stitches/>

Das erstellte CSS kann man einfach in die Less Datei kopieren.

## Erstellen von Talks

Talks können mit dem Befehl `rake talk title="Titel des Talks"` erstellt werden. Zusätzlich zum 
`title` Parameter gibt es noch folgende Parameter

 - `date` Datum des Talks
 - `slide` URL zu hochgeladenen Slides