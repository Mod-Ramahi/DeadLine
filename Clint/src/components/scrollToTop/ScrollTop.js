import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTop() {
    // const { pathname } = useLocation();
    const location = useLocation()
    useEffect(() => {
        scrollUp()
    },[location.pathname])
    const scrollUp = () => {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        scrollUp()
        const handlePopstate = () => {
            setTimeout(() => {
                scrollUp();
                console.log("Scrolling to top...");
            }, 0);
        }
        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        }
    }, []);

    return null;
}
