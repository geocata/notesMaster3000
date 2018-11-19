import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Notes';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Notes',
            component: Index,
            meta: {
                title: 'Notes master 3000'
            }
        }
    ],
    mode: 'history'
});
