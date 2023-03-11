<template>
    <ConTent>
      <div class="row">
        <div class="col-3">
          <!-- v-bind:绑定属性，v-on || @：绑定事件 -->
          <UserProfileInfo @follow="follow" @unfollow="unfollow" v-bind:user="user" />
          <UserProfileWrite @post_a_post="post_a_post" />
        </div>
        <div class="col-9">
          <UserProfilePosts v-bind:post="post" />
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
      const userId = route.params.userId
      console.log(route.params.userId)

      // 定义变量：ref：变量可重新赋值，接收各种类型；reactive：不可改变，接收对象
      const user = reactive({
        id: 1,
        username: 'Plum Li',
        firstname: 'Plum',
        lastname: 'Li',
        fans: 123,
        is_followed: true,
      });

      const post = reactive({
        count: 3,
        posts: [
          {
            id: 1,
            userid: 1,
            content: "哈哈哈哈哈"
          },
          {
            id: 2,
            userid: 1,
            content: "啦啦啦啦啦",
          },
          {
            id: 2,
            userid: 1,
            content: "O(∩_∩)O哈哈~",
          }
        ]
      });

      const follow = () => {
        if (user.is_followed) return;
        else (
          user.fans ++,
          user.is_followed = true
        )
      };

      const unfollow = () => {
        if (!user.is_followed) return;
        else (
          user.fans --,
          user.is_followed = false
        )
      }

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

      return {
        user,
        post,
        userId,
        follow,
        unfollow,
        post_a_post
      }
    }
  }
  </script>
  
  <style scoped>  
  </style>