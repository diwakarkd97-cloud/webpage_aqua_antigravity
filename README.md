#  AquaCart — Specialized Aquarium E-Commerce Platform

**AquaCart** is a specialized, modern e-commerce web application engineered for aquarists and hobbyists. It offers certified captive-bred tropical & marine fish, museum-grade rimless glass aquariums, high-performance canister filters, daily fish nutrition, and natural hardscaping materials across India.

Built with **React 18**, **Vite**, and **React Router v6**, AquaCart replicates the high-converting user experience of premier e-commerce platforms while incorporating specialized domain logic for live aquatic animal transport and tank chemistry.

---

##  Key Features

###  Core E-Commerce Experience
- **Sticky Glassmorphic Header:** Real-time search bar with auto-suggestions, category quick-filters, delivery pincode selector, and dynamic absolute-positioned cart badge.
- **5 Core Pages:** Seamless navigation across Home, Products, Product Details, Cart, and Checkout.
- **Faceted Product Filtering:** Instant category pills (`Live Fish`, `Tanks`, `Filters`, `Food`, `Decor`), live search matching, and dynamic sorting (`Featured`, `Price: Low-to-High`, `Price: High-to-Low`, `Top Rated`).
- **Persistent Cart Engine:** Powered by React's `useReducer` and synchronized with `localStorage`. Automatically calculates subtotal, discounts, and real-time shipping thresholds (**FREE delivery on orders above ₹1,500**).
- **Multi-Step Checkout Flow:** Clean delivery address form with Indian phone and 6-digit PIN code validation, oxygen express transit options, and multiple payment methods (`UPI`, `Credit/Debit Card`, `Cash on Delivery`).

###  Specialized Aquarium Features
- **100% Live Arrival Guarantee Badge:** Automatic trust badges for all live livestock packaged in temperature-controlled oxygen bags.
- **Biotope Compatibility Checker:** Algorithmic species temperament analysis that alerts customers if aggressive species (e.g., Cichlids, Bettas) cannot be kept with peaceful community fish.
- **Interactive Tank Volume Calculator:** Real-time dimension calculator ($L \times W \times H$ in inches) returning volume in **US Gallons**, **Liters**, and estimated **filled water weight (kg)**.

###  Responsive & Neat UI
- **Mobile-First Design:** Fully responsive layout with sliding drawer navigation on mobile and a 4-column adaptive CSS Grid on desktop.
- **Micro
