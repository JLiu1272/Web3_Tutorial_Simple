export type IContacts = {
    id: number; 
    name: string; 
    phone: string;
}

export type IContactCoin = {
    createContact(name: string, phone: string): void;
    count: () => Promise<number>;
    contacts: () => Promise<{
        [key: number]: IContacts;
    }>; 
}; 