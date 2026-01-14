export const properties = [
  {
    "propertyID": "311134",
    "organizationID": "311686",
    "propertyName": "Azzurro Boutique Hotel Surry Hills",
    "propertyImage": "https://h-img2.cloudbeds.com/uploads/311134/3_gallery~~65cdea3ab275e.jpeg",
    "propertyDescription": "<div>Welcome to Sydney's first all-female hostel. Our team is dedicated to bringing fresh ideas to life, ensuring your stay is comfortable and homely.&nbsp;<br></div>We prioritize quality, offering delicious breakfast and dinner with daily cleaning services included in your stay. Whether you're travelling solo or with a group, we've created a welcoming space for you in Sydney. Understanding the challenges of settling into a new city, we aim to provide something different from the usual hotel experience.<br>We hope you enjoy our freshly prepared, home-cooked meals, and feel the comfort of a home away from home. We look forward to making your stay in Sydney enjoyable and comfortable.",
    "propertyTimezone": "Australia/Sydney",
    "propertyCurrency": {
        "currencyCode": "AUD",
        "currencySymbol": "$",
        "currencyPosition": "before"
    }
  },
  {
    "propertyID": "311272",
    "organizationID": "311686",
    "propertyName": "Azzurro Pod Hotel Potts Point",
    "propertyImage": "https://h-img1.cloudbeds.com/uploads/311272/whatsapp_image_2023-10-17_at_05.59.54_gallery~~65cdd91845120.jpeg",
    "propertyDescription": "<span>Welcome to Azzurro Pod Hotels, where we blend innovation with hospitality. Our team is dedicated to bringing fresh ideas to life, ensuring your stay is comfortable and homely.&nbsp;<br>We prioritize quality, offering delicious breakfast and dinner with daily cleaning services included in your stay. Whether you're travelling solo or with a group, we've created a welcoming space for you in Sydney. Understanding the challenges of settling into a new city, we aim to provide something different from the usual hotel experience.<br>We hope you enjoy our freshly prepared, home-cooked meals, and feel the comfort of a home away from home. We look forward to making your stay in Sydney enjoyable and comfortable.</span>",
    "propertyTimezone": "Australia/Sydney",
    "propertyCurrency": {
        "currencyCode": "AUD",
        "currencySymbol": "$",
        "currencyPosition": "before"
    }
  },
  {
      "propertyID": "317399",
      "organizationID": "317399",
      "propertyName": "Lisa demo account",
      "propertyImage": "",
      "propertyDescription": "",
      "propertyTimezone": "America/Los_Angeles",
      "propertyCurrency": {
          "currencyCode": "USD",
          "currencySymbol": "$",
          "currencyPosition": "before"
      }
  }
];

export const getPropertiesMap = (): Record<string, any> => {
  return properties.reduce((acc: Record<string, any>, property) => {
    acc[property.propertyID] = property;
    return acc;
  }, {});
};