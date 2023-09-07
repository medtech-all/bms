export interface IService<T> {

    find(): Promise<T[]>;
    findById(id: string): Promise<T>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T>;
    delete(id: string): Promise<void>;
    findOne(where: any): Promise<T>

}