module app.common {

    export class Storage implements IStorage {

        constructor(private storageId: string) {

        }

        public get = () => {
            return JSON.parse(localStorage.getItem(this.storageId) || '[]');
        }

        public getByName = (params: INameValuePair) => {
            var items = JSON.parse(localStorage.getItem(this.storageId) || '[]');

            var storageItem = null;

            items.forEach((item) => {
                if (params.name === item.name) {
                    storageItem = item;
                }
            });

            return storageItem;
        }

        public put = (params: INameValuePair) => {
            var items = JSON.parse(localStorage.getItem(this.storageId) || '[]');

            var itemExist = false;

            items.forEach((item) => {
                if (params.name === item.name) {
                    itemExist = true;
                    item.value = params.value;
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