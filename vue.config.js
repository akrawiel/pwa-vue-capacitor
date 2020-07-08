module.exports = {
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/firebase-messaging-sw.js"
    },
    manifestOptions: {
      gcm_sender_id: "351635515653"
    }
  }
};
