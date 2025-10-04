const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
                <aside>
                    <p>Desgined and Developed by: <a href="https://github.com/Suprio-Das" target="_blank" className="text-blue-600 font-semibold">Suprio Das</a></p>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by <span className="text-blue-600 font-semibold">Dept. of CSE, Port City International University</span></p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;