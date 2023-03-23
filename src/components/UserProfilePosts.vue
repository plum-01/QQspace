<template>
    <div class="card">
        <div class="card-body">
            <!-- v-for: 循环，循环post对象的posts数组，将数组的每一项赋给post -->
            <div v-for="post in post.posts" :key="post.id">
                <div class="card single-post">
                    <div class="card-body">
                        {{ post.content }}
                        <button
                             v-if="is_me"
                            type="button"
                            class="btn btn-danger btn-sm"
                            style="float: right"
                            @click="delete_a_post(post.id)">删除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';

    export default {
        name: 'UserProfilePosts',
        props: {
            post: {
                type: Object,
                required: true,
            },
        },
        setup(props, context) {
            const store = useStore();
            const route = useRoute()
            const userId = parseInt(route.params.userId)
            let is_me = computed(() => userId === store.state.user.id);

            const delete_a_post = post_id => {
                $.ajax({
                    url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
                    type: 'DELETE',
                    data: {
                        post_id
                    },
                    headers: {
                        'Authorization': "Bearer " + store.state.user.access,
                    },
                    success(res) {
                        if (res.result === "success")
                            context.emit('delete_a_post', post_id)
                    }
                })
            }

            return {
                is_me,
                delete_a_post
            }
        }
    }
</script>

<style scoped>
    .single-post {
        margin-bottom: 10px;
    }
</style>