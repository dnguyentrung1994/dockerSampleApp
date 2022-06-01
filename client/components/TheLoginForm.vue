<template>
  <div
    class="modal-overlay fixed top-0 bottom-0 left-0 right-0 flex content-center bg-[#000000da] z-50 justify-center items-center"
    @click="cancelModal"
  >
    <div
      class="login-form text-center bg-white h-fit w-[50%] rounded-2xl z-[60] min-w-[400px] max-w-[400px]"
    >
      <form action="" @submit.prevent="login">
        <div
          class="login-form-header flex flex-col max-h-[calc(100vh-40px)] overflow-hidden pt-2 pb-4"
        >
          <div
            class="flex flex-row justify-between relative content-center border-b-[1px] min-h-[15%]"
          >
            <span class="text-lg font-semibold pl-[45%]">Login</span>
            <button @click="emitClose" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="login-form-content flex flex-col pb-6">
            <div
              class="flex flex-col content-start justify-start items-start pt-4"
            >
              <span class="text-base pl-9">Username</span>
              <div class="px-4 relative block w-full">
                <span class="absolute inset-y-0 left-4 flex items-center pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  name="username"
                  id="login-username"
                  autocomplete="off"
                  placeholder="Your username"
                  required="required"
                  class="placeholder:italic placeholder:text-slate-400 rounded-sm py-2 pl-9 pr-2 border-2 w-full sm:text-sm"
                  :class="
                    loginMessage.username !== ''
                      ? 'border-red-400 focus:border-red-500 focus:!outline-none'
                      : 'border-black focus:border-blue-600 focus:!outline-none'
                  "
                  v-model="loginData.username"
                />
              </div>
              <Transition name="username-message">
                <span
                  v-show="loginMessage.username !== ''"
                  class="pl-4 text-base text-red-400"
                  >{{ loginMessage.username }}</span
                >
              </Transition>
            </div>

            <div
              class="flex flex-col content-start justify-start items-start pt-4"
            >
              <span class="text-base pl-9">Password</span>
              <div class="px-4 relative block w-full">
                <span class="absolute inset-y-0 left-4 flex items-center pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
                <input
                  :type="passwordType"
                  name="password"
                  id="login-password"
                  autocomplete="off"
                  placeholder="Your password"
                  required="required"
                  class="placeholder:italic placeholder:text-slate-400 rounded-sm py-2 pl-9 pr-2 border-2 w-full sm:text-sm"
                  :class="
                    loginMessage.password !== ''
                      ? 'border-red-400 focus:border-red-500 focus:!outline-none'
                      : 'border-black focus:border-blue-600 !outline-none'
                  "
                  v-model="loginData.password"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-6 flex items-center pl-2"
                  @mousedown="showPassword"
                  @mouseup="hidePassword"
                  tabindex="-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fill-rule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <Transition name="password-message">
                <span
                  v-show="loginMessage.password !== ''"
                  class="pl-4 text-base text-red-400"
                  >{{ loginMessage.password }}</span
                >
              </Transition>
            </div>
          </div>

          <div
            class="login-form-confirm flex flex-row pt-4 border-t justify-end pb-4"
          >
            <button
              class="px-4 mx-4 border-2 rounded border-hidden text-base h-8"
              type="submit"
              :disabled="disableSubmit"
              :class="
                disableSubmit
                  ? ' bg-gray-400 hover:pointer-events-none transition-all'
                  : 'bg-blue-500 hover:bg-blue-400 transition-all'
              "
              @submit.prevent="login"
            >
              Login
            </button>
            <button
              class="px-4 mx-4 border-2 rounded bg-red-600 hover:bg-red-400 border-hidden text-base h-8"
              type="button"
              @click="emitClose"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import oruga from "~~/plugins/oruga";
export default {
  data() {
    return {
      passwordType: "password",
      loginData: {
        username: "",
        password: "",
      },
      loginMessage: {
        username: "Username is required",
        password: "Password is required",
      },
      disableSubmit: true,
    };
  },
  emits: ["closeLoginModal"],
  methods: {
    emitClose() {
      this.$emit("closeLoginModal");
      this.loginData = {
        username: "",
        password: "",
      };
    },
    showPassword() {
      this.passwordType = "text";
    },
    hidePassword() {
      this.passwordType = "password";
    },
    cancelModal(payload) {
      if (payload.target.classList.contains("modal-overlay")) {
        this.emitClose();
      }
    },
    async login() {
      console.log(this.loginData);
      const instance = this.$oruga.notification.open({
        message: "logging in...",
        position: "top",
        variant: "info",
        duration: 2000,
        contentClass: "text-sm p-0",
      });
      let loginResponse = await fetchWithCookie(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          body: { ...this.loginData },
        },
        "refresh_token"
      );

      for (const header of loginResponse.raw.headers) {
        console.log(`Name: ${header[0]}, Value:${header[1]}`);
      }
      await instance.close();
      this.$oruga.notification.open({
        message: loginResponse.data?.message ?? "",
        position: "top",
        variant: loginResponse.status === "OK" ? "success" : "warning",
        duration: 1000,
        contentClass: "text-sm p-0",
      });
    },
  },
  watch: {
    "loginData.username"() {
      if (this.loginData.username === "") {
        this.loginMessage.username = "Username is required";
      } else {
        this.loginMessage.username = "";
      }
    },
    "loginData.password"() {
      if (this.loginData.password === "") {
        this.loginMessage.password = "Password is required";
      } else if (this.loginData.password.length <= 8) {
        this.loginMessage.password =
          "Password must be longer than 8 characters";
      } else {
        this.loginMessage.password = "";
      }
    },

    loginMessage: {
      handler(newMessage) {
        if (newMessage.username === "" && newMessage.password === "") {
          this.disableSubmit = false;
        } else {
          this.disableSubmit = true;
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.username-message-enter-active,
.username-message-leave-active,
.password-message-enter-active,
.password-message-leave-active {
  transition: 0.5s ease-in-out;
}

.username-message-enter-from,
.username-message-leave-to,
.password-message-enter-from,
.password-message-leave-to {
  opacity: 0;
}
</style>
>
