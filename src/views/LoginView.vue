<template>
    <ConTent>
      <div class="login">登录页面</div>
      <div class="row justify-content-md-center">
        <div class="col-3">
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="username" class="form-label">用户名</label>
              <input v-model="username" type="username" class="form-control" id="username">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">密码</label>
              <input v-model="password" type="password" class="form-control" id="password">
            </div>
            <div class="error-message">{{error_message}}</div>
            <button type="submit" class="btn btn-primary">登录</button>
          </form>
        </div>
      </div>
    </ConTent>
  </template>

  <script>
  import ConTent from '@/components/ConTent.vue';
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import router from '@/router/index';

  export default {
    name: 'LoginView',
    components: {
      ConTent,
    },
    setup() {
      const username = ref("");
      const password = ref("");
      const error_message = ref("");
      const store = useStore()

      const login = () => {
        error_message.value = ""; 
        store.dispatch("login", {
          username: username.value,
          password: password.value,
          success() {
            // 登陆成功跳转到 userlist 页面
            router.push({name: 'userlist'});
          },
          error() {
            error_message.value = "用户名或密码错误";
          }
        });
      }
      
      return {
        username,
        password,
        error_message,
        login,
      }
    }
  }
  </script>
  
  <style scoped>
    .login {
      text-align: center;
      margin-bottom: 20px;
    } 

    button {
      width: 100%;
    }

    .error-message {
      color: red;
      font-size: 14px;
    }
  </style>