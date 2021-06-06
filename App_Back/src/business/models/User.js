class User {    

    static nextId = 1

    constructor(data){
        this.name = data.name;
        this.lastname = data.lastname;
        this.email = data.email;
        this.inventory = data.inventory;
        this.id = nextId;
        
        nextId++        
    }
}

export default User