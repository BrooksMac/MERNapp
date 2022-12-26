import {Outlet, Navigate} from 'react-router-dom'
import UserChatComponent from "./user/UserChatComponent"

const ProtectedRoutesComponent = ( {admin} ) => { /*this is where you accept the props you've passed*/



    /*auth is being split up into two different auth types, admin and user.*/
    if(admin){
        let adminAuth = true;
        return adminAuth ? <Outlet /> : <Navigate to={"/loginpage"}/>; /*if true, go to requested Outlet, if false go to Navigate -> /loginpage   */
    } else {
        let userAuth = true;
        /*ALT#1 This is an Alternative method to make UserChatComponent show up with the requested URL, ONLY APPLIES TO USER PAGES since the general pages are not routed through this file*/
        return userAuth ? <> <UserChatComponent /> <Outlet /> </> : <Navigate to="/loginpage" />
    }

}

export default ProtectedRoutesComponent;