import { createApp } from 'vue'
import App from './App.vue'
import TaskForm from './components/TaskForm.vue'
import TaskLIst from './components/TaskLIst.vue'
import {createRouter, createWebHistory} from 'vue-router'
//il faut installer vue-router@4
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'




const routes= [
    {path: '/', name: 'home' , component:TaskLIst},

    { path: '/add', name: 'task-add', component: TaskForm, props: { mode: 'add' } },

    { 
        path: '/edit/:id',
        name: 'task-edit', 
        component: TaskForm,
        props: (route) => ({ 
            mode: 'edit', 
            id: parseInt(route.params.id),
                ...route.params.taskData // On pourra passer l'objet task ici
            }) 
    },
]

const router = createRouter({//
    history:createWebHistory(),
    routes
})


createApp(App)
.use(router)//installation de la route
.mount('#app')
