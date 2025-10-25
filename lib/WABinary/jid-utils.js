'use strict';

/* ---------- constant ---------- */
const S_WHATSAPP_NET       = '@s.whatsapp.net';
const OFFICIAL_BIZ_JID     = '16505361212@c.us';
const SERVER_JID           = 'server@c.us';
const PSA_WID              = '0@c.us';
const STORIES_JID          = 'status@broadcast';
const META_AI_JID          = 'ai@g.us';          // contoh, sesuaikan jika berbeda

/* ---------- encode / decode ---------- */
const jidEncode = (user = '', server, device, agent) => {
  const agentPart = agent ? `_${agent}` : '';
  const devicePart = device ? `:${device}` : '';
  return `${user}${agentPart}${devicePart}@${server}`;
};

const jidDecode = (jid) => {
  if (typeof jid !== 'string') return undefined;
  const at = jid.indexOf('@');
  if (at < 0) return undefined;

  const server = jid.slice(at + 1);
  const userChunk = jid.slice(0, at);
  const [userAgent, device] = userChunk.split(':');
  const [user] = userAgent.split('_');

  return {
    server,
    user,
    domainType: server === 'lid' ? 1 : 0,
    device: device ? +device : undefined
  };
};

/* ---------- helpers ---------- */
const areJidsSameUser = (jid1, jid2) => {
  const a = jidDecode(jid1);
  const b = jidDecode(jid2);
  return a && b && a.user === b.user;
};

const isJidUser           = (jid) => jid?.endsWith('@s.whatsapp.net');
const isLidUser           = (jid) => jid?.endsWith('@lid');
const isJidBroadcast      = (jid) => jid?.endsWith('@broadcast');
const isJidGroup          = (jid) => jid?.endsWith('@g.us');
const isJidStatusBroadcast= (jid) => jid === STORIES_JID;
const isJidNewsletter     = (jid) => jid?.endsWith('newsletter');
const isJidBot            = (jid) => jid === SERVER_JID;
const isJidMetaAI         = (jid) => jid === META_AI_JID;

const jidNormalizedUser = (jid) => {
  const decoded = jidDecode(jid);
  if (!decoded) return '';
  const { user, server } = decoded;
  return jidEncode(user, server === 'c.us' ? 's.whatsapp.net' : server);
};

/* contoh implementasi transferDevice (opsional) */
const transferDevice = (jid, newDevice) => {
  const d = jidDecode(jid);
  if (!d) return jid;
  return jidEncode(d.user, d.server, newDevice);
};

/* ---------- common-js export ---------- */
module.exports = {
  S_WHATSAPP_NET,
  OFFICIAL_BIZ_JID,
  SERVER_JID,
  PSA_WID,
  STORIES_JID,
  META_AI_JID,
  jidEncode,
  jidDecode,
  areJidsSameUser,
  isJidMetaAI,
  isJidUser,
  isLidUser,
  isJidBroadcast,
  isJidGroup,
  isJidStatusBroadcast,
  isJidNewsletter,
  isJidBot,
  transferDevice,
  jidNormalizedUser
};