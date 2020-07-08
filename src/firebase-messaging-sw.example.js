importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js"
);

const firebaseConfig = {
  /* config from Firebase comes in here */
};

firebase.initializeApp(firebaseConfig);

const messagingInstance = firebase.messaging();

// PWA data background notification handler
messagingInstance.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload
  );

  const notificationTitle = "Boaster";
  const notificationOptions = {
    body: "New notification!"
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

