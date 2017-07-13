<template>
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">练习</a>
            </div>
    
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li v-for="(item,index) in menus" :key="index" :class="[index == menuIndex ? 'active' : '']" @click="setMenuIndex(index)">
                        <router-link :to="item.path">{{item.name}}
                        </router-link>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>
</template>

<script>
export default {
    data() {
        return {
            menuIndex: 0,//this.$store.state.menuIndex,
            menus: [{
                name: '登陆',
                path: '/'
            }, {
                name: '注册',
                path: '/reg'
            },{
                name: '表格',
                path: '/table'
            },{
                name: '盒模型',
                path: '/box'
            },{
                name: '图片',
                path: '/pic'
            }]
        }
    },
    mounted() {
        this.setMenuIndexByArray()
    },
    methods: {
        setMenuIndexByArray() {
            this.menus.find((menu, index) => {
                if (menu.path == location.hash.substring(1)) {
                    this.menuIndex = index
                }
            })
        },
        //使用vuex创建全局变量来控制菜单激活
        setMenuIndex(index) {
            //this.$store.commit('changeIndexMutation', index)
            this.$store.dispatch('changeIndexAction', index)
        }
    }
}
</script>