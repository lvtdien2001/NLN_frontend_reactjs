import { Home, Auth, Products } from '../views'
import { AdminProducts, AdminUsers, AdminOrders, AdminGrossing } from '../views/Admin'

// Public router - non_login
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/products', component: Products },
    { path: '/product/:id', component: Home },
    { path: '/auth', component: Auth },
    { path: '/search', component: Home }
]

// Private router - login with user
const privateRoutes = [
    { path: '/profile/:id', component: Home },
    { path: '/orders/:userId', component: Home },
    { path: '/cart/:userId', component: Home }
]

// Admin router - login with admin account
const adminRoutes = [
    { path: '/admin/products', component: AdminProducts },
    { path: '/admin/orders', component: AdminOrders },
    { path: '/admin/users', component: AdminUsers },
    { path: '/admin/grossing', component: AdminGrossing }
]

export { publicRoutes, privateRoutes, adminRoutes }
