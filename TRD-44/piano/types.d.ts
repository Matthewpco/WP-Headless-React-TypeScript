export interface IPianoUser {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IUserData {
  options?: {
    jobTitle: string[];
    jobIndustry: string[];
    jobRole: string[];
    country: string[];
    region: string[];
  },
  billingAddress?: {
    city?: string;
    country?: string;
    firstName?: string;
    lastName?: string;
    region?: string;
    streetAddress1?: string;
    streetAddress2?: string;
    zip?: string;
  },
  personalDetails?: {
    firstName?: string;
    lastName?: string;
    createDate: Date;
    image1?: string;
    personalName?: string;
    resetPasswordEmailSent?: boolean;
    uid: string;
    company?: string;
    jobIndustry?: string;
    jobRole?: string;
    jobTitle?: string;
    listingPublicBetaOptin?: string;
    phone?: string;
    email?: string;
  },
  trdPro?: {
    brokerage?: string;
    brokerageSide?: string;
    launchGroup?: string;
    markets?: string;
    onboarding?: string;
    propertiesRetain?: string;
    role?: string;
    rolePrimary?: string;
    sectors?: string;
  },
  shippingAddress?: {
    city?: string;
    country?: string;
    firstName?: string;
    lastName?: string;
    region?: string;
    streetAddress1?: string;
    streetAddress2?: string;
    zip?: string;
  },
  sailthru?: {
    chicagodaily?: string;
    chicagoweekly?: string;
    commercialweekly?: string;
    dailydirt?: string;
    futurecity?: string;
    hamptonsweekly?: string;
    losangelesdaily?: string;
    losangelesweekly?: string;
    nationalweekly?: string;
    newyorkdaily?: string;
    newyorkweekly?: string;
    residentialweekly?: string;
    sanfranciscoweekly?: string;
    sid?: string;
    southfloridadaily?: string;
    southfloridaweekly?: string;
    texasweekly?: string;
    trdataretailleases?: string;
    tristateweekly?: string;
  },
}

export interface IBillingHistoryData {
  name: string;
  paymentDate: Date;
  paymentMethod: string;
  price: number;
  status: string;
}

export interface ISubscriptionData {
  rid: string;
  isExpired: boolean;
  isNextBilling: boolean;
  name: string;
  hasPrint: boolean;
  billingPlan: string;
  nextBillDate: Date;
}

export interface IGiftData {
  name: string;
  isPrint: boolean;
  isDelivered: boolean;
  recipient: string;
  price: string;
  redeemedDate: string;
  isExpired: boolean;
  timeTitle: string;
  timeText: string;
}
