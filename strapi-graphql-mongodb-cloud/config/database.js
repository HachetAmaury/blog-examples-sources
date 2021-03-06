module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        uri: env("MONGODB_URL"),
      },
      options: {
        ssl: true,
      },
    },
  },
});
