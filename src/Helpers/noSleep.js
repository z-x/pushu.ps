/*
	Keeps the screen on during the training, with the Wake Lock API or, in the
	browsers without it, with a tiny looped video (see noSleepVideo.js)

	Usage:	let noSleep = new NoSleep();
			noSleep.enable();
			noSleep.disable();
*/



// imports
// ------------------------------------------------------------------------
import handleError from './handleError.js';



// Detect native Wake Lock API support
const nativeWakeLock = "wakeLock" in navigator;

class NoSleep {
  constructor() {
    // if the screen should be kept on
    this._enabled = false;

    if (nativeWakeLock) {
      this._wakeLock = null;
      // if the wake lock should be held, it is released by the browser when
      // the page is hidden, so it needs to be requested again
      const handleVisibilityChange = () => {
        if (this._enabled && document.visibilityState === "visible") {
          this.enable();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      document.addEventListener("fullscreenchange", handleVisibilityChange);
    } else {
      // the video fallback holds the videos (about 8 KB), so it is loaded
      // only in the browsers that need it, right away, so it is ready
      // when the user clicks for the first time
      this._video = import("./noSleepVideo.js")
        .then(({ default: NoSleepVideo }) => new NoSleepVideo())
        .catch((error) => {
          handleError("The screen could not be kept on", false, error);
        });
    }
  }

  // returns a promise with the info if the screen is kept on, false when the
  // browser allows it only after a user action, like a click (bool)
  enable() {
    this._enabled = true;

    if (nativeWakeLock) {
      return navigator.wakeLock
        .request("screen")
        .then((wakeLock) => {
          // disabled before the request finished
          if (!this._enabled) {
            wakeLock.release();
            return true;
          }
          // a lock requested again replaces the previous one
          this._wakeLock?.release();
          this._wakeLock = wakeLock;
          console.log("Wake Lock active.");
          this._wakeLock.addEventListener("release", () => {
            // ToDo: Potentially emit an event for the page to observe since
            // Wake Lock releases happen when page visibility changes.
            // (https://web.dev/wakelock/#wake-lock-lifecycle)
            console.log("Wake Lock released.");
          });
          return true;
        })
        .catch((err) => {
          console.error(`${err.name}, ${err.message}`);
          return false;
        });
    } else {
      // disabled before the video fallback finished loading
      return this._video.then((video) => {
        if (!video) {
          return false;
        }
        return this._enabled ? video.enable() : true;
      });
    }
  }

  disable() {
    this._enabled = false;

    if (nativeWakeLock) {
      // the wake lock is missing when the request failed or is not finished yet
      this._wakeLock?.release();
      this._wakeLock = null;
    } else {
      this._video.then((video) => video?.disable());
    }
  }
}

export default NoSleep;
