class Acao {
    constructor(nome, code, currentValue, type, name, averagePurchagePrice, quantity, transactions) {
        this.nome = nome;
        this.code = code;
        this.currentValue = currentValue;
        this.type = type;
        this.name = name;
        this.averagePurchagePrice = averagePurchagePrice;
        this.quantity = quantity;
        this.transactions = transactions;
    }
  
    // Você pode adicionar métodos para manipular os dados, se necessário
    getFormattedValue() {
      return `R$ ${this.valor.toFixed(2)}`;
    }
  
    getFormattedDate() {
      return new Date(this.data).toLocaleDateString();
    }
  }
  
  export default Acao;