<template>
  <ConTent>
    <div class="regist">注册页面</div>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <form @submit.prevent="regist">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" type="username" class="form-control" id="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password">
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">确认密码</label>
            <input v-model="password_confirm" type="password" class="form-control" id="password_confirm">
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
import router from '@/router';
import $ from 'jquery';

export default {
  name: 'RegistView',
  components: {
    ConTent,
  },
  setup() {
    const username = ref("");
    const password = ref("");
    const password_confirm = ref("");
    const error_message = ref("");
    const store = useStore()

    const regist = () => {
      error_message.value = ""; 
      console.log(username.value, password.value, password_confirm.value);
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/user/',
        type: 'POST',
        data: {
          username: username.value,
          password: password.value,
          password_confirm: password_confirm.value
        },
        success(res) {
          console.log(res)
          if (res.result === 'success') {
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
          else {
            error_message.value = res.result;
          }
        }
      })
    }
    
    return {
      username,
      password,
      password_confirm,
      error_message,
      regist,
    }
  }
}
</script>

<style scoped>
  .regist {
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