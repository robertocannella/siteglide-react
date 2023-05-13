export default interface Listing {
    id: string;
    properties: {
      address: string;
      category_array: string[];
      enabled: boolean;
      expiry_date: number;
      location: {
        coordinates: [number, number];
        type: string;
      };
      meta_desc: null;
      meta_title: null;
      name: string;
      og_desc: null;
      og_image: string;
      og_title: null;
      og_type: null;
      og_url: null;
      release_date: number;
      secure_zone_array: string[];
      slug: string;
      twitter_type: null;
      webapp_field_3_1: string[];
      webapp_field_3_2: number;
      weighting: number;
    };
}