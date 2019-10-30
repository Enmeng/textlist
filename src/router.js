import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.path != '/') {
        next('/');
    }
    next();
})

export default router