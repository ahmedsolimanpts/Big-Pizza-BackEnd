export interface CouponInterface {
  name?: string;

  branches?: string[];

  from?: Date;

  to?: Date;

  quantity?: number;

  percent_discount?: number;
}
