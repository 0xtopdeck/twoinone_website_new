export const COMPANY = {
  name: "Two in One LLC",
  shortName: "TWO IN ONE",
  tagline: "Expertise in Motion. One Trusted Standard.",
  email: "business@twoinone.llc",
  emailGeneral: "info@twoinone.llc",
  phone: "+96891221958",
  whatsapp: ["+96893888080", "+96893083080", "+96892924885"],
  address: {
    en: "Sultanate of Oman, Dhofar Governorate - Salalah",
    ar: "سلطنة عُمان، محافظة ظفار - صلالة",
  },
  cr: "1201497",
};

export const ACTIVITY_LINKS = [
  {
    key: "Tours",
    labelKey: "tours",
    href: "/tours",
  },
  {
    key: "Events",
    labelKey: "events",
    href: "/events",
  },
  {
    key: "FacilityServices",
    labelKey: "facilityServices",
    href: "/services",
  },
  {
    key: "Uniforms",
    labelKey: "uniforms",
    href: "/uniforms",
  },
  {
    key: "DigitalMarketing",
    labelKey: "digitalMarketing",
    href: "/digital-marketing",
  },
] as const;

export const LEGACY_COMMODITY_ROUTES = [
  "/agriculture",
  "/construction",
  "/sulfur",
  "/food",
] as const;
