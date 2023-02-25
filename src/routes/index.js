import { Home } from '../views'

// Public router - non_login
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/products', component: Home },
    { path: '/product/:id', component: Home },
    { path: '/login', component: Home },
    { path: '/register', component: Home },
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
    { path: '/admin/products' },
    { path: '/admin/orders' },
    { path: '/admin/users' },
    { path: '/admin/grossing' }
]

export { publicRoutes, privateRoutes, adminRoutes }
