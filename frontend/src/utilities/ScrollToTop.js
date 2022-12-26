import {useLocation} from "react-router-dom";
import {useEffect} from "react";

/*useEffect is a listener, if pathName changes it will execute. pathName is set to whatever the current URL is so when the URL changes it will fire*/
export default function ScrollToTop() {
    const {pathName} = useLocation();
    useEffect(() => {
        window.scrollTo(0,0)
    }, [{pathName}]);
    /*something must be returned, in our case null*/
    return null;
}