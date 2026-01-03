import francis from '../assets/contact/francis.jpg';
import hai from '../assets/contact/hai.jpg';

import { FaFacebook } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
function Contact() {
    return (
        <section className="grow flex flex-col items-center px-4 py-10">
            <h1 className="text-4xl font-extrabold mb-6 font-serif">Contact Us</h1>
            <p className="text-lg text-center max-w-2xl mb-5">
                We’d love to hear from you! Feel free to reach out for any inquiries, feedback, or to learn more about our chess club and events.
                You can contact us via email or phone, and join our community on Zalo and Facebook.
            </p>
            <div className="flex items-center gap-5 mb-5">
                <a
                    href="https://zalo.me/g/owpzpk136"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Zalo"
                    className="hover:text-club-secondary transition-transform hover:scale-110 pr-5"
                >
                    <SiZalo className="h-10 w-10 md:h-15 md:w-15" />
                </a>

                <a
                    href="https://www.facebook.com/share/17ovBRMUDA/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="hover:text-club-secondary transition-transform hover:scale-110"
                >
                    <FaFacebook className="h-10 w-10 md:h-15 md:w-15" />
                </a>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center w-full max-w-6xl">

                {/* Card 1 */}
                <div className="bg-club-secondary rounded-xl shadow-xl p-10 w-full max-w-2xl text-center border min-h-120">
                    <h2 className="text-2xl font-bold mb-4">General Contact</h2>
                    <img src={francis} alt="Francis' Profile Picture" className="w-64 h-64 mx-auto mb-4 rounded-full" loading='lazy' />
                    <p className="text-club-dark text-xl mb-2">
                        <strong>Email:</strong>
                        <a href="mailto:francislholland@gmail.com" className="ml-1 hover:underline">
                            francislholland@gmail.com
                        </a>
                    </p>
                    <p className="text-club-dark text-xl mb-2">
                        <strong>Phone:</strong>
                        <a href="tel:+84333009587" className="ml-1 hover:underline">
                            +84 333 009 587 (Zalo/WhatsApp)
                        </a>
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-club-secondary rounded-xl shadow-xl p-10 w-full max-w-2xl text-center border min-h-120">
                    <h2 className="text-2xl font-bold mb-4">Club & Events</h2>
                    <img src={hai} alt="Hanoi Lucky Chess Club" className="w-64 h-64 mx-auto mb-4 rounded-full" loading='lazy' />
                    <p className="text-club-dark text-xl mb-2">
                        <strong>Email:</strong>
                        <a href="mailto:siegfried.duong@gmail.com" className="ml-1 hover:underline">
                            siegfried.duong@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Contact;
