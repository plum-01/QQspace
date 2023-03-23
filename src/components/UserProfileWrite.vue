<template>
    <div class="card edit-area">
        <div class="card-body">
            <div class="mb-3">
                <label for="edit-post" class="form-label">编辑帖子</label>
                <textarea v-model="content" class="form-control" id="edit-post" rows="3"></textarea>
                <button @click="post_a_post" type="button" class="btn btn-primary btn-sm">发帖</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue';
    import $ from 'jquery';
    import { useStore } from 'vuex';

    export default {
        name: 'UserProfileWrite',
        setup: (props, context) => {
            let content = ref('');
            const store = useStore();
            const post_a_post = () => {
                $.ajax({
                    url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
                    type: 'POST',
                    data: {
                        content: content.value,
                    },
                    headers: {
                        'Authorization': "Bearer " + store.state.user.access,
                     },
                     success(res) {
                        if(res.result === 'success') {
                            context.emit('post_a_post', content.value)
                            content.value = "";
                        }
                     }
                })
            }
            
            return {
                content,
                post_a_post,
            }
        }
    }
</script>

<style scoped>
    .edit-area {
        margin-top: 20px;
    }

    button {
        margin-top: 10px;
        float: right;
    }
</style>