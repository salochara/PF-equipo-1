import Category from '../components/views/services/Category.vue'
import CategoryProfile from '../components/views/services/CategoryProfile.vue'
import ServiceByUser from '../components/views/services/ServiceByUser.vue'

import axios from 'axios' 

const routes = [
    {
        path: 'categories',
        component: Category,
        name: 'Category',
        meta: {
          description: 'Categories',
          title: 'Categories',
          requiresAuth: true
        }
      },
      {
        path: '/categories/:_id',
        beforeEnter: (to, from, next) => {
            axios.get('')
            to.params._id === 'create' ? next({ name: 'MemberCreate' }) : next()
          },
        component: CategoryProfile,
        name: 'CategoryProfile',
        meta: {
          description: 'Subcategories of the selected category',
          title: 'Category Details',
          requiresAuth: true
        }
      },
      {
        path: 'userservices',
        component: ServiceByUser,
        name: 'Service By User',
        meta: {
          description: 'Current Active Services in your account.',
          title: 'Active Services',
          requiresAuth: true
        }
      }
]

export default routes



