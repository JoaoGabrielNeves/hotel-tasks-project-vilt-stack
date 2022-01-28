require('./bootstrap');

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'
import Layout from './Layouts/Layout'
import { Link } from '@inertiajs/inertia-vue3'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async name => {
        let page = (await import(`./Pages/${name}.vue`)).default;
        page.layout ??= Layout;
        return page;
    },
    setup({ el, app, props, plugin }) {

        const myApp = createApp({ render: () => h(app, props) })
            .use(plugin)
            .component('Link', Link)
            .mixin({ methods: { route } });

        myApp.mount(el);

        return myApp;
    },
});

InertiaProgress.init({ color: '#4B5563' });
