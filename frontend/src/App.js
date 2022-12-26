import {BrowserRouter, Routes, Route} from "react-router-dom";

//import needed general use pages
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/Cartpage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

//the protector followed by the protected pages for users
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
import UserProfilePage from "./pages/users/UserProfilePage";
import UserOrdersPage from "./pages/users/UserOrdersPage";
import UserOrderDetailsPage from "./pages/users/UserOrderDetailsPage";
import UserCartDetailsPage from "./pages/users/UserCartDetailsPage";

//the previous protector is used for admin aswell here are the protected pages for admins
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";
import AdminEditUsersPage from "./pages/admin/AdminEditUsersPage";
import AdminChatsPage from "./pages/admin/AdminChatsPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";

//components
import HeaderComponent from "./components/HeaderComponent"
import FooterComponent from "./components/FooterComponent"

//user components
import RoutesWithUserChatComponent from "./components/user/RoutesWithUserChatComponent"; /*Here we only import ROUTESWithUserChatComponent and allow this file to import UserChatComponent itself.*/

//utilities
import ScrollToTop from "./utilities/ScrollToTop";



function App() {
    return (
        <BrowserRouter>

            {/*put our ScrollToTop function here so that it is present for all pages.*/}
            <ScrollToTop />

            <HeaderComponent/> {/*header at top of page*/}

            <Routes>


                <Route element={<RoutesWithUserChatComponent/>}>
                    <Route path="/" element={<HomePage />} /> {/*HomePage will now have the path / in the URL*/}
                    <Route path="/loginpage" element={<LoginPage />} />
                    <Route path="/productlistpage" element={<ProductListPage />} />
                    <Route path="/productdetailspage" element={<ProductDetailsPage />} />
                    <Route path="/productdetailspage/:id" element={<ProductDetailsPage />} /> {/*id becomes a JSX parameter that will be set in the ProductDetailsPage*/}
                    <Route path="/cartpage" element={<CartPage />} />
                    <Route path="/registerpage" element={<RegisterPage />} />
                </Route>

                {/*<Route element={<RoutesWithUserChatComponent/>}>          ALT#1 general pages and user pages will have chat feature*/}
                    <Route element={<ProtectedRoutesComponent admin={false} />}>
                        <Route path="/user/cartdetailspage" element={<UserCartDetailsPage />} /> {/*The Outlets are the pages contained in these tags*/}
                        <Route path="/user/orderdetailspage" element={<UserOrderDetailsPage />} />
                        <Route path="/user/orderspage" element={<UserOrdersPage />} />
                        <Route path="/user/profilepage" element={<UserProfilePage />} />
                    </Route>
                {/*</Route>         ALT#1 bottom tag*/}

                <Route element={<ProtectedRoutesComponent admin={true} />}> {/*Passing an admin "prop" with the value true*/}
                    <Route path="/admin/userspage" element={<AdminUsersPage />} /> {/*The Outlets are the pages contained in these tags*/}
                    <Route path="/admin/productspage" element={<AdminProductsPage />} />
                    <Route path="/admin/orderspage" element={<AdminOrdersPage />} />
                    <Route path="/admin/orderdetailspage" element={<AdminOrderDetailsPage />} />
                    <Route path="/admin/edituserspage" element={<AdminEditUsersPage />} />
                    <Route path="/admin/editproductpage" element={<AdminEditProductPage />} />
                    <Route path="/admin/createproductpage" element={<AdminCreateProductPage />} />
                    <Route path="/admin/chatspage" element={<AdminChatsPage />} />
                    <Route path="/admin/analyticspage" element={<AdminAnalyticsPage />} />

                </Route>

                <Route path="*" element= "Page does not exist 404" /> {/*We won't use this later*/}

            </Routes>

            <FooterComponent/> {/*footer at bottom of page*/}

        </BrowserRouter>
    );
}

export default App;
