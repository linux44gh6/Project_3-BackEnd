/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query} from "mongoose";

export class QueryBuilder<T>{
    public modelQuery:Query<T[],T>
    public query:Record<string,unknown>
    constructor(modelQuery:Query<T[],T>,query:Record<string,unknown>){
        this.modelQuery=modelQuery
        this.query=query
    }

    search(searchableFields: string[]) {
      const searchTerm = this?.query?.search
      if (searchTerm) {
        const orCondition = searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        }));
        this.modelQuery = this.modelQuery.find({ $or: orCondition });
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
         console.log(queryObj);
            // Filtering
            const excludeFields = ['search','sortBy','sortOrder'];
        
            excludeFields.forEach((el) => delete queryObj[el]);

            if (queryObj.filter) {
              queryObj.author = queryObj.filter; 
              delete queryObj.filter;
            }
            this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
        
            return this;
          }
    }
