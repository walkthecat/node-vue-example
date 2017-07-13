<template>
    <nav aria-label="...">
        <ul class="pagination">
            <li :class="[ isFirstPage ? 'disabled':'' ]">
                <a @click="getData(1)" aria-label="Previous">
                    <span aria-hidden="true">首页</span>
                </a>
            </li>
            <li :class="[ isFirstPage ? 'disabled':'' ]">
                <a @click="getData(currentPage-1)"  aria-label="Previous">
                    <span aria-hidden="true">&lt; 上一页</span>
                </a>
            </li>
            <li v-for="(item,index) in showNum" :key="index" :class="[ item == currentPage ? 'active' : '']">
                <a @click="getData(item)">{{item}}
                    <span class="sr-only">(current)</span>
                </a>
            </li>
            <li :class="[ isLastPage ? 'disabled':'' ]">
                <a @click="getData(currentPage+1)" aria-label="Previous">
                    <span aria-hidden="true">下一页 &gt;</span>
                </a>
            </li>
            <li :class="[ isLastPage ? 'disabled':'' ]">
                <a @click="getData(totalPage)" aria-label="Previous">
                    <span aria-hidden="true">尾页</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            showNum: []
        }
    },
    props: ['isFirstPage', 'isLastPage', 'currentPage', 'totalPage', 'pageRange', 'getData'],
    watch: {
        currentPage: 'getPageRange'
    },
    methods: {
        getPageRange() {
            this.showNum = [];
            let defaultPageRange = this.pageRange || 2
            let remainingPage = 0
            let count
            for (remainingPage += defaultPageRange, count = this.currentPage; count > 0 && remainingPage >= 0; count-- , remainingPage--) {
                this.showNum.push(count)
            }
            for (count = this.currentPage + 1, remainingPage += defaultPageRange; count < this.totalPage && remainingPage >= 0; count++ , remainingPage--) {
                this.showNum.push(count)
            }
            this.showNum.sort((a, b) => { return a - b })
        }
    }
}
</script>

<style scoped>
.disabled
{ 
    pointer-events: none;
}
</style>
