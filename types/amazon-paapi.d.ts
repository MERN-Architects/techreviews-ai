declare module 'amazon-paapi' {
  export class ProductAdvertisingAPIv1 {
    constructor(config: {
      accessKey: string;
      secretKey: string;
      partnerTag: string;
      partnerType: string;
      region: string;
    });

    getItems(params: {
      ItemIds: string[];
      Resources: string[];
    }): Promise<any>;

    searchItems(params: {
      Keywords: string;
      SearchIndex: string;
      ItemCount: number;
      Resources: string[];
    }): Promise<{
      ItemsResult?: {
        Items: Array<{
          ASIN: string;
          DetailPageURL: string;
          ItemInfo?: {
            Title?: {
              DisplayValue: string;
            };
            Features?: {
              DisplayValues: string[];
            };
            ProductInfo?: any;
          };
          Offers?: {
            Listings: Array<{
              Price: {
                Amount: number;
              };
            }>;
          };
          Images?: {
            Primary?: {
              Large?: {
                URL: string;
              };
            };
          };
        }>;
      };
    }>;
  }
} 