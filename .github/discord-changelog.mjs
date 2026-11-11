// Posts a published release to Discord's #changelog as an embed.
// Runs in the releases repo (.github/discord-changelog.mjs, started by
// .github/workflows/discord.yml on "release: published"); release.js copies
// both files there. Plain Node 20, no dependencies.
//
// Env: TAG (v1.2.3), DISCORD_WEBHOOK (secret), GITHUB_REPOSITORY, GH_TOKEN,
// optional DISCORD_PING_ROLE (role id to mention, e.g. Updates), DRY_RUN=1
// prints the payload instead of sending it.

const repo = process.env.GITHUB_REPOSITORY || 'imqlx/rodex-releases';
const tag = process.env.TAG || '';
const dry = process.env.DRY_RUN === '1';
const hook = process.env.DISCORD_WEBHOOK || '';
const pingRole = /^\d{17,20}$/.test(process.env.DISCORD_PING_ROLE || '') ? process.env.DISCORD_PING_ROLE : '';

const BLUE = 0x0165fd;
const LOGO = 'https://rodexai.dev/img/logo-tile.png';
const SITE = 'https://rodexai.dev';

// Same split as scripts/release-pages.js: notes are short items joined by "; ".
const bullets = (note) => String(note || '').split(/\r?\n|;\s+/).map((s) => s.trim().replace(/^[-*]\s*/, '')).filter(Boolean);

async function gh(path) {
  const r = await fetch(`https://api.github.com${path}`, {
    headers: { accept: 'application/vnd.github+json', ...(process.env.GH_TOKEN ? { authorization: `Bearer ${process.env.GH_TOKEN}` } : {}) },
  });
  if (!r.ok) throw new Error(`GitHub ${path}: ${r.status}`);
  return r.json();
}

function buildMessage(rel, m) {
  const version = m.version;
  const forced = m.minVersion && m.minVersion === version;
  let list = bullets(m.note).map((l) => `- ${l}`).join('\n') || '- Small fixes and improvements.';
  if (list.length > 3800) list = `${list.slice(0, 3800).replace(/\n[^\n]*$/, '')}\n- More on GitHub.`;
  const embed = {
    color: BLUE,
    author: { name: 'Rodex', icon_url: LOGO, url: SITE },
    title: `Rodex ${version}`,
    url: rel.html_url,
    description: `**What's new**\n${list}`,
    fields: [
      { name: 'Version', value: version, inline: true },
      { name: 'Update', value: forced ? 'Required, installs on next start' : 'Installs by itself', inline: true },
      { name: 'New here?', value: `[Download Rodex](${SITE}/download)`, inline: true },
    ],
    footer: { text: 'Rodex updates itself. Help > Check for updates gets it right away.', icon_url: LOGO },
    timestamp: rel.published_at || new Date().toISOString(),
  };
  return {
    username: 'Rodex',
    avatar_url: LOGO,
    content: pingRole ? `<@&${pingRole}>` : '',
    embeds: [embed],
    allowed_mentions: { parse: [], roles: pingRole ? [pingRole] : [] },
  };
}

async function main() {
  if (!/^v\d+\.\d+\.\d+/.test(tag)) return console.log(`skip: ${tag || '(no tag)'} is not a version release`);
  const rel = await gh(`/repos/${repo}/releases/tags/${tag}`);
  if (rel.draft || rel.prerelease) return console.log(`skip: ${tag} is a draft or prerelease`);
  const asset = (rel.assets || []).find((a) => a.name === 'latest.json');
  if (!asset) return console.log(`skip: ${tag} has no latest.json`);
  const m = await (await fetch(asset.browser_download_url)).json();
  const version = tag.replace(/^v/, '');
  const own = (m.notes || []).find((n) => n.version === version);
  // Silent releases (security fixes) stay quiet everywhere, Discord included.
  if ((own && own.silent) || m.silentMin === version) return console.log(`skip: ${tag} is a silent release`);
  const body = buildMessage(rel, { ...m, version, note: own ? own.note : m.note });
  if (dry) return console.log(JSON.stringify(body, null, 2));
  if (!hook) return console.log('skip: no DISCORD_WEBHOOK secret');
  if (!/^https:\/\/(discord|discordapp)\.com\/api\/webhooks\//.test(hook)) throw new Error('DISCORD_WEBHOOK is not a Discord webhook URL');
  for (let i = 0; i < 3; i++) {
    const r = await fetch(`${hook}?wait=true`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    if (r.ok) return console.log(`posted ${tag} to Discord`);
    if (r.status !== 429 && r.status < 500) throw new Error(`Discord answered ${r.status}: ${(await r.text()).slice(0, 200)}`);
    await new Promise((res) => setTimeout(res, 2000 * (i + 1)));
  }
  throw new Error('Discord kept failing');
}

main().catch((e) => { console.error(e.message); process.exit(1); });
