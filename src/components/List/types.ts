export interface GetGoodsListParams {
  /**
   * 目录id
   */
  categoryId?: number;
  /**
   * 第几页
   */
  page?: number;
  /**
   * 模糊查询
   */
  search?: string;
  /**
   * 每页几条数据
   */
  size?: number;
  /**
   * 用户名
   */
  userId?: number;
  [property: string]: any;
}

export interface AddGoodsParams {
  categoryId: string;
  description: string;
  name: string;
  picture: string;
  [property: string]: any;
}

export interface UpdateGoodsParams {
  categoryId: number;
  description: string;
  id: number;
  name: string;
  picture: string;
  [property: string]: any;
}
