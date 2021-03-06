import { api } from '../services/api'

export interface ProductSearchParams {
  saleCategories?: number;
  channel?: string;
  terminal?: string;
  saleStatuses?: string;
  _sort?: string;
  _order?: 'asc' | 'desc';
  _page: number;
  _limit?: number;
  publishStatus?: boolean;
  q?: string;
}

export interface ProductPrice {
  supplierSalePrice: number;
  sellPrice: number;
}

export interface ProductPromotionPrice {
  channel: string;
  terminal: string;
  finalPrice: number;
  promotionPrice?: number;
  bestPrice: number;
  flashSalePrice?: number;
}

export interface ProductImage {
  url: string;
  priority: number;
}

export interface ProductStatus {
  publish: boolean;
  sale: 'ngung_kinh_doanh' | 'hang_ban';
}

export interface ProductAttributeValue {
  value: string;
  optionId: number;
}

export interface ProductAttribute {
  code: string;
  values: Array<ProductAttributeValue>;
}

export interface ProductAttributeGroup {
  name: string;
  value: string;
}

export interface ProductSaleCategory {
  id: number;
}

export interface Product {
  sku: string;
  displayName: string;
  price: ProductPrice;
  promotionPrices: Array<ProductPromotionPrice>;
  images: Array<ProductImage>;
  status: ProductStatus;
  attributes: Array<ProductAttribute>;
  attributeGroups: Array<ProductAttributeGroup>;
  saleCategories: Array<ProductSaleCategory>;
}

export interface SearchResponseExtra {
  totalItems: number;
  page: number;
  pageSize: number;
}

export interface ProductSearchResponse {
  result: {
    products: Array<Product>;
  };
  extra: SearchResponseExtra;
}

const defaultSearchParams: ProductSearchParams = {
  saleCategories: 613,
  channel: 'pv_online',
  terminal: 'phongvu',
  saleStatuses: 'hang_ban,hang_dat_truoc,hang_sap_het,hang_moi,hang_trung_bay,hang_thanh_ly',
  _sort: 'saleStatuses||hang_ban|hang_dat_truoc|hang_sap_het|hang_moi||hang_trung_bay|hang_thanh_ly||ngung_kinh_doanh',
  _order: 'asc',
  _page: 1,
  _limit: 20,
  publishStatus: true,
}

export function search(params: ProductSearchParams): Promise<ProductSearchResponse> {
  return api.get('/search', Object.assign({}, defaultSearchParams, params)).then(({ ok, data, problem }) => {
    if (!ok) {
      return Promise.reject(problem)
    }
    return Promise.resolve(data as ProductSearchResponse)
  })
}

export function get(sku: string): Promise<Product> {
  return api.get(`/products/${sku}`, {
    channel: 'pv_online',
    terminal: 'phongvu',
  }).then(({ ok, data, problem }) => {
    if (!ok) {
      return Promise.reject(problem)
    }
    return Promise.resolve((data as any).result.product as Product)
  })
}
