import { motion } from "motion/react";
import { Mail, Github, Linkedin, Phone, MapPin } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "mosesmuuo@gmail.com",
    href: "mailto:mosesmuuo@gmail.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+254 712 345 678",
    href: "tel:+254712345678"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nairobi, Kenya",
    href: null
  }
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/dev-star-mo",
    username: "@dev-star-mo"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/moses-muuo",
    username: "Moses Muuo"
  }
];

export function ContactTab() {
  return (
    <div className="space-y-20">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Let's Connect</h2>
        <div className="w-16 h-1 bg-primary mb-8"></div>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          I'm always interested in hearing about new opportunities, collaborations, 
          or just having a chat about IoT and backend development. Feel free to reach out!
        </p>
      </motion.section>

      {/* Contact Information */}
      <section>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold mb-8"
        >
          Contact Information
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <info.icon className="size-6" />
              </div>
              <h4 className="font-semibold mb-2">{info.label}</h4>
              {info.href ? (
                <a
                  href={info.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-muted-foreground text-sm">{info.value}</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold mb-8"
        >
          Connect on Social Media
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 border border-border rounded-lg hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-colors">
                  <social.icon className="size-7" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{social.label}</h4>
                  <p className="text-muted-foreground text-sm">{social.username}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center p-12 border border-border rounded-lg bg-gradient-to-br from-primary/5 to-transparent"
      >
        <h3 className="text-2xl font-bold mb-4">Ready to start a project?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Whether you need IoT solutions, backend development, or consultation on your next project, 
          I'm here to help bring your ideas to life.
        </p>
        <motion.a
          href="mailto:mosesmuuo@gmail.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-shadow"
        >
          <Mail className="size-5" />
          Send me an email
        </motion.a>
      </motion.section>
    </div>
  );
}
