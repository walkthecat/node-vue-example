<template>
    <section>
        <home-header></home-header>
        <div class="table-responsive container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>用户ID</th>
                        <th>用户名</th>
                        <th>公司名</th>
                    </tr>
                </thead>
                <tbody>
    
                </tbody>
            </table>
        </div>
        <home-footer></home-footer>
    </section>
</template>

<script>
import HomeHeader from '@/components/homeheader'
import HomeFooter from '@/components/homefooter'
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
        HomeHeader
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData(pageNum = 1, pageSize = 5) {
            this.$http.get('/api/table', { params: { pageNum: pageNum, pageSize: pageSize } })
                .then((res) => {
                    console.log(res);
                }).catch((reject) => {
                    console.log(reject);
                });
        }
    }
}
</script>
