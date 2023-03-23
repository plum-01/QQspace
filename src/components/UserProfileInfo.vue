<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <img class="img-fluid" :src="user.photo" alt="">
                </div>
                <div class="col-9">
                    <div>{{ user.username }}</div>
                    <div>粉丝：{{ user.followerCount }}</div>
                    <!-- v-if:根据表达式的真假，切换元素的显示和隐藏 -->
                    <button @click="follow" v-if="!user.is_followed && !is_me" type="button" class="btn btn-secondary btn-sm">+ 关注</button>
                    <button @click="unfollow" v-if="user.is_followed && !is_me" type="button" class="btn btn-primary btn-sm">取消关注</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import { useStore } from 'vuex';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    export default {
        name: 'UserProfileInfo',
        props: {
            user: {
                type: Object,
                required: true,
            },
        },
        setup: (props, context) => {
            const store = useStore();
            const route = useRoute();
            const userId = parseInt(route.params.userId)
            const follow = () => {
                $.ajax({
                    url: 'https://app165.acapp.acwing.com.cn/myspace/follow/',
                    type: "POST",
                    data: {
                        target_id: props.user.id
                    },
                    headers: {
                        'Authorization': "Bearer " + store.state.user.access,
                    },
                    success(res) {
                        if (res.result === 'success') {
                            context.emit("follow");
                        }
                    }
                })
            }
            const unfollow = () => {
                $.ajax({
                    url: 'https://app165.acapp.acwing.com.cn/myspace/follow/',
                    type: "POST",
                    data: {
                        target_id: props.user.id
                    },
                    headers: {
                        'Authorization': "Bearer " + store.state.user.access,
                    },
                    success(res) {
                        if (res.result === 'success') {
                            context.emit("unfollow");
                        }
                    }
                })
            }
            const is_me = computed(() => userId === store.state.user.id)
            return {
                follow,
                unfollow,
                userId,
                is_me
            }
        }
    }
</script>

<style scoped>
    img {
        border-radius: 50%;
    }
</style>