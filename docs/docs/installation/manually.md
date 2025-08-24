---
order: 1
---

# Manually <Badge type="warning" text="not recommended" />

Alternatively, you can run the script by going to a supported page, copying the code in [dist/komodo.user.js], and pasting it into your browser's devtools console. The following pages are supported:

- Route list page (ex. [komoot.com/user/YOUR_USER_ID/routes])
- Route page (ex. [komoot.com/tour/YOUR_ROUTE_ID])

::: details

1. Open [komoot.com/user/YOUR_USER_ID/routes] or [komoot.com/tour/YOUR_ROUTE_ID] in your browser
2. Open your browser's devtools console ([how?])
3. Copy the code in [dist/komodo.user.js] and paste it into the console. If this doesn't work or you see a warning message about pasting, see the [troubleshooting] section
4. Press enter to run the script. You should see the page update. If this doesn't happen, see the [troubleshooting] section

:::

> [!NOTE]
> This only works once. If the page gets reloaded or you navigate away and come back, you will have to run the script again. If you want to run the script automatically, I suggest using a userscript manager instead.

[dist/komodo.user.js]: https://github.com/jerboa88/komodo/blob/main/dist/komodo.user.js
[troubleshooting]: ../troubleshooting/

[komoot.com/user/YOUR_USER_ID/routes]: https://www.komoot.com/user/YOUR_USER_ID/routes
[komoot.com/tour/YOUR_ROUTE_ID]: https://www.komoot.com/tour/YOUR_ROUTE_ID
[how?]: https://balsamiq.com/support/faqs/browserconsole/
