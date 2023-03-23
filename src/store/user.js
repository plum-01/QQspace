import $ from 'jquery';
import jwt_decode from 'jwt-decode';

const ModuleUser = {
    state: {
        id: "",
        username: "",
        photo: "",
        followerCount: 0,
        access: "",        //jwt令牌
        refresh: "",       // 刷新令牌
        is_login: false    // 是否登录，初始状态为未登录
    },

    getters: {
    },

    mutations: {
        // user: 接收commit传过来的数据
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.followerCount = user.followerCount;
            state.access = user.access;
            state.refresh = user.refresh;
            state.is_login = user.is_login;
        },
        updateAccess(state, access) {
            state.access = access;
        },
        logout(state) {
            state.is_login = false
        }
    },

    actions: {
        login(context, data) {
            $.ajax({
                // 获取jwt
                url: "https://app165.acapp.acwing.com.cn/api/token/",
                type: "POST",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(res) {
                    const { access, refresh } = res;
                    const access_obj = jwt_decode(access);
                    setInterval(() => {
                        $.ajax({
                            // 刷新jwt令牌
                            url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                            type: "POST",
                            data: {
                                refresh,
                            },
                            success(res) {
                                context.commit("updateAccess", res.access)
                            }
                        })
                    }, 4.5 * 60 * 1000);
                    
                    $.ajax({
                        // 获取登录用户信息
                        url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                        type: 'GET',
                        data: {
                            user_id: access_obj.user_id,
                        },
                        // jwt验证
                        headers: {
                            'Authorization': "Bearer " + access,
                        },
                        success(res) {
                            // 成功获取信息后，需要更新到state里
                            // commit第二个参数: 实际要传的值，传给updateUser
                            context.commit("updateUser", {
                                ...res,
                                access: access,
                                refresh: refresh,
                                is_login: true,
                            });
                            data.success();
                        }
                    })
                },
                error() {
                    data.error();
                }
            });
        }
    },
    modules: {
    }
};

export default ModuleUser;