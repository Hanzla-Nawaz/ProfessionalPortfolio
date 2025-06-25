export default function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xl font-bold mb-2">Hanzla Nawaz</p>
          <p className="text-gray-400 mb-6">AI/ML Engineer • Building the future with artificial intelligence</p>
          <div className="flex justify-center space-x-6 mb-8">
            <button
              onClick={() => handleNavClick("#about")}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick("#projects")}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Projects
            </button>
            <button
              onClick={() => handleNavClick("#skills")}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Skills
            </button>
            <button
              onClick={() => handleNavClick("#contact")}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Contact
            </button>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400 text-sm">
              © 2024 Hanzla Nawaz. All rights reserved. Built with modern web technologies.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
