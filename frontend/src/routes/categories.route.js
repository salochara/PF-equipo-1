import Category from '../components/views/services/Category.vue'

import CategoryProfile from '../components/views/services/CategoryProfile.vue'
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
        component: CategoryProfile,
        name: 'CategoryProfile',
        meta: {
          description: 'Subcategories os the selected category',
          title: 'Category Details',
          requiresAuth: true
        }
      }
]

export default routes



