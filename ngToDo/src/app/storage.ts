module app.common {

    "use strict";

    export class Storage implements IStorage {

        constructor(private storageId: string) {

        }

        public instance = (storageId: string) => {
            return new Storage(storageId);
        }

        public get = () => {
            return JSON.parse(localStorage.getItem(this.storageId) || "[]");
        }

        public getByName = (params: INameValuePair) => {
            var items = JSON.parse(localStorage.getItem(this.storageId) || "[]");

            var storageItem = null;

            items.forEach((item:any) => {
                if (params.name === item.name) {
                    storageItem = item;
                }
            });

            return storageItem;
        }

        public put = (params: INameValuePair) => {
            var items = JSON.parse(localStorage.getItem(this.storageId) || "[]");

            var itemExist = false;

            items.forEach((item: any) => {
                if (params.name === item.name) {
                    itemExist = true;
                    item.value = params.value;
                    item.category = params.category;
                    localStorage.setItem(this.storageId, JSON.stringify(items));
                }
            });

            if (!itemExist) {
                items.push(params);
                localStorage.setItem(this.storageId, JSON.stringify(items));
            }
        }

    }
} 