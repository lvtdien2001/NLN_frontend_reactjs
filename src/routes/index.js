import Home from '../views/Home'
import Auth from '../views/Auth'
import Products from '../views/Products'
import ProductDetail from '../views/ProductDetail'
import Search from '../views/Search';
import TestRating from '../Test/TestRating';

// Public router - non_login
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/products', component: Products },
    { path: '/product/:id', component: ProductDetail },
    { path: '/auth', component: Auth },
    { path: '/search/:query', component: Search },
    { path: '/test', component: TestRating },
]

// Private router - login with user
const privateRoutes = [
    { path: '/profile/:id', component: Home },
    { path: '/orders/:userId', component: Home },
    { path: '/cart/:userId', component: Home }
]

// Admin router - login with admin account
const adminRoutes = [
    { path: '/admin/products', component: Home },
    { path: '/admin/orders', component: Home },
    { path: '/admin/users', component: Home },
    { path: '/admin/grossing', component: Home }
]

export { publicRoutes, privateRoutes, adminRoutes }
