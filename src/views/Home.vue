<template>
  <div class="home">
    <img v-if="photoSrc" class="img" :src="photoSrc" />
    <img v-else class="img" alt="Vue logo" src="../assets/logo.png" />
    <button @click="getCameraPicture">Take picture</button>
    <hr />
    <div>
      <b>Position: </b>
      <span>{{ positionString }}</span>
    </div>
    <button @click="getCurrentLocation">Get location</button>
    <button @click="pushNotifications">Push notifications request</button>
  </div>
</template>

<style scoped>
.home {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.img {
  height: 25vh;
  max-height: 25vh;
  object-fit: contain;
}
</style>

<script>
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import firebase from "firebase/app";
import "firebase/messaging";

import { firebaseConfig, vapidKey } from "../firebase.config";

export default {
  name: "Home",

  data() {
    return {
      photoSrc: null,
      positionString: "N/A",
      platform: null
    };
  },

  async mounted() {
    const { platform } = await Plugins.Device.getInfo();

    this.platform = platform;

    if (["ios", "android"].includes(platform)) {
      Plugins.PushNotifications.addListener("registration", token => {
        console.info("Token:", token.value);
      });

      Plugins.PushNotifications.addListener(
        "pushNotificationReceived",
        notification => {
          alert("Notification received: " + JSON.stringify(notification));
        }
      );
    } else {
      firebase.initializeApp(firebaseConfig);

      const messagingInstance = firebase.messaging();

      messagingInstance.usePublicVapidKey(vapidKey);

      messagingInstance.requestPermission();

      messagingInstance.onMessage(payload => {
        console.log("Message received. ", payload);
      });
    }
  },

  methods: {
    async getCameraPicture() {
      const photo = await Plugins.Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100
      });

      this.photoSrc = photo.dataUrl;
    },

    async getCurrentLocation() {
      const position = await Plugins.Geolocation.getCurrentPosition();

      this.positionString = `${position.coords.longitude} ${position.coords.latitude}`;
    },

    async pushNotifications() {
      const messagingInstance =
        this.platform === "web"
          ? firebase.messaging()
          : Plugins.PushNotifications;

      messagingInstance
        .requestPermission()
        .then(result => {
          if (this.platform === "web") {
            messagingInstance.getToken().then(token => {
              console.log("Token:", token);
            });
          } else {
            if (result?.granted) {
              Plugins.PushNotifications.register();
            }
          }
        })
        .catch(err => {
          console.log("Unable to get permission to notify.", err);
        });
    }
  }
};
</script>
