import Vue from 'vue'
import App from './App.vue'
import TaskForm from './components/TaskForm.vue'
import VueRouter from 'vue-router'
import TaskList from './components/TaskList.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
const Config = { template: '<div> CONFIG </div>' }

const routes = [
  // La page d'accueil affiche TaskList
  { path: '/', name: 'home', component: TaskList }, 

  // Route pour ajouter
  { path: '/add', name: 'task-add', component: TaskForm, props: { mode: 'add' } },
  
  // Route pour éditer
  { path: '/edit/:index', name: 'task-edit', component: TaskForm, props: (route) => ({ 
      mode: 'edit', 
      index: parseInt(route.params.index),
      ...route.params.taskData // On pourra passer l'objet task ici
    }) 
  },
  { path: '/config', name: 'config', component: Config }
]


//instance du router qui va gerer les options des routes
const router = new VueRouter({
  routes:routes
})


new Vue({
  render: h => h(App),
  router // on injecte dans l'instance racine , on aura acces à lui grace à this.router
}).$mount('#app')


//vue-router est une bibliotheque vue fournie pour gerer la navigation entre les pages du coté client .
//router permet donc d'associer des url à des composants vue . soit on l'install avec le cli de vue pendant la configuration initiale du projet, soit on l'ajoute avec la commande : vue add router
// j'ai utilisé npm install vue-router

//uen fois la resolution de la page terminé , un composant est associé à l'url , ce composant est laors injecté à la place de <router-view /> generalement placé dans le composant racine (App)




