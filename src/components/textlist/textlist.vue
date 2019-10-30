<template>
    <div class="textlist_container">
        <div class="textlist_title">
            <div class="title_item" v-for="title in listInfo.title">{{title}}</div>
        </div>
        <div class="textlist_list">
            <transition-group name="list" tag="div" class="item-list" mode="out-in">
                <div class="list_item" v-for="(list, index) in disList" :style="rowStyle(index)" :key="list[0]">
                    <div class="row_item" v-for="(item, subIndex) in list">
                        <div class="item" @mouseenter="showDetail($event, index, subIndex)" @mouseleave="hideDetail">
                            {{item}}
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    name: 'textlist',

    data () {
        return {
            scrollTimer: null,//滚动的定时器
            listInfo: {
                title: [],
                list: []
            },
            disList: [],
            intervalTimmer: null
        }
    },

    props: {
        option: String
    },

    computed: {
        rowStyle () {
            return (index) => {
                if(index % 2 == 0) {
                    return {
                        'background-color': 'rgba(7, 14, 37, 0.1)'
                    }
                } else {
                    return {
                        'background-color': 'rgba(21, 165, 255, 0.1)'
                    }
                }
            }
        }
    },

    watch: {
        option(newValue, oldValue) {
            this.listInfo = JSON.parse(newValue);
            for(let i = 0; i < this.listInfo.list.length; i ++) {
                // this.listInfo.list[i][1] = "事项事项事项事项事项一二三四五"
                Vue.set(this.disList, i, this.listInfo.list[i]);
            }
            this.scroll();
        }
    },

    methods: {
        showDetail (e, index, subIndex) {
            let targetDom = e.target;
            let _this = this;
            let str = _this.listInfo.list[index][subIndex];
             clearInterval(_this.intervalTimmer)
            _this.intervalTimmer = null;
           
            //计算字符串的大约宽度
            let len = str.length  * 30;
            let targetWidth = targetDom.clientWidth;
            if(len > targetWidth) {
                let distance = len - targetWidth;
                let val = 0;
                targetDom.classList.remove('item');
                targetDom.classList.add('active_item');
                _this.intervalTimmer = setInterval( () => {
                    if(Math.abs(val) < distance) {
                        targetDom.style = 'transform:translateX(' + val + 'px);';
                        // targetDom.style = 'text-overflow:no;';
                        // targetDom.classList.remove('item');
                        // targetDom.classList.add('active_item');
                        val = val - 5;
                    } else {
                        targetDom.style = 'transform:translateX(0px);';
                        targetDom.classList.remove('active_item');
                        targetDom.classList.add('item');
                        clearInterval(_this.intervalTimmer)
                        _this.intervalTimmer = null;
                        
                    }
                }, 100);
            }

        },

        hideDetail (e) {
            let targetDom = e.target;
            targetDom.style = 'transform:translateX(0px);';
            targetDom.classList.remove('active_item');
            targetDom.classList.add('item');
            clearInterval(this.intervalTimmer)
            this.intervalTimmer = null;
            
        },

        scroll () {
            let _this = this;
            clearInterval(this.scrollTimer);
            this.scrollTimer = null;
            _this.scrollTimer = setInterval( () => {
                if(_this.listInfo.list.length > 0) {
                    let firstitem = _this.listInfo.list[0];
                    for(let i = 0; i < _this.listInfo.list.length - 1; i ++ ) {
                        
                        _this.listInfo.list[i] = _this.listInfo.list[i + 1];
                        let item = _this.listInfo.list[i + 1];
                    }
                    _this.listInfo.list[_this.listInfo.list.length - 1] = firstitem;

                    //清空数组，让每行视觉上往上移动
                    _this.disList = [];
                }
                setTimeout(() => {
                    //添加数组元素，每行的数组是重新排序后的值
                    for(let i = 0; i < _this.listInfo.list.length; i ++ ) {
                        Vue.set(_this.disList, i, _this.listInfo.list[i]);
                    }
                }, 1500)

                
            }, 6000)
        }
    },

    mounted () {
        this.scroll();
    },

    destroyed () {
        clearInterval(this.scrollTimer);
        this.scrollTimer = null;
        
    }
}
</script>

<style lang="less" scoped>
.textlist_container {
    width: 100%;
    height: 100%; 
    border: 1px solid rgba(21, 165, 255, 0.5);
    font-size: 0.3rem;
    overflow: hidden;

    .textlist_title {
        width: 100%;
        height: 0.64rem;
        background-color: rgba(21, 165, 255, 0.1);
        color: #15a5ff;

        .title_item {
            width: 33%;
            height: 100%;
            float: left;
            line-height: 0.64rem;
            text-align: center;
            vertical-align: middle;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .textlist_list {
        overflow: hidden;

        .list_item {
            width: 100%;
            height: 0.64rem;

            .row_item {
                width: 33%;
                height: 100%;
                float: left;
                position: relative;
                overflow: hidden;

                .item {
                    // width: 100%;
                    height: 100%;
                    // position: absolute;
                    line-height: 0.64rem;
                    text-align: center;
                    vertical-align: middle;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                .active_item {
                    // width: 100%;
                    height: 100%;
                    // position: absolute;
                    line-height: 0.64rem;
                    text-align: center;
                    vertical-align: middle;
                    // overflow: hidden;
                    white-space: nowrap;
                    // text-overflow: ellipsis;
                }
            }
            
        }
    }
}

// .list-enter-active, .list-leave-active {
//     transition: all 1.5s ease;
// }

.list-leave-active {
    transition: all 1.5s ease;
}

// .list-enter {
//     transform: translateY(64px);
// }

.list-leave-to {
    transform: translateY(-64px);
}

 
 

//   .list-move {
//     transition: transform 1.75s;
//   }

// .bounce-enter-active {
//   animation: bounce-in .5s;
// }
// .bounce-leave-active {
//   animation: bounce-in .5s reverse;
// }
// @keyframes bounce-in {
//   0% {
//     transform: scale(0);
//   }
//   50% {
//     transform: scale(1.5);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
</style>