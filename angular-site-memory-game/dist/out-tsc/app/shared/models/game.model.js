var Game = /** @class */ (function () {
    function Game() {
    }
    return Game;
}());
export { Game };
var KeyedCollection = /** @class */ (function () {
    function KeyedCollection() {
        this.items = {};
        this.count = 0;
    }
    KeyedCollection.prototype.ContainsKey = function (key) {
        return this.items.hasOwnProperty(key);
    };
    KeyedCollection.prototype.Count = function () {
        return this.count;
    };
    KeyedCollection.prototype.Add = function (key, value) {
        if (!this.items.hasOwnProperty(key))
            this.count++;
        this.items[key] = value;
    };
    KeyedCollection.prototype.Remove = function (key) {
        var val = this.items[key];
        delete this.items[key];
        this.count--;
        return val;
    };
    KeyedCollection.prototype.Item = function (key) {
        return this.items[key];
    };
    KeyedCollection.prototype.Keys = function () {
        var keySet = [];
        for (var prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                keySet.push(prop);
            }
        }
        return keySet;
    };
    KeyedCollection.prototype.Values = function () {
        var values = [];
        for (var prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                values.push(this.items[prop]);
            }
        }
        return values;
    };
    return KeyedCollection;
}());
export { KeyedCollection };
//# sourceMappingURL=game.model.js.map