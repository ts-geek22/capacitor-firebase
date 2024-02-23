import { Browser } from "@capacitor/browser";
import { SplashScreen } from "@capacitor/splash-screen";
import { FirebaseService } from "./firebase/helpers";

window.customElements.define(
  "capacitor-welcome",
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `
    <main>
      <h1>Capacitor App</h1>
      <p>
        This project is used to create a minimal, reproducible example. Just add
        the affected Capacitor platforms and plugins.
      </p>
      <label for="myInput">Website:</label>
      <input
        type="text"
        id="myInput"
        name="myInput"
        value="https://capacitorjs.com/"
      />
      <button id="open-browser">Open Browser</button>

      <p>
        <button class="button" id="google-signup">Google Signup</button>
      </p>

      <p id="user"></p>
    </main>
    `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot
        .querySelector("#open-browser")
        .addEventListener("click", async function (event) {
          const input = self.shadowRoot.getElementById("myInput").value;
          if (!input) {
            return;
          }
          await Browser.open({ url: input });
        });

      self.shadowRoot
        .querySelector("#google-signup")
        .addEventListener("click", async function (e) {
          try {
            const firebaseService = FirebaseService.getInstance();

            const user = await firebaseService.signInWithGoogle();

            self.shadowRoot.querySelector("#user").innerHTML = !user
              ? "Failed to register"
              : JSON.stringify(user);
          } catch (e) {
            console.warn("User cancelled", e);
          }
        });
    }
  }
);
