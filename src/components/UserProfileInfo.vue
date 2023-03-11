<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <img class="img-fluid" src="https://cdn.acwing.com/media/user/profile/photo/198836_lg_c20c813cde.jpg" alt="">
                </div>
                <div class="col-9">
                    <div>{{ fullName }}</div>
                    <div>粉丝：{{ user.fans }}</div>
                    <!-- v-if:根据表达式的真假，切换元素的显示和隐藏 -->
                    <button @click="follow" v-if="!user.is_followed" type="button" class="btn btn-secondary btn-sm">+ 关注</button>
                    <button @click="unfollow" v-if="user.is_followed" type="button" class="btn btn-primary btn-sm">取消关注</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity';

    export default {
        name: 'UserProfileInfo',
        props: {
            user: {
                type: Object,
                required: true,
            },
        },
        setup: (props, context) => {
            const follow = () => {
                context.emit("follow");
            }
            const unfollow = () => {
                context.emit("unfollow");
            }

            let fullName = computed(() => props.user.lastname + ' ' + props.user.firstname);
            return {
                fullName,
                follow,
                unfollow,
            }
        }
    }
</script>

<style scoped></style>