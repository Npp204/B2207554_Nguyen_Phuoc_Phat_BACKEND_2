const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contacts");
    }
        //Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractContactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        // Xóa các trường undefined
        Object.keys(contact).forEach((key) => {
            if (contact[key] === undefined) delete contact[key];
        });

        return contact;
    }

    async create(payload) {
        const contact = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true } },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            //name: { $regex: new RegExp(new RegExp(name)), $options: "i" },
            name: { $regex: new RegExp(name, "i") }
        });
    }
}

module.exports = ContactService;