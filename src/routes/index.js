import Home from '../views/Home'
import Auth from '../views/Auth'
import Products from '../views/Products'
import ProductDetail from '../views/ProductDetail'
import Search from '../views/Search';
import UserInfor from '../views/UserInfor';

import { AdminProducts, AdminUsers, AdminOrders, AdminGrossing } from '../views/Admin';


// Public router - non_login
const publicRoutes = [
    { path: '/', component:<Home /> },
    { path: '/products', component: <Products /> },
    { path: '/product/:id', component: <ProductDetail />},
    { path: '/auth', component: <Auth />},
    { path: '/search/:query', component: <Search /> },
]

// Private router - login with user
const privateRoutes = [
    { path: '/profile', component:<UserInfor />},
    { path: '/orders/:userId', component: Home },
    { path: '/cart/:userId', component: Home },
]

// Admin router - login with admin account
const adminRoutes = [
    { path: '/admin/products', component: <AdminProducts />},
    { path: '/admin/orders', component: <AdminOrders />},
    { path: '/admin/users', component: <AdminUsers />},
    {path: '/admin/grossing', component: <AdminGrossing />}
   
]

export { publicRoutes, privateRoutes, adminRoutes }
