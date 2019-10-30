<template>
    <div class="home_container">
        <textlist :option="option"></textlist>
    </div>
</template>

<script>
import textlist from '../components/textlist'
export default {
    name: 'home',

    data () {
        return {
            option: ''
        }
    },

    components: {
        textlist
    },

    mounted () {
        let obj = {
                'title': [
                    '序号',
                     '名称', 
                     '状态'
                    ],
                'list': [
                    [
                        '1',
                        '事项一事项二事项三事项四事项五',
                        '审理'

                    ],
                    [
                        '2',
                        '事项二',
                        '受理'

                    ],
                    [
                        '3',
                        '事项一事项二事项三事项四事项五',
                        '未审理'

                    ],
                    [
                        '4',
                        '事项一事项二事项三事项四事项五',
                        '审理'

                    ],
                    [
                        '5',
                        '事项一',
                        '审理'

                    ]
                ]
            };
        this.option = JSON.stringify(obj)
    }
}
</script>

<style scoped lang="less">
.home_container {
    width: 500px;
    height: 320px;
}
</style>