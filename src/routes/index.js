import { Home, Auth, Products, ProductDetail, Search, UserInfor, Cart, Order, Payment, Address } from '../views'
import { AdminProducts, AdminUsers, AdminOrders, AdminGrossing } from '../views/Admin';
import AddressForm from '../components/Address/AddressForm';


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
    { path: '/profile/payment', component: <Payment /> },
    { path: '/address', component:<Address />},
    { path: '/address/create', component:<AddressForm />},
    { path: '/orders', component: <Order /> },
    { path: '/cart', component: <Cart /> },
]

// Admin router - login with admin account
const adminRoutes = [
    { path: '/admin/products', component: <AdminProducts />},
    { path: '/admin/orders', component: <AdminOrders />},
    { path: '/admin/users', component: <AdminUsers />},
    {path: '/admin/grossing', component: <AdminGrossing />}
   
]

export { publicRoutes, privateRoutes, adminRoutes }
