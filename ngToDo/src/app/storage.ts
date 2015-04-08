module app.common {

    export class Storage implements IStorage {

        constructor(private storageId: string) {

        }

        public get = () => {
            return JSON.parse(localStorage.getItem(this.storageId) || '[]');
        }

        public getByName = (params: INameValuePair) => {
            var items = JSON.parse(localStorage.getItem(this.storageId) || '[]');

            for (var i = 0; i < items.length; i++) {
                if (params.name === items[i].name) {
                    return items[i];
                };
            };

            return null;
        }

        public put = (params: INameValuePair) => {
            var items = JSON.parse(localStorage.getItem(this.storageId) || '[]');

            for (var i = 0; i < items.length; i++) {
                if (params.name === items[i].name) {
                    items[i].value = params.value;
                    localStorage.setItem(this.storageId, JSON.stringify(items));
                    return;
                };
            };

            items.push(params);

            localStorage.setItem(this.storageId, JSON.stringify(items));
        }

    }
} 