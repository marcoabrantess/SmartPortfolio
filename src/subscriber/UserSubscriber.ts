import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { User } from '../models/User';
import { Portfolio } from '../models/Portfolio';
import { getRepository } from 'typeorm';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async afterInsert(event: InsertEvent<User>) {
    const userRepository = getRepository(User);
    const portfolioRepository = getRepository(Portfolio);

    const portfolio = new Portfolio();
    portfolio.user = event.entity;
    portfolio.assets = []; // Inicializar com uma lista vazia de ativos
    portfolio.transactions = []; // Inicializar com uma lista vazia de transações

    await portfolioRepository.save(portfolio);

    // Atualiza o usuário com o novo portfólio
    event.entity.portfolio = portfolio;
    await userRepository.save(event.entity);
  }
}
