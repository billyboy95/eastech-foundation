/* Public config for EASTC Foundation NPC.
   Swap placeholders here. This file is served to every visitor.
   Leave secrets and bank details as placeholders. Do not paste a live Yoco secret key. */
window.EASTC_CONFIG = {
  payments: {
    provider: "yoco",
    /* Test mode is on. The page will not open a live Yoco charge while this is true. */
    testMode: true,
    /* Yoco app → Sales → Payment Gateway. Public key may later be used by a server checkout. */
    YOCO_PUBLIC_KEY: "pk_test_PLACEHOLDER",
    /* Server only. The browser never sends this value. Keep the placeholder in this public file. */
    YOCO_SECRET_KEY: "sk_test_PLACEHOLDER",
    /* Yoco online payment page, for example https://pay.yoco.com/your-page — not a guessed URL. */
    YOCO_PAYMENT_LINK_URL: "https://pay.yoco.com/PLACEHOLDER",
    /* Optional server that creates a Yoco Checkout and returns { redirectUrl, processingMode }.
       The server reads the secret key from its own environment. Leave blank until that exists. */
    checkoutEndpoint: "",
    currency: "ZAR",
    minAmountZar: 2
  },
  eft: {
    accountName: "PLACEHOLDER — account name to be confirmed",
    bankName: "PLACEHOLDER — bank to be confirmed",
    accountNumber: "PLACEHOLDER — account number to be confirmed",
    branchCode: "PLACEHOLDER — branch code to be confirmed",
    accountType: "PLACEHOLDER — account type to be confirmed"
  },
  contact: {
    /* POST JSON here. Empty means the form uses mailto. */
    endpoint: "",
    mailto: "info@eastcfoundation.org.za",
    email: "info@eastcfoundation.org.za",
    campusEmail: "queries@eastc.co.za",
    phoneDisplay: "011 394 1488",
    phoneTel: "+27113941488",
    mobileDisplay: "082 605 1134",
    mobileTel: "+27826051134",
    address: "43 Maxwell Street, Kempton Park",
    /* No WhatsApp number is published on this site. Leave blank until one is confirmed. */
    whatsappE164: ""
  },
  departments: [
    {
      name: "Admissions",
      email: "",
      phone: "",
      note: "No admissions email or direct number is published on this site. Academic admissions are referred to EASTECH Institute."
    },
    {
      name: "Finance",
      email: "",
      phone: "",
      note: "No finance email or direct number is published on this site."
    },
    {
      name: "Student support",
      email: "",
      phone: "",
      note: "No student-support email or direct number is published on this site."
    },
    {
      name: "Management",
      email: "",
      phone: "",
      note: "No management email or direct number is published on this site."
    }
  ],
  leadership: {
    ceo: {
      name: "To be confirmed",
      title: "Chief Executive Officer",
      image: "assets/img/leadership/ceo-placeholder.svg",
      imageAlt: "Placeholder graphic for the Foundation Chief Executive Officer. Not a photograph of a person."
    },
    managingDirector: {
      name: "To be confirmed",
      title: "Managing Director",
      image: "assets/img/leadership/md-placeholder.svg",
      imageAlt: "Placeholder graphic for the Foundation Managing Director. Not a photograph of a person."
    }
  }
};
