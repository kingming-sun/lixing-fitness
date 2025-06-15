// Export all components from different modules
export * from './layout';
export * from './home';
export * from './product';
export * from './payment';

// Default exports for backward compatibility
export { default as Header } from './layout/Header';
export { default as Footer } from './layout/Footer';
export { default as BlackFridayBanner } from './layout/BlackFridayBanner';

export { default as HeroSection } from './home/HeroSection';
export { default as ProgramsSection } from './home/ProgramsSection';
export { default as ProgramRecommender } from './home/ProgramRecommender';
export { default as Newsletter } from './home/Newsletter';

export { default as ProductDetail } from './product/ProductDetail';

export { default as StripeCheckout } from './payment/StripeCheckout'; 