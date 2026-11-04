*Last updated 4 November 2026.*

Cadence is an iPhone app that shows your training from [intervals.icu](https://intervals.icu). This page explains what happens to your data when you use it.

## The short version

Your training data goes straight between your iPhone and intervals.icu, and to nobody else. There is no Cadence server, account or tracking. If something goes wrong, Cadence can send a small error report, which you can turn off.

## What Cadence reads and writes

- **Your intervals.icu data.** Cadence reads your activities, calendar, plans, workouts, wellness, gear and settings from intervals.icu. It writes back to intervals.icu only when you ask it to, for example when you add or move a calendar entry, rate how a session felt, or mark an activity as a race.
- **Your sign-in.** Your intervals.icu API key, or the token from signing in with intervals.icu, is kept in the iOS Keychain on your iPhone. It is sent only to intervals.icu, to identify you.
- **A copy on your iPhone.** To open quickly and to feed the widgets, Cadence keeps recent data on your iPhone, inside the app and its widgets' shared storage. Signing out removes your sign-in and this copy.
- **A diagnostics log.** Cadence keeps a diagnostics log on your device for seven days. It holds no keys, tokens, email addresses, or activity names or notes, and it leaves your device only if you share it from Support › Share diagnostics, or send it with a feedback mail. Signing out leaves it, so it can show what happened if you were signed out unexpectedly.
- **Error reports.** When Cadence can't read a response from intervals.icu, it sends a report to TelemetryDeck: which request and field failed, why, and the app build. A report holds no training data, name, email or key. Each launch uses a new random ID, kept only in memory, so reports from different launches can't be tied together, or to you. This is on by default; you can turn it off in Profile › Settings › Share error reports.

## What Cadence does not do

- It does not collect usage statistics.
- It does not use advertising or tracking, and it does not sell or share your data.
- It does not send your data to any server of its own. There is none.

## Other services involved

- **intervals.icu** stores your training data. Its own [privacy policy](https://www.intervals.icu/privacy-policy/) and terms apply to it. Cadence is an independent app and is not made by intervals.icu.
- **wavio.co**, the developer's site. Cadence checks a small status file there to learn whether the app is paused or needs an update. That request carries no account data. Like any website, the site's host (GitHub Pages) sees your IP address and the time of the request.
- **TelemetryDeck** receives the error reports described above. Like any web request, a report reaches its servers from your IP address. Its own [privacy policy](https://telemetrydeck.com/privacy/) applies to it.
- **Apple Maps** draws the maps for activities and race courses. To do that, your iPhone loads map tiles from Apple. Cadence does not send Apple your activities. If you choose Open in Maps, the place you opened, such as a race venue, is handed to Apple Maps.
- **Apple** may share crash reports with the developer if you agreed to that in your iPhone's settings or in TestFlight. Apple handles these under its own privacy policy.
- **Email.** If you choose Send feedback, your mail app opens a draft to the developer. The draft includes the app version, iOS version and iPhone model, with this week's diagnostics log attached. You can edit the draft or remove the log before sending.

## How long data is kept

Your training data stays on intervals.icu, which is where it lives. The copy on your iPhone is removed when you sign out or delete the app. The diagnostics log keeps seven days and is removed when you delete the app. Error reports stay with TelemetryDeck and may be kept for years; they can't be traced to you, so they can't be deleted one by one. Emails you send are kept only as long as they are needed to answer you, and you can ask for them to be deleted.

## Your choices

- **Turn off error reports** in Profile › Settings › Share error reports.
- **Sign out** in Profile. This removes your sign-in and the copy on your iPhone.
- **Stop Cadence's access completely** by changing or deleting your API key on intervals.icu (Settings › Developer Settings), or by removing the app's access if you signed in with intervals.icu.

## Contact

Questions about this policy: cadence@wavio.co

## Changes

If this policy changes, this page will show the new version and its date.
