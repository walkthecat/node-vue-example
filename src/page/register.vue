<template>
    <section>
        <home-header></home-header>
        <form class="container form-horizontal">
            <div class="alert alert-danger alert-dismissible hidden" role="alert">
                {{ tips }}
            </div>
            <div class="well">
                <div class="register">
                    <div class="form-group">
                        <label for="txtaccount" class="col-xs-4 col-md-2 control-label">账号：</label>
                        <div class="col-xs-8 col-md-4">
                            <input class="form-control" id="txtaccount" placeholder="请输入账号" v-model="account">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="txtpassword" class="col-xs-4 col-md-2 control-label">密码：</label>
                        <div class="col-xs-8 col-md-4">
                            <input type="password" class="form-control" id="txtpassword" placeholder="请输入密码" v-model="password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="txtrepassword" class="col-xs-4 col-md-2 control-label">确认密码：</label>
                        <div class="col-xs-8 col-md-4">
                            <input type="password" class="form-control" id="txtrepeatpassword" placeholder="请输入确认密码" v-model="repassword" v-on:change="checkPsw">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="txtname" class="col-xs-4 col-md-2 control-label">姓名：</label>
                        <div class="col-xs-8 col-md-4">
                            <input type="text" class="form-control" id="txtname" placeholder="请输入姓名" v-model="nameCN">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="txtunit" class="col-xs-4 col-md-2 control-label">公司名：</label>
                        <div class="col-xs-8 col-md-4">
                            <input type="text" class="form-control" id="txtunit" placeholder="请输入公司名" v-model="unitName">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-offset-4 col-md-offset-2 col-xs-8 col-md-10">
                            <button type="button" class="btn btn-primary" @click="register">注册</button>
                            <button type="reset" class="btn btn-default">重置</button>
                        </div>
                    </div>
                </div>
                <div class="registered hidden">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            感谢您注册！
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <home-footer></home-footer>
    </section>
</template>
<script>
import HomeHeader from '@/components/homeheader'
import HomeFooter from '@/components/homefooter'

export default {
    data() {
        return {
            account: '',
            password: '',
            repassword: '',
            tips: '',
            nameCN: '',
            unitName: ''
        }
    },
    components: {
        HomeHeader,
        HomeFooter
    },
    watch: {
        account: 'checkUserName'
    },
    methods: {
        checkUserName() {
            if (this.account.trim() == "") return
            let value = this.account
            setTimeout(() => {
                if (this.account == value) {
                    this.$http.get('/api/user', { params: { account: this.account } })
                        .then((res) => {
                            console.log(res);
                            const isUser = res.body.IsUser;
                            if (!!isUser) {
                                this.showErr('txtaccount', '用户已存在', true);
                            } else {
                                this.showErr('txtaccount', '', false);
                            }
                        }).catch((reject) => {
                            console.log(reject);
                        });
                }
            }, 1000);
        },
        checkPsw() {
            if (this.password != this.repassword) {
                this.showErr('txtrepeatpassword', '两次密码不一致', true);
            }
            else {
                this.showErr('txtrepeatpassword', '', false);
            }
        },
        showErr(id, tip, isShow) {
            if (isShow) {
                $('#' + id).parent().parent().addClass('has-error');
                this.tips = tip;
                $('.alert').removeClass('hidden');
            }
            else {
                $('#' + id).parent().parent().removeClass('has-error')
                this.tips = '';
                $('.alert').addClass('hidden');
            }
        },
        register() {
            this.$http.post('/api/reg', { account: this.account, password: this.password, nameCN: this.nameCN, unitName: this.unitName })
                .then((res) => {
                    console.log(res);
                    const isUser = res.body.IsUser;
                    if (!!isUser) {
                        $('.register').addClass('hidden');
                        $('.registered').removeClass('hidden');
                    } else {
                        this.tips = '账户已存在';
                        $('.alert').removeClass('hidden');
                    }
                }).catch((reject) => {
                    console.log(reject);
                });
        }
    }
}
</script>
