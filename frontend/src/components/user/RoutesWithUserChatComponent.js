/*ALT#1 file that allows the chat feature to be displayed with other requested appropriate URLs*/

import {Outlet} from "react-router-dom"       /*Outlet is all the URLs that this Route surrounds*/
import UserChatComponent from "./UserChatComponent"    /*And this is the user chat component*/

const RoutesWithUserChatComponent = () => {
    /*Simply return the chat component along with the requested URL*/
    return  <> <UserChatComponent /> <Outlet /> </>      /*when two tags are being returned they must be enclosed in the special React tags/// brackets are only necessary if the return statement spans multiple lines*/
}

export default RoutesWithUserChatComponent