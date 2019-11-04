import Vue from 'vue'
import Router from 'vue-router'
import Detail from '@/view/detail.vue'
import Index from '@/view/index.vue'
Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            component:Index
        },
        {
            name:'detail',
            path:'/detail/:id',
            component:Detail
        }
    ]
})