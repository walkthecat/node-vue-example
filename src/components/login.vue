<template>
    <div>
        <home-header></home-header>
        <section class="container form-horizontal">
            <div class="alert alert-danger alert-dismissible hidden" role="alert">
                <!--<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>-->
                {{ tips }}
            </div>
            <div class="well">
                <div class="login">
                    <div class="form-group">
                        <label for="txtaccount" class="col-xs-3 col-md-1 control-label">账号：</label>
                        <div class="col-xs-9 col-md-4">
                            <input class="form-control" id="txtaccount" placeholder="请输入账号" v-model="account">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="txtpassword" class="col-xs-3 col-md-1 control-label">密码：</label>
                        <div class="col-xs-9 col-md-4">
                            <input type="password" class="form-control" id="txtpassword" placeholder="请输入密码" v-model="password">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-offset-3 col-md-offset-1 col-xs-9 col-md-11">
                            <div class="checkbox">
                                <label>
                                    <input id="isRemember" type="checkbox"> 记住账号
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-offset-3 col-md-offset-1 col-xs-9 col-md-11">
                            <button type="submit" class="btn btn-default" @click="login">登录</button>
                        </div>
                    </div>
                </div>
                <div class="logined hidden">
                    <div class="form-group">
                        <label class="col-xs-3 col-md-1">账号：</label>
                        <label class="col-xs-9 col-md-4">{{ nameCN }}</label>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-3 col-md-1">公司：</label>
                        <label class="col-xs-9 col-md-4">{{ unitName }}</label>
                    </div>
                </div>
            </div>
        </section>
        <home-footer></home-footer>
    </div>
</template>

<script>
import HomeHeader from './homeheader.vue'
import HomeFooter from './homefooter.vue'

export default {
    data() {
        return {
            account: '',
            password: '',
            tips: '',
            nameCN: '',
            unitName: ''
        }
    },
    mounted() {
        this.getLocalStorage()
    },
    components: {
        HomeHeader,
        HomeFooter
    },
    methods: {
        getLocalStorage() {
            const storage = window.localStorage;
            if (storage.User) {
                console.log($('#isRemember').prop('checked'));
                this.account = storage.User;
                $('#isRemember').prop('checked', true);
            }
        },
        login() {
            // 获取已有账号密码
            this.$http.post('/api/checklogin', { account: this.account, password: this.password })
                .then((res) => {
                    console.log(res);
                    const isUser = res.body.IsUser;
                    if (!!isUser) {
                        if ($('#isRemember').val()) {
                            const storage = window.localStorage;
                            storage.User = $('#txtaccount').val();
                            this.nameCN = res.body.NameCN;
                            this.unitName = res.body.UnitName;
                            $('.login').addClass('hidden');
                            $('.logined').removeClass('hidden');
                        }
                    } else {
                        this.tips = '账户或者密码错误';
                        $('.alert').removeClass('hidden');
                    }
                }).catch((reject) => {
                    console.log(reject);
                });
            /*this.$http.get('/api/login/getAccount')
                .then((response) => {
                    // 响应成功回调
                    console.log(response)
                    let params = {
                        account: this.account,
                        password: this.password
                    };
                    // 创建一个账号密码
                    return this.$http.post('/api/login/createAccount', params);
                })
                .then((response) => {
                    console.log(response)
                })
                .catch((reject) => {
                    console.log(reject)
                });*/
        }
    }
}
</script>