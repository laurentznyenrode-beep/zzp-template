export type Content = {
  business: {
    name: string;
    shortName: string;
    tagline: string;
    owner: string;
    foundedYear: number;
    kvk: string;
    btw: string;
    phone: string;
    phoneRaw: string;
    email: string;
    address: {
      street: string;
      postalCode: string;
      city: string;
      country: string;
      lat: number;
      lng: number;
    };
  };
  trade: {
    type: string;
    typeCapital: string;
    typePlural: string;
    service: string;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logo: string;
    favicon: string;
    ogImage: string;
  };
  workArea: Array<{
    slug: string;
    name: string;
    intro: string;
  }>;
  usps: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  services: Array<{
    slug: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    icon: string;
    image: string;
  }>;
  reviews: Array<{
    name: string;
    city: string;
    rating: number;
    text: string;
    date: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    google?: string;
  };
  openingHours: Array<{
    day: string;
    open: string;
    close: string;
  }>;
  emergency: {
    enabled: boolean;
    phone: string;
    phoneRaw: string;
    label: string;
  };
  certifications: string[];
  about: {
    headline: string;
    story: string;
    photo: string;
    whyChoose: string[];
  };
};
