import React from 'react';
import { CONTACT_LINKS, ContactLink } from '../data/contactInfo';
import {
  FacebookIcon, LinkedInIcon, InstagramIcon, RedditIcon, PhoneIcon, MailIcon, WhatsAppIcon, XIcon, MediumIcon
} from './BrandIcons';
import BrandMark from './BrandMark';

const ICONS: Record<ContactLink['id'], React.FC<{ className?: string }>> = {
  phone: PhoneIcon,
  email: MailIcon,
  whatsapp: WhatsAppIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  reddit: RedditIcon,
  x: XIcon,
  medium: MediumIcon,
};

const ICON_STYLES: Record<ContactLink['id'], string> = {
  phone: 'text-emerald-600 bg-emerald-50 border-emerald-100 group-hover:bg-emerald-100',
  email: 'text-[#2563EB] bg-[#2563EB]/5 border-[#2563EB]/10 group-hover:bg-[#2563EB]/10',
  whatsapp: 'text-[#25D366] bg-[#25D366]/10 border-[#25D366]/20 group-hover:bg-[#25D366]/20',
  facebook: 'text-[#1877F2] bg-[#1877F2]/5 border-[#1877F2]/10 group-hover:bg-[#1877F2]/10',
  linkedin: 'text-[#0A66C2] bg-[#0A66C2]/5 border-[#0A66C2]/10 group-hover:bg-[#0A66C2]/10',
  instagram: 'text-[#E1306C] bg-[#E1306C]/5 border-[#E1306C]/10 group-hover:bg-[#E1306C]/10',
  x: 'text-[#0F172A] bg-[#0F172A]/5 border-[#0F172A]/10 group-hover:bg-[#0F172A]/10',
  medium: 'text-[#0F172A] bg-[#0F172A]/5 border-[#0F172A]/10 group-hover:bg-[#0F172A]/10',
  reddit: 'text-[#FF4500] bg-[#FF4500]/5 border-[#FF4500]/10 group-hover:bg-[#FF4500]/10',
};

interface ConnectWithUsProps {
  variant?: 'cards' | 'compact';
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function ConnectWithUs({
  variant = 'cards',
  title = 'Connect With Us',
  subtitle,
  className = '',
}: ConnectWithUsProps) {
  if (variant === 'compact') {
    return (
      <div className={className}>
        {title && (
          <h4 className="flex items-center gap-1.5 text-[10px] font-sans font-semibold uppercase tracking-wider text-[#0F172A] mb-3">
            <BrandMark className="w-4 h-4 animate-logo-wobble shrink-0" />
            {title}
          </h4>
        )}
        <ul className="space-y-2.5 text-xs">
          {CONTACT_LINKS.map((link) => {
            const Icon = ICONS[link.id];
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  aria-label={`${link.label}: ${link.value}`}
                  className="group inline-flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] transition-colors duration-200"
                >
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-200 ${ICON_STYLES[link.id]}`}>
                    <Icon className="w-3 h-3" />
                  </span>
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                    {link.id === 'phone' || link.id === 'email' ? link.value : link.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <section className={className} aria-label="Connect with us">
      <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
        {title && (
          <h2 className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-semibold tracking-tight text-[#0F172A]">
            <BrandMark className="w-7 h-7 sm:w-8 sm:h-8 animate-logo-wobble shrink-0" />
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-sm text-[#64748B] leading-relaxed">{subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-4xl mx-auto">
        {CONTACT_LINKS.map((link) => {
          const Icon = ICONS[link.id];
          return (
            <a
              key={link.id}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              aria-label={`${link.label}: ${link.value}`}
              className="group relative flex flex-col items-center gap-2.5 p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] bg-white dark:bg-white shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#CBD5E1] transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
            >
              <span className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 ${ICON_STYLES[link.id]}`}>
                <Icon className="w-5 h-5" />
              </span>
              <span className="text-center space-y-0.5">
                <span className="block text-[11px] sm:text-xs font-semibold text-[#0F172A]">
                  {link.label}
                </span>
                <span className="block text-[9px] sm:text-[10px] text-[#94A3B8] truncate max-w-[100px]">
                  {link.value}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
