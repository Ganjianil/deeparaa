import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { services as serviceCatalog } from "@/components/Services";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Packages", href: "/packages" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const serviceLabels: Record<string, string> = {
  "web-design": "Website Design",
  "mobile-app": "Mobile Application",
  "video-production": "Video Production",
  aeo: "SEO / AEO",
  "youtube-seo": "YouTube SEO",
  aio: "AIO",
  "digital-marketing": "Digital Marketing",
  "ecommerce-app": "Ecommerce Application",
  "software-development": "Software Development",
  geo: "GEO",
  "youtube-ads": "YouTube Ads",
  sxo: "SXO",
};

const footerServices = serviceCatalog.map((service) => ({
  label: serviceLabels[service.id] ?? service.title,
  href: service.href,
}));

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/", icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/", icon: FaInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: FaLinkedinIn },
  { label: "YouTube", href: "https://www.youtube.com/", icon: FaYoutube },
];

export function Footer() {
  return (
    <footer id="contact" className="premium-footer">
      <div className="premium-footer__glow" aria-hidden="true" />
      <div className="premium-footer__grain" aria-hidden="true" />

      <div className="premium-footer__inner">
        <div className="premium-footer__grid">
          {/* Brand */}
          <div className="premium-footer__brand">
            <Link
              href="/"
              aria-label="Deepara Solutions home"
              className="premium-footer__logo"
            >
              <Image
                src="/deep.png"
                alt="Deepara Solutions"
                width={180}
                height={54}
                className="h-auto w-[128px] object-contain sm:w-[152px]"
              />
            </Link>
            <p className="premium-footer__tagline">
              A Hyderabad digital studio crafting websites, products, and growth
              systems with quiet precision.
            </p>
            <div className="premium-footer__socials">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="premium-footer__social"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="premium-footer__heading">Explore</h3>
            <ul className="premium-footer__links">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="premium-footer__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="premium-footer__services-col">
            <h3 className="premium-footer__heading">Services</h3>
            <div className="premium-footer__services">
              {footerServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="premium-footer__service"
                >
                  <span>{service.label}</span>
                  <ArrowUpRight
                    className="premium-footer__service-icon"
                    size={14}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="premium-footer__heading">Visit &amp; reach</h3>
            <div className="premium-footer__contact">
              <div className="premium-footer__contact-row">
                <span className="premium-footer__contact-icon" aria-hidden>
                  <MapPin size={16} strokeWidth={1.8} />
                </span>
                <p>
                  Flat No. 2b, Begumpet, Near Metro, Greenlands, Hyderabad,
                  Telangana 500082
                </p>
              </div>
              <a
                href="tel:+919985888237"
                className="premium-footer__contact-row premium-footer__contact-row--link"
              >
                <span className="premium-footer__contact-icon" aria-hidden>
                  <Phone size={16} strokeWidth={1.8} />
                </span>
                <span>(+91) 9985888237</span>
              </a>
              <a
                href="mailto:info@deeparasolutions.com"
                className="premium-footer__contact-row premium-footer__contact-row--link"
              >
                <span className="premium-footer__contact-icon" aria-hidden>
                  <Mail size={16} strokeWidth={1.8} />
                </span>
                <span>info@deeparasolutions.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="premium-footer__bar">
        <p>© {new Date().getFullYear()} Deepara Solutions. All rights reserved.</p>
        <p className="premium-footer__bar-note">Crafted in Hyderabad</p>
      </div>
    </footer>
  );
}
