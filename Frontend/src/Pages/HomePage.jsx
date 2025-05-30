import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import FreeBook from "../Components/FreeBook";
import Navbar from "../Components/Navbar";
import RecentBooks from "../Components/RecentBooks";

const HomePage = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <FreeBook />
            <RecentBooks />
            <Footer />
        </>
    )
};

export default HomePage;
