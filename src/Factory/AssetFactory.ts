import { Asset } from '../models/Asset';
import { User } from '../models/User';

export abstract class AssetFactory {
  static createOrUpdateAsset(
    user: User,
    assetData: { name: string; price: number; symbol: string },
    quantity: number,
    existingAsset?: Asset
  ): Asset {
    if (existingAsset) {
      const totalCurrentValue = existingAsset.currentValue * existingAsset.quantity;
      const totalNewValue = assetData.price * quantity;
      const newQuantity = existingAsset.quantity + quantity;

      const newAveragePrice = (totalCurrentValue + totalNewValue) / newQuantity;

      existingAsset.currentValue = newAveragePrice;
      existingAsset.quantity = newQuantity;

      return existingAsset;
    } else {      
      const newAsset = new Asset();
      newAsset.code = assetData.symbol;
      newAsset.currentValue = assetData.price;
      newAsset.name = assetData.name;
      newAsset.yield = 0;
      newAsset.quantity = quantity;
      newAsset.portfolio = user.portfolio;
      return newAsset;
    }
  }
}
