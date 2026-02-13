import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { HomeTab } from "./components/HomeTab";
import { AboutTab } from "./components/AboutTab";
import { ExperienceTab } from "./components/ExperienceTab";
import { ContactTab } from "./components/ContactTab";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab />;
      case "about":
        return <AboutTab />;
      case "experience":
        return <ExperienceTab />;
      case "contact":
        return <ContactTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      {/* Menu Toggle Button */}
      <motion.button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 z-50 size-12 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-muted transition-all shadow-lg hover:shadow-xl"
        animate={{ 
          left: isSidebarOpen ? '17rem' : '1.5rem',
          rotate: isSidebarOpen ? 90 : 0
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ 
            rotate: isSidebarOpen ? 180 : 0,
            scale: isSidebarOpen ? 0.9 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          {isSidebarOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </motion.div>
      </motion.button>

      <main 
        className="min-h-screen p-12 transition-all duration-300"
        style={{ marginLeft: isSidebarOpen ? '16rem' : '0' }}
      >
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}