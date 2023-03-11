<template>
    <ConTent>
      <div class="login">登录页面</div>
      <div class="row justify-content-md-center">
        <div class="col-3">
          <form>
            <div class="mb-3">
              <label for="username" class="form-label">用户名</label>
              <input v-model="username" type="email" class="form-control" id="username">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">密码</label>
              <input v-model="password" type="password" class="form-control" id="password">
            </div>
            <button type="submit" class="btn btn-primary">登录</button>
          </form>
        </div>
      </div>
    </ConTent>
  </template>

  <script>
  import ConTent from '@/components/ConTent.vue';
  import { ref } from 'vue';

  export default {
    name: 'LoginView',
    components: {
      ConTent,
    },
    setup() {
      const username = ref("");
      const password = ref("");
      
      return {
        username,
        password,
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
  </style>