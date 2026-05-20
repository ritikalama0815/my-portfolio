import BubbleMenu from './BubbleMenu';

const navItems = [
  {
    label: 'home',
    to: '/',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' },
  },
  {
    label: 'about',
    to: '/about',
    ariaLabel: 'About Me',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' },
  },
  {
    label: 'projects',
    to: '/projects',
    ariaLabel: 'Projects and Research',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' },
  },
  {
    label: 'arts',
    to: '/gallery',
    ariaLabel: 'arts',
    rotation: 8,
    hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' },
  },
  {
    label: 'contact',
    to: '/contact',
    ariaLabel: 'Contact Me',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' },
  },
];

const Navbar = () => (
  <BubbleMenu
    items={navItems}
    menuAriaLabel="Toggle navigation"
    menuBg="#ffffff"
    menuContentColor="#111111"
    useFixedPosition
    animationEase="back.out(1.5)"
    animationDuration={0.5}
    staggerDelay={0.12}
  />
);

export default Navbar;
