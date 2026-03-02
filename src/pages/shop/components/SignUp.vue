<script setup>
import { userRegister } from "@/api/shop/user.api";
import { useUserStore } from "@/stores/store.user";
import { computed, inject, ref } from "vue";

const user = ref({
  firstName: "",
  lastName: "",
  email: "q@q.q",
  password: "123",
  passwordRepeat: "",
  rules: true,
});

const errors = ref();

const userLoginRegister = inject("userLoginRegister");

const loginError = computed(() => Boolean(errors.value?.login));

const formSubmit = async () => {
  try {
    const userData = {
      login: user.value.email,
      password: user.value.password,
      meta: {
        firstName: user.value.firstName,
        lastName: user.value.lastName,
      },
    };
    const response = await userRegister(userData);

    if (response) {
      const userStore = useUserStore();
      const res = await userStore.login(userData);
      if (res) {
        userLoginRegister.changeInUpModal(false, false);
      }
    }
  } catch (e) {
    const errorsResponse = e?.data?.data?.errors;
    if (errorsResponse) {
      errors.value = { ...errorsResponse };
    }
  }
};
</script>
<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50"
    style="background-color: rgba(91, 91, 91, 0.5)"
    @click.stop="userLoginRegister.registerClose()"
  >
    <div
      class="bg-linear-to-br from-green-300 to-teal-600 min-w-lg rounded-xl"
      @click.stop
    >
      <div class="min-h-full flex items-center justify-center p-10">
        <div class="w-full max-w-md">
          <!-- Logo -->
          <div class="text-center pb-5">
            <a href="/" class="inline-flex items-center gap-2 text-white">
              <svg
                class="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                ></path>
              </svg>
              <span class="text-2xl font-bold">ShopName</span>
            </a>
          </div>

          <!-- Register Card -->
          <div class="bg-white rounded-xl shadow-xl p-8">
            <div class="text-center mb-6">
              <h1 class="text-2xl font-bold text-gray-800">Create Account</h1>
              <p class="text-gray-500 mt-1">Fill in the form to get started</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="form-label">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="John"
                  v-model="user.firstName"
                />
              </div>
              <div class="form-group">
                <label class="form-label">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Doe"
                  v-model="user.lastName"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Email Address</label>
              <div class="relative">
                <span
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    ></path>
                  </svg>
                </span>
                <input
                  type="email"
                  class="form-control pl-10"
                  placeholder="john@example.com"
                  v-model="user.email"
                  :class="{ 'is-invalid': loginError }"
                />
              </div>
              <p class="form-text" v-if="!loginError">
                Please provide a valid value.
              </p>

              <div
                v-if="loginError"
                class="form-text form-text-invalid"
                :class="{ 'd-none': loginError }"
              >
                <div v-for="(error, index) in errors['login']" :key="index">
                  {{ error }}
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Password</label>
              <div class="relative">
                <span
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </span>
                <input
                  type="password"
                  class="form-control pl-10"
                  placeholder="At least 8 characters"
                  v-model="user.password"
                />
              </div>
              <p class="form-text">
                Use 8 or more characters with a mix of letters, numbers &amp;
                symbols
              </p>
            </div>

            <div class="form-group">
              <label class="form-label">Confirm Password</label>
              <div class="relative">
                <span
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </span>
                <input
                  type="password"
                  class="form-control pl-10"
                  placeholder="Confirm your password"
                  v-model="user.passwordRepeat"
                />
              </div>
            </div>

            <div class="form-group">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  v-model="user.rules"
                />
                <label class="form-check-label" for="terms">
                  I agree to the
                  <a href="#" class="text-blue-600 hover:underline"
                    >Terms of Service</a
                  >
                  and
                  <a href="#" class="text-blue-600 hover:underline"
                    >Privacy Policy</a
                  >
                </label>
              </div>
            </div>

            <button
              class="btn btn-success w-full btn-lg mb-4"
              @click="formSubmit"
            >
              Create Account
            </button>

            <div class="border-bottom border-gray-400 my-3"></div>

            <p class="text-center text-gray-600">
              Already have an account?
              <a
                href=""
                class="text-blue-600 hover:underline font-medium"
                @click.prevent.stop="
                  userLoginRegister.changeInUpModal(false, true)
                "
                >Sign in</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
