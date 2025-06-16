// src/providers/oauth2/discord.ts
var authorization_server = {
  issuer: "https://discord.com",
  authorization_endpoint: "https://discord.com/api/oauth2/authorize",
  token_endpoint: "https://discord.com/api/oauth2/token",
  userinfo_endpoint: "https://discord.com/api/users/@me"
};
function DiscordAuthProvider(config) {
  return {
    ...config,
    id: "discord",
    scope: "identify email",
    authorization_server,
    name: "Discord",
    algorithm: "oauth2",
    kind: "oauth",
    profile: (profile) => {
      const format = profile.avatar.toString().startsWith("a_") ? "gif" : "png";
      return {
        sub: profile.id,
        name: profile.username ?? profile.global_name,
        email: profile.email,
        picture: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
      };
    }
  };
}
var discord_default = DiscordAuthProvider;
export {
  discord_default as default
};
