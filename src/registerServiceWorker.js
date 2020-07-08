/* eslint-disable no-console */

import { register } from "register-service-worker";
import { Plugins } from "@capacitor/core";

if (process.env.NODE_ENV === "production") {
  Plugins.Device.getInfo().then(({ platform }) => {
    if (platform === "web") {
      register(`${process.env.BASE_URL}firebase-messaging-sw.js`, {
        ready() {
          console.log("Firebase messaging ready");
        },
        registered() {
          console.log("Firebase messaging registered");
        },
        error(error) {
          console.error("Error during Firebase messaging registration:", error);
        }
      });
    }
  });
}
