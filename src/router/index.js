import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import DeleteCandidateButton from '../components/DeleteCandidateButton.vue'; 
import AddCandidateForm from '../components/AddCandidateForm.vue';

const routes = [
  {
    path: '/',
    redirect: '/homepage', 
  },
  {
    path: '/homepage',
    name:'HomePage',
    component:HomePage,
    children:[
      {
        path: 'add',
        name: 'AddCandidateForm',
        component: AddCandidateForm,
      },
      {
        path:'delete',
        name:'DeleteCandidateButton',
        component:DeleteCandidateButton,
      },
    ]
  },
 
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
