//Padrão de acesso a dados que prega que todo e qualquer acesso a dados
//de um domínio específico, deve ser feito para uma classe expecífica, de 
//acordo com seu contexto. 

class UserRepository {
    constructor({ dbConnection }) {
        this.dbConnection = dbConnection
    }
    
    async find(query) {
        return this.dbConnection.find(query)
    }
}
export default UserRepository;