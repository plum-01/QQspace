<template>
    <ConTent>
      好友列表
      <div class="card" v-for="user in users" :key="user.id" @click="open_user_profile(user.id)">
        <div class="card-body">
          <div class="row">
            <div class="col-1">
              <!-- scr前加冒号（即v-bind:, user.photo就不是字符串而是变量名 -->
              <img class="img-fluid" :src="user.photo" alt="">
            </div>
            <div class="col-11">
              <div class="username">{{ user.username }}</div>
              <div class="follower-count">{{ user.followerCount }}</div>
            </div>
          </div>
        </div>
      </div>
    </ConTent>
  </template>
  
  <script>
  import ConTent from '@/components/ConTent.vue';
  import $ from 'jquery';
  import { ref } from 'vue';
  import router from '@/router';
  import { useStore } from 'vuex';

  export default {
    name: 'UserList',
    components: {
      ConTent,
    },

    setup() {
      const store = useStore();
      let users = ref([]);
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',
        type: "get",
        // success: ajax请求完成时运行该函数，res是请求到的数据
        success(res) {
          users.value = res;
        }
      })
      const open_user_profile = userId => {
        if (store.state.user.is_login) {
          router.push({
            name: 'userprofile',
            params: {
              userId
            }
          })
        }
        else {
          router.push({
            name: 'login'
          })
        }
      }

      return {
        users,
        open_user_profile
      }
    },
  }
  </script>
  
  <style scoped> 
    img {
      border-radius: 50%;
    }
    
    .username {
      font-weight: bold;
      height: 50%;
    }

    .follower-count {
      font-size: 12px;
      color: grey;
      height: 50%;
    }

    .card {
      margin-bottom: 20px;
      cursor: pointer;
    }

    .card:hover {
      box-shadow: 2px 2px 10px lightgray;
      transition: 500ms;
    }
  </style>