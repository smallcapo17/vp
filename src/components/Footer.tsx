import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

export function Footer() {
    return (
      <footer className="bg-gray-100 text-gray-800 py-4 mt-16">
        <div className="max-w-full px-6 mx-auto text-left">
          <h2 className="text-xl font-semibold mb-2">Get in touch</h2>
          <hr className="border-gray-300 my-4" />
          <p className="mb-4">
            Contact us at:{" "}
            <a
              href="mailto:info@victorious.com"
              className="underline hover:text-gray-600"
            >
              info@victorious.com
            </a>
          </p>
          <p className="mb-2">Follow us:</p>
          <div className="mt-4 flex gap-4">
            <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-500 transition-colors"
            >
                <FaFacebookF size={24} />
            </a>
            <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-500 transition-colors"
            >
                <FaInstagram size={24} />
            </a>
            <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-500 transition-colors"
            >
                <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </footer>
    );
  }