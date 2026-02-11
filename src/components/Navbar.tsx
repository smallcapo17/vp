export function Navbar() {
    return (
      <nav className="w-full bg-espresso text-gold py-4 px-6 shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-bold text-xl">VP</span>
          <div className="space-x-6">
            <a href="#videos" className="hover:text-gold/80">Videos</a>
            <a href="#events" className="hover:text-gold/80">Events</a>
            <a href="#contact" className="hover:text-gold/80">Contact</a>
          </div>
        </div>
      </nav>
    );
  }  