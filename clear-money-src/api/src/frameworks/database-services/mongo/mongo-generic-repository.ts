import { Model } from 'mongoose';
import { IGenericRepository } from 'src/core';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  getAll(): Promise<T[]> {
    return this._repository.find().populate(this._populateOnFind).exec();
  }

  get(id: any): Promise<T | null> {
    return this._repository.findById(id).populate(this._populateOnFind).exec() as Promise<T | null>;
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  update(id: string, item: T) : Promise<T>{
    return this._repository.findByIdAndUpdate(id, item);
  }

  delete(id:string): Promise<T> {
    return this._repository.findByIdAndDelete(id);
  }

  getOneBySpecificColumn(columnName:string, columnValue:any): Promise<T> {
    const query = { [columnName]: columnValue } as any;
    return this._repository.findOne(query).populate(this._populateOnFind).exec() as Promise<T | null>;
  }

  getAllBySpecificColumn(columnName:string, columnValue:any): Promise<T[]> {
    const query = { [columnName]: columnValue } as any;
    return this._repository.find(query).populate(this._populateOnFind).exec()
  }
}
