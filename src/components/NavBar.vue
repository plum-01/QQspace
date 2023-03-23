<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{name: 'home'}">Myspace</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'home'}">首页</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'userlist'}">好友列表</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav" v-if="!$store.state.user.is_login">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'login'}">登录</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'regist'}">注册</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav" v-else>
                    <li class="nav-item">
                        <router-link 
                            class="nav-link" 
                            :to="{name: 'userprofile', params: {userId: $store.state.user.id}}"
                        >
                            {{ $store.state.user.username }}
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="cursor: pointer" @click="logout">退出</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>>

<script>
    import {useStore} from 'vuex'
    import router from '@/router';

    export default {
        name: 'NavBar',
        setup() {
            const store = useStore();

            // 实现退出，删掉 access 即可
            // logout 修要修改全局 state 中的 access
            // 凡是涉及到修改全局 state 的，要把修改的api写到 actions 或 mutations 里边
            const logout = () => {
                router.push({
                    name: 'login'
                })
                store.commit('logout');
            }

            return {
                logout
            }
        }
    }
</script>
<style scoped></style>