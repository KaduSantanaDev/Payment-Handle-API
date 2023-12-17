export enum Products {
  FULL_UPGRADE = 0,
  MONEY_100M = 1,
  MONEY_700M = 2,
  MONEY_1B = 3,
  UNLOCK_ALL = 4,
  LEVEL_UP_500 = 5,
  PACOTE_1B = 6,
  PACOTE_3B = 7,
  PACOTE_6B = 8,
  PACOTE_10B = 9,
  PACOTE_15B = 10,
  TRAJES_MOD_20 = 11
}

export type ProductType = {
  type: Products,
}
