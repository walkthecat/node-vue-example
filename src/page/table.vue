<template>
    <section>
        <home-header></home-header>
        <div class="table-responsive container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>用户ID</th>
                        <th>用户名</th>
                        <th>公司名</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in rowData" :key="index">
                        <th scope="row">{{ index+1 }}</th>
                        <td>{{item.UserName}}</td>
                        <td>{{item.NameCN}}</td>
                        <td>{{item.UnitName}}</td>
                    </tr>
                </tbody>
            </table>
            <paginator :isFirstPage="footData.isFirstPage" 
            :isLastPage="footData.isLastPage" 
            :totalPage="footData.totalPage" 
            :currentPage="footData.currentPage"
            :getData="getData"></paginator>
        </div>
        <home-footer></home-footer>
    </section>
</template>

<script>
import HomeHeader from '@/components/homeheader'
import HomeFooter from '@/components/homefooter'
import Paginator from '@/components/paginator'
export default {
    data() {
        return {
            rowData: [],
            footData: {},
            rangeData: []
        }
    },
    components: {
        HomeFooter,
        HomeHeader,
        Paginator
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData(pageNum = 1, pageSize = 5) {
            this.$http.get('/api/table', { params: { pageNum: pageNum, pageSize: pageSize } })
                .then((res) => {
                    //console.log(res);
                    this.rowData = res.data.rowData
                    this.footData = res.data.footData
                }).catch((reject) => {
                    console.log(reject);
                });
        }
    }
}
</script>
