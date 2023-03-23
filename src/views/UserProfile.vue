<template>
    <ConTent>
      <div class="row">
        <div class="col-3">
          <!-- v-bind:绑定属性，v-on || @：绑定事件 -->
          <UserProfileInfo @follow="follow" @unfollow="unfollow" v-bind:user="user" />
          <UserProfileWrite v-if="is_me" @post_a_post="post_a_post" />
        </div>
        <div class="col-9">
          <UserProfilePosts v-bind:post="post" @delete_a_post="delete_a_post" />
        </div>
      </div>
    </ConTent>
  </template>
  
  <script>
  import ConTent from '@/components/ConTent.vue';
  import UserProfileInfo from '@/components/UserProfileInfo.vue';
  import UserProfilePosts from '../components/UserProfilePosts.vue'
  import UserProfileWrite from '@/components/UserProfileWrite.vue';
  import { reactive } from 'vue';
  import { useRoute } from 'vue-router'
  import $ from 'jquery'
  import { useStore } from 'vuex';
  import { computed } from 'vue';

  export default {
    name: 'UserProfile',
    components: {
      ConTent,
      UserProfileInfo,
      UserProfilePosts,
      UserProfileWrite,
    },
    setup: () => {
      const route = useRoute();
      const userId = parseInt(route.params.userId);
      const store = useStore();
      // 定义变量：ref：变量可重新赋值，接收各种类型；reactive：不可改变，接收对象
      const user = reactive({});
      const post = reactive({});

      /**获取用户信息 */
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
        type: 'GET',
        data: {
          user_id: userId,
        },
        headers: {
          'Authorization': "Bearer " + store.state.user.access,
        },
        success(res) {
          user.id = res.id,
          user.username = res.username,
          user.photo = res.photo,
          user.followerCount = res.followerCount,
          user.is_followed = res.is_followed
        }
      })

      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
        type: 'GET',
        data: {
          user_id: userId,
        },
        headers: {
          'Authorization': "Bearer " + store.state.user.access,
        },
        success(res) {
          post.count = res.length,
          post.posts = res;
        }
      })

      const follow = () => {
        if (user.is_followed) return;
        else (
          user.followerCount ++,
          user.is_followed = true
        )
      };

      const unfollow = () => {
        if (!user.is_followed) return;
        else (
          user.followerCount --,
          user.is_followed = false
        )
      };

      const post_a_post = (content) => {
        if (content.replace(/[ ]|[\r\n]/g,"").length == 0) alert('不能为空！')
        else {
          post.count ++;
          post.posts.unshift({
          id: post.count,
          userid: 1,
          content: content,
        })
        }
      };

      const delete_a_post = post_id => {
        post.posts = post.posts.filter(post => post.id !== post_id)
        post.count = post.posts.length
      };

      let is_me = computed(() => userId === store.state.user.id)

      return {
        user,
        post,
        userId,
        follow,
        unfollow,
        post_a_post,
        delete_a_post,
        is_me
      }
    }
  }
  </script>
  
  <style scoped>  
  </style>