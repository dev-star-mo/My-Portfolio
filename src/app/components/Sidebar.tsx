import { motion } from "motion/react";
import { Home, User, Briefcase, Mail } from "lucide-react";
import profileImage from "@/assets/fd368df85e6222ad53e93a39fee71989489c4af6.png";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About Me", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{
        x: isOpen ? 0 : -256,
        opacity: 1
      }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-40 overflow-y-auto"
    >
      <div className="p-8 border-b border-border">
        <div className="size-32 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
          <img
            src={profileImage}
            alt="Moses Muuo"
            className="size-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-center mb-1">Moses Muuo</h2>
        <p className="text-sm text-muted-foreground text-center">Backend/IoT Engineer</p>
      </div>

      <nav className="flex-1 p-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  // Auto-close sidebar on mobile after navigation
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                <item.icon className="size-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-border text-xs text-muted-foreground text-center">
        © {new Date().getFullYear()} Moses Muuo
      </div>
    </motion.aside>
  );
}