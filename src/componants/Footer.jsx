import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-[#1F2937] p-10">
                  <div>
                  <h2 className="text-white font-medium text-3xl mb-2">CONTACT US</h2>
                    <h2 className='text-white font-medium text-xl'>Exit-28</h2>
                    <p className="text-white">
                        مركز الحرم, Western Ring Branch Rd, Alawali, Riyadh 14925 <br />
                        011 436 3198 <br />
                        12:30 - 1:00 <br />
                    </p>
                  </div>
                  <hr  className='mb-2'/>
                    <div>
                    <h2 className='text-white font-medium text-xl'>Shifa</h2>
                    <p className="text-white">
                        2655 Dirab Branch Rd, Ash Shifa, Riyadh 14713 <br />
                        056 436 8181 <br />
                        12:30 - 1:00 <br />
                    </p>
                    </div>
                    <hr  className='mb-2'/>
                    <h2 className='text-white font-medium text-xl'>Al-Muzahmiya</h2>
                    <p className="text-white">
                        King Abdulaziz Rd, Al-Muzahmiya 19652 <br />
                        011 523 6676 <br />
                        12:30 - 1:00 <br />
                    </p>
                </div>
                <div className="bg-[#111827] p-20">
                    <h2 className="font-medium text-3xl text-white">Follow US</h2>
                    <p className="text-white font-medium text-xl">Join us on social media</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-3xl hover:text-[#3b5998] transition-colors duration-300"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-3xl hover:text-[#E1306C] transition-colors duration-300"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-[#151515]">
                <p className="text-white font-medium text-xl">
                    Copyright © Indian Valley Restaurant. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
