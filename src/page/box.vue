<template>
    <section>
        <home-header menu="/box"></home-header>
        <div class="container">
            <!-- 旧版盒模型 -->
            <div id="box">
                <div style="background:red">left</div>
                <div style="background:green">center</div>
                <div style="background:blue">right</div>
            </div>
            <br>
            <div id="vbox">
                <div style="background: red;">1</div>
                <div style="background: yellow;">2</div>
                <div style="background: blue;">3</div>
                <div style="background: green;">4</div>
            </div>
            <br>
            <div id="rbox">
                <div class="div1" style="background-color: lawngreen">div1</div>
                <div class="div2" style="background-color: red">div2</div>
            </div>
            <br>

            <!-- 新版盒模型 -->
            <!-- 父元素使用display:flex;flex-flow:row -->
            <!-- 子元素flex:1 1 20% 三个属性的意思为1.剩余空间的扩展比例;2.溢出空间后的收缩比例;3.伸缩基准值同width -->
            <div class="flex">
                <div>uno</div>
                <div>due</div>
                <div>tre</div>
            </div>
    
            <section id="body">
                <header>header</header>
                <div id='main'>
                    <article>article</article>
                    <nav>nav</nav>
                    <aside>aside</aside>
                </div>
                <footer>footer</footer>
            </section>
        </div>
        <home-footer></home-footer>
    </section>
</template>

<script>
import HomeHeader from '@/components/homeheader'
import HomeFooter from '@/components/homefooter'

export default {
    data() {
        return {}
    },
    components: {
        HomeHeader,
        HomeFooter
    }
}
</script>

<style scoped>
#box,
#rbox {
    display: -webkit-box;
}

#box div {
    /* 当然了这里我们也可根据具体需求设置我们所需的大小 */
    -webkit-box-flex: 1;
    height: 300px;
}

#vbox {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    height: 100%;
    font-size: 100px;
    text-align: center;
    color: #fff;
}

#box div {
    -webkit-box-flex: 1;
}

#rbox {
    -webkit-box-pack: center;
    -webkit-box-align: center;
    width: 300px;
    height: 300px;
    border: 1px solid #000;
    margin: 100px auto;
}

#rbox div {
    width: 100px;
    height: 100px;
}

.flex {
    /* 基本样式 */
    width: 350px;
    height: 200px;
    border: 1px solid #555;
    font: 14px Arial;

    /*  建立弹性框 */
    display: -webkit-flex;
    -webkit-flex-direction: row;

    display: flex;
    flex-direction: row;
}

.flex>div {
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;

    width: 30px;
    /* 让过渡表现良好。（从/到"width:auto"的过渡
                      至少在 Gecko 和 Webkit 上是有 bug 的。
                      更多信息参见 http://bugzil.la/731886 ） */
    -webkit-transition: width 0.7s ease-out;
    transition: width 0.7s ease-out;
}



/* colors */

.flex>div:nth-child(1) {
    background: #009246;
}

.flex>div:nth-child(2) {
    background: #F1F2F1;
}

.flex>div:nth-child(3) {
    background: #CE2B37;
}

.flex>div:hover {
    width: 200px;
}

#body {
    font: 24px Helvetica;
    background: #999999;
}

#main {
    min-height: 800px;
    margin: 0px;
    padding: 0px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row;
    flex-flow: row;
}

#main>article {
    margin: 4px;
    padding: 5px;
    border: 1px solid #cccc33;
    border-radius: 7pt;
    background: #dddd88;
    -webkit-flex: 3 1 60%;
    flex: 3 1 60%;
    -webkit-order: 2;
    order: 2;
}

#main>nav {
    margin: 4px;
    padding: 5px;
    border: 1px solid #8888bb;
    border-radius: 7pt;
    background: #ccccff;
    -webkit-flex: 1 6 20%;
    flex: 1 6 20%;
    -webkit-order: 1;
    order: 1;
}

#main>aside {
    margin: 4px;
    padding: 5px;
    border: 1px solid #8888bb;
    border-radius: 7pt;
    background: #ccccff;
    -webkit-flex: 1 6 20%;
    flex: 1 6 20%;
    -webkit-order: 3;
    order: 3;
}

header,
footer {
    display: block;
    margin: 4px;
    padding: 5px;
    min-height: 100px;
    border: 1px solid #eebb55;
    border-radius: 7pt;
    background: #ffeebb;
}



/* 窄到已不足以支持三栏 */

@media all and (max-width: 640px) {

    #main,
    #page {
        -webkit-flex-flow: column;
        flex-direction: column;
    }

    #main>article,
    #main>nav,
    #main>aside {
        /* 恢复到文档内的自然顺序 */
        -webkit-order: 0;
        order: 0;
    }

    #main>nav,
    #main>aside,
    header,
    footer {
        min-height: 50px;
        max-height: 50px;
    }
}

:fullscreen a {
    display: flex
}
</style>
