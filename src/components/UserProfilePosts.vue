<template>
    <div class="card">
        <div class="card-body">
            <!-- v-for: 循环，循环post对象的posts数组，将数组的每一项赋给post -->
            <div v-for="post in post.posts" :key="post.id">
                <div class="card single-post">
                    <div class="card-body">
                        {{ post.content }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'UserProfilePosts',
        props: {
            post: {
                type: Object,
                required: true,
            },
        },
    }
</script>

<style scoped>
    .single-post {
        margin-bottom: 10px;
    }
</style>