# sippsack.github.io

## Clientseitige Suche

Die Lupe im Seitenkopf und der Menüpunkt „Suche“ öffnen auf jeder Seite einen
modalen Dialog. Schließen ist per Escape, Schließen-Button oder Klick auf
den Hintergrund möglich; der Fokus kehrt zur Lupe zurück. Die Hintergrundseite
bleibt stehen, die Trefferliste scrollt innerhalb des Dialogs.
Der Browser lädt beim ersten Öffnen einmalig die eigenen Seiten `/portfolio/`, `/talks/` und
`/publications/` und durchsucht deren einzelne Einträge, einschließlich
Abstracts, Veranstaltern und Verlagen. Es gibt keinen externen Suchdienst.
Mehrere Suchwörter werden mit UND verknüpft; Groß-/Kleinschreibung und
Akzente werden ignoriert. Treffer im Titel stehen zuerst. Typfilter,
markierte Suchbegriffe erleichtern die Suche. Alle Treffer werden im Dialog angezeigt.
Externe Artikel werden nur verlinkt, ihr Volltext wird nicht abgerufen.

## Terminticker auf der Startseite

Der Ticker zeigt zwei Vortrags- oder Schulungstermine, gemeinsam chronologisch sortiert, zwischen
Kurzprofil und Kontaktdaten. Die Daten werden beim Jekyll-Build über
`jekyll-get-json` als `upcoming_talks` und `trainings` importiert (Quellen in `_config.yml`).
Das lokale Vortragsarchiv in `_data/talks.yaml` bleibt davon unabhängig.
Der Schulungsfeed für Falk ist
https://embarc-termine-json.s3.eu-central-1.amazonaws.com/socreatory-termine/fs_de.json.

Verwendete Feed-Felder: `datum` (inklusive des heutigen Tages), `beschreibung`
(Thema), `titel` (Konferenz/Usergroup), optional `ort` und `url`.
Schulungen verwenden zusätzlich `seminar_name`, `seminar_kuerzel` und
`termin_datum_ende`. Sie sind als „Schulung“ gekennzeichnet, Vorträge als
„Vortrag“. Mehrtägige Schulungen zeigen den Zeitraum und bleiben bis
einschließlich ihres letzten Tages sichtbar.
Der Zeitraum steht zweizeilig mit Bindestrich hinter dem Startdatum.
Rechts kennzeichnet ein Mikrofon Vorträge und ein Schulungsicon Schulungen
und Workshops (im Vortragsfeed am Veranstaltungstitel erkennbar).
Ohne kommende Termine wird der Ticker nicht angezeigt.

Die Terminbox hat eine feste Höhe mit zwei gleich großen Eintragsplätzen.
Sie wird erst nach der Einblendung des Kurzprofils sichtbar; ihr Platz bleibt
währenddessen reserviert, damit sich das Layout nicht verschiebt.
Bei einer ungeraden Anzahl bleibt der zweite Platz auf der letzten Seite leer.
Alle acht Sekunden wechselt der Ticker zur nächsten Gruppe. Pfeilbuttons und
Start/Pause-Symbole rechts neben der Box ermöglichen die manuelle Bedienung; bei Mauszeiger oder Fokus im
Ticker pausiert der Wechsel. Bei reduzierter Bewegung startet er pausiert.
Manuelles Blättern endet an der ersten bzw. letzten Seite; der automatische
Wechsel beginnt nach der letzten Seite wieder vorn.
Ohne JavaScript bleiben alle Termine in einer scrollbar begrenzten Liste lesbar.

## Deployment

GitHub Pages wird mit `.github/workflows/pages.yml` bei Pushes auf `master`
oder manuell per `workflow_dispatch` gebaut und veröffentlicht. In den
Pages-Einstellungen muss als Quelle **GitHub Actions** ausgewählt sein:
Der eingeschränkte Standard-Build unterstützt `jekyll-get-json` nicht.
Der Workflow bricht bei fehlendem oder ungültigem Vortrags- oder Schulungsfeed ab, statt
eine Seite ohne importierte Termindaten zu veröffentlichen.