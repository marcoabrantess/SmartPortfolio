// import { AppDataSource } from "../data-source";
// import { User } from "../models/User";
// import { Asset } from "../models/Asset";
// import { Portfolio } from '../models/Portfolio';


// interface updateAssetParams {
//     userId: string;
//     asset: Asset;
//     quantity: number;
// }

// export class UpdateAssetService {
//     static async execute({ userId, assetId, quantity }: updateAssetParams): Promise<void> {
//         const userRepository = AppDataSource.getRepository(User);
//         const portfolioRepository = AppDataSource.getRepository(Portfolio);
//         const assetRepository 

//         const user = await userRepository.findOne({
//             where: { id: userId },
//             relations: ['portfolio']
//         });

//         if (!user) {
//             throw new Error('Usuário não encontrado');
//         }

//         const portfolio = user.portfolio;

//         if (!portfolio) {
//             throw new Error('Portfólio não encontrado');
//         }

//         const asset = await userRepository.findOne({where: { id: assetId }});
//     }
// }