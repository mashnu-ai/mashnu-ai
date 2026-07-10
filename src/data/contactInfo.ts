export const CONTACT_INFO = {
  phone: {
    display: '+91 96069 06817',
    tel: 'tel:+919606906817',
    whatsapp: 'https://wa.me/919606906817',
  },
  email: {
    display: 'mashnuai@gmail.com',
    mailto: 'mailto:mashnuai@gmail.com',
  },
};

export interface ContactLink {
  id: 'phone' | 'email' | 'whatsapp' | 'facebook' | 'linkedin' | 'instagram' | 'reddit' | 'x' | 'medium';
  label: string;
  value: string;
  href: string;
  external: boolean;
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: 'phone',
    label: 'Call Us',
    value: CONTACT_INFO.phone.display,
    href: CONTACT_INFO.phone.tel,
    external: false,
  },
  {
    id: 'email',
    label: 'Email Us',
    value: CONTACT_INFO.email.display,
    href: CONTACT_INFO.email.mailto,
    external: false,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: CONTACT_INFO.phone.display,
    href: CONTACT_INFO.phone.whatsapp,
    external: true,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    value: 'Follow us',
    href: 'https://www.facebook.com/profile.php?id=61591451955462&sk=grid',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'Connect with us',
    href: 'https://www.linkedin.com/in/mashnu-a-i-434a10420/?skipRedirect=true',
    external: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: 'Follow us',
    href: 'https://www.instagram.com/mashnuai/',
    external: true,
  },
  {
    id: 'reddit',
    label: 'Reddit',
    value: 'Join the discussion',
    href: 'https://www.reddit.com/user/Correct-Crab7027/',
    external: true,
  },
  {
    id: 'x',
    label: 'X',
    value: 'Follow us',
    href: 'https://x.com/mashnu_AI',
    external: true,
  },
  {
    id: 'medium',
    label: 'Medium',
    value: 'Read our posts',
    href: 'https://medium.com/@mashnuai',
    external: true,
  },
];
