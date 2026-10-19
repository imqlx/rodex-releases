<p align="center">
  <img src="assets/logo.png" width="96" alt="">
</p>

<h1 align="center">Rodex</h1>

<p align="center">The AI copilot for Roblox Studio. Describe what you want, and it scripts, models in Blender, makes shop icons and effects, and playtests in your place.</p>

<p align="center">
  <a href="https://github.com/imqlx/rodex-releases/releases/download/setup/Rodex-Setup.exe"><img src="https://img.shields.io/badge/Download_for_Windows-Rodex--Setup.exe-0165fd?style=for-the-badge&logo=windows11&logoColor=white" alt="Download Rodex for Windows"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/v/release/imqlx/rodex-releases?label=latest&style=flat-square&color=555" alt="Latest version">
  <img src="https://img.shields.io/badge/Windows-10%20%7C%2011-555?style=flat-square" alt="Windows 10 or 11">
  <a href="https://rodexai.dev"><img src="https://img.shields.io/badge/website-rodexai.dev-555?style=flat-square" alt="rodexai.dev"></a>
</p>

---

## Install

1. **[Download Rodex-Setup.exe](https://github.com/imqlx/rodex-releases/releases/download/setup/Rodex-Setup.exe)** (about 100 MB). That's the only file you need.
2. Run it. Windows may say *"Windows protected your PC"*, because Rodex isn't code-signed yet. Click **More info**, then **Run anyway**.
3. Rodex opens by itself. The setup guide installs the Studio plugin and connects your AI (Claude Code, Codex, Cursor or a local model). You start with 300 free credits a month.

By downloading you agree to the [Terms](https://rodexai.dev/terms) and [Privacy Policy](https://rodexai.dev/privacy).

## Updates

You never download Rodex again. When there's a new version, Rodex shows **Update ready**. Click **Restart now** and you're on it. Your chats and settings stay.

To check by hand: **Help → Check for updates**.

## What you need

- Windows 10 or 11
- Roblox Studio
- A Claude, ChatGPT or Cursor plan, or a free local model with Ollama (Rodex walks you through it)

## Plans

Free to start with 300 credits a month. Monthly plans (Starter, Pro, Max) are listed on [rodexai.dev](https://rodexai.dev/#pricing).

## Which file do I download?

Only **Rodex-Setup.exe**, from the button above. The other files on the [Releases](https://github.com/imqlx/rodex-releases/releases) page (`.update`, `latest.json`) are what Rodex downloads by itself when it updates. You can ignore them.

## What's new (current version: 0.2.13)

**0.2.13** · Oct 20, 2026
- Finds Blender and ChatGPT installed from the Microsoft Store, Steam or other folders
- Small fixes

**0.2.12** · Oct 19, 2026
- Fixed Claude Code / Codex install getting stuck on Installing

**0.2.11** · Oct 19, 2026
- Rodex always opens its window, or says why it couldn't start

**0.2.10** · Oct 19, 2026
- Codex chats no longer crash on start
- Stop now stops local models right away
- Cursor chats count toward credits and can be reverted
- Blender imports keep sharp edges and mirrored parts show correctly
- Undo and rollback work more reliably in Studio
- Many smaller fixes across tools, plugin and app

**0.2.9** · Oct 19, 2026
- Fixed updates asking again and again: Rodex now takes the update instead of reinstalling the old version
- An update that can't finish offers the installer instead of another restart
- Settings shows the right version right after updating

**0.2.8** · Oct 18, 2026
- Studio plugin and app now verify each other with a per-install secret (reopen your place in Studio once after updating)
- updates are checked against a full signature that expires
- agents know much more about gameplay systems, models and animation
- safer file and image access from the app
- chats no longer get stuck or go blank on odd tool output
- Ctrl+N reuses an empty chat instead of stacking new ones

[All versions](https://github.com/imqlx/rodex-releases/releases)
