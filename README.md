# sippsack.github.io

## Vortragsticker auf der Startseite

Der Ticker zeigt zwei kommende Vorträge, chronologisch sortiert, zwischen
Kurzprofil und Kontaktdaten. Die Daten werden beim Jekyll-Build über
`jekyll-get-json` als `upcoming_talks` importiert (Quelle in `_config.yml`).
Das lokale Vortragsarchiv in `_data/talks.yaml` bleibt davon unabhängig.
Schulungen werden aktuell nicht im Ticker angezeigt.

Verwendete Feed-Felder: `datum` (inklusive des heutigen Tages), `beschreibung`
(Thema), `titel` (Konferenz/Usergroup), optional `ort` und `url`.
Ohne kommende Termine wird der Ticker nicht angezeigt.

Die Terminbox hat eine feste Höhe mit zwei gleich großen Eintragsplätzen.
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
Der Workflow bricht bei fehlendem oder ungültigem Vortragsfeed ab, statt
eine Seite ohne importierte Termindaten zu veröffentlichen.