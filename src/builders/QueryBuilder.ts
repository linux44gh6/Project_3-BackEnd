/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from "mongoose";

export class QueryBuilder<T>{
    public modelQuery:Query<T[],T>
    public query:Record<string,unknown>
    constructor(modelQuery:Query<T[],T>,query:Record<string,unknown>){
        this.modelQuery=modelQuery
        this.query=query
    }

    search(searchAbleFields: string[]) {
        const search = this?.query?.search as string;
        if (search) {
          this.modelQuery = this.modelQuery.find({
            $or: searchAbleFields.map(field => ({
              [field]: { $regex: search, $options: 'i' },
            })),
          } as FilterQuery<any>);
        }
        return this;
      }

        sort() {
            const sort =
              (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
            this.modelQuery = this.modelQuery.sort(sort as string);
            return this;
          }

          filter() {
            const queryObj = { ...this.query }; // copy
        
            // Filtering
            const excludeFields = ['searchTerm', 'sort',];
        
            excludeFields.forEach((el) => delete queryObj[el]);
        
            this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
        
            return this;
          }
    }
