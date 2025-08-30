---
order: 1
---

# Manually <Badge type="warning" text="not recommended" />

> [!WARNING]
> Although it may be possible to run the script this way, I don't recommend it for the following reasons:
>
> - **No persistence**: You need to paste and run the script each time. If the page gets reloaded or you navigate away and come back, you will have to run it again
> - **No updates**: The script will not be able to update itself
> - **No userscript APIs**: Userscript APIs (ex. cross-domain requests, storage, etc.) are not available in the console. If these APIs are used in the future, the script likely won't work properly when run this way
> - **Security safeguards**: The devtools console is intended for debugging websites, and most [browsers prevent scripts from running] in the console for security reasons

You can also run the script by going to [a supported page], copying the code in [dist/komodo.user.js], and pasting it into your browser's devtools console.

::: details

1. Open [a supported page] in your browser
2. Open your browser's devtools console ([how?])
3. Copy the code in [dist/komodo.user.js] and paste it into the console. If this doesn't work or you see a warning message about pasting, see the [troubleshooting] section
4. Press enter to run the script. You should see the page update. If this doesn't happen, see the [troubleshooting] section

:::

[dist/komodo.user.js]: https://github.com/jerboa88/komodo/blob/main/dist/komodo.user.js

[troubleshooting]: ../troubleshooting/
[a supported page]: ../usage/#supported-pages
[browsers prevent scripts from running]: ../troubleshooting/paste-protection

[how?]: https://balsamiq.com/support/faqs/browserconsole/
