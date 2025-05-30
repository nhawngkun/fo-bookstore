import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ContactPage = () => {
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Navbar />
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-7 py-20">
          {/* Đã xóa tiêu đề và nội dung trang liên hệ */}
          <div className="h-[60vh] flex items-center justify-center">
            <p className="text-gray-400 dark:text-gray-500 text-center">
              Nội dung trang đang được cập nhật...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
