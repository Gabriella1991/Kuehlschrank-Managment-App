/* 
    Diese Klasse repräsentiert die Datenstruktur des Kühlschranks.
    Sie sollte per Konstruktor eine Kapazität als Ganzzahl übergeben bekommen. 
    Sollte beim Versuch ein neues Produkt hinzuzufügen das maximal zugelassene Volumen überschritten werden,
    sollte das neue Produkt nicht hinzugefügt werden.
    Zur Vereinfachung ist das Volumen in der imaginären Einheit VU (Volume-Unit) zu behandeln.

    Desweiteren sollte die Klasse über einen Speicher für im Kühlschrank eingelagerte Produkte verfügen.

    Der Kühlschrank-Klasse müssen noch Instanz-Methoden beigefügt werden.
    Folgende Methoden sollten auf jeden Fall enthalten sein:
    1- Eine Methode zur Ermittlung der freien Kapazität
    2- Eine Methode zur Ermittlung der bereits verbrauchten Kapazität
    3- Eine Methode zur Ermittlung der Anzahl eingelagerter Produkte
    4- Eine Methode zur Ermittlung des Produktes mit dem kleinsten Volumen
    5- Eine Methode zur Ermittlung des Produktes mit dem größten Volumen
    6- Eine Methode zum Hinzufügen neuer Produkte
    7- Eine Methode zum Entfernen vorhandener Produkte
    8- Eine Methode zum Entfernen aller vorhandenen Produkte
    9- Eine Methode zum Entfernen aller abgelaufenen Produkte
    10- Eine Methode zum Sortieren der Produkte nach Ablaufdatum
*/
import Product from "./product.js";

class Fridge {
    products = []
    constructor(capacity = 100,) {
        this.capacity = capacity;
    }
    //TODO 1 - zur Ermittlung der freien Kapazität
    freeCapacity() {//VU
        let usedCapacity = this.products.reduce((volumeSum, product) => {
            return volumeSum + product.produktvolumen
        }, 0)
        let freeResult = this.capacity - usedCapacity    /* 30=50-20 */
        return freeResult

    }

    //TODO 2 - Ermittlung der bereits verbrauchten Kapazität
    usedCapacityamount() {
        let usedCapacityamount = this.products.reduce((volumeSum, product) => {//NOTE - Verbrauchte Kapazität wird aus dem products Array reduziert
            return volumeSum + product.produktvolumen //NOTE - volumeSum wird summiert zu den einzelene Produkten (2) und dazu die produktvolumen.2 und .4 sind 6
        }, 0)
        return usedCapacityamount

    }
    //TODO 3 - zur Ermittlung der Anzahl eingelagerter Produkte
    amountProduct() {
        /* let usedCapacityamount = this.products.reduce ((volumeSum,product) =>{//NOTE - Verbrauchte Kapazität wird aus dem products Array reduziert
            return volumeSum+product.produktvolumen //NOTE - volumeSum wird summiert zu den einzelene Produkten (2) und dazu die produktvolumen.2 und .4 sind 6
        },0)
        return usedCapacityamount */
        return this.products.length

    }

    //TODO 4 - zur Ermittlung des Produktes mit dem kleinsten Volumen
    smallestProduct() {

        let sortedProducts = [...this.products].sort((p1, p2) => p1.produktvolumen - p2.produktvolumen)
        return sortedProducts[0].produktvolumen

    }
    //TODO 5 - zur Ermittlung des Produktes mit dem größten Volumen
    biggestProduct() {
        let sortedProducts = [...this.products].sort((p1, p2) => p2.produktvolumen - p1.produktvolumen)
        return sortedProducts[0].produktvolumen


    }
    //TODO 6 - zum Hinzufügen neuer Produkte
    addProduct(product) {
        if (product.produktvolumen <= this.freeCapacity()) {    //NOTE -Produkt Hinzufügen,wenn der eingegebene Produktvolume kleiner als das freie Kapazität is dann soll in den products Array reingepusht werden. 

            this.products.push(product);
        }

    }
    // NOTE - 9.a Hilfefunktion für Clean Button.
    isExpired(product) {
        console.log(product)
        let heuteToday = new Date();
        heuteToday.setHours(0, 0, 0, 0);
        if (product.ablaufsdatum < heuteToday) {
            return true
        }
        else return false

    }
    //TODO 9 - zum Entfernen aller abgelaufenen Produkte
    clearProductButton() {

        this.products = this.products.filter(product => !this.isExpired(product))
    }
    //TODO 10 - zum Sortieren der Produkte nach Ablaufdatum
    sortProductButton() {
        let sorted = this.products.sort((p1, p2) => p1.ablaufsdatum - p2.ablaufsdatum)//NOTE - sortiren nach ablaufdatum(expiration date/szavatossági idö)
        return sorted

    }
    //10.a Sortieren nach Name
    sortNameProductButton() {
        let sorted1 = this.products.sort((p1, p2) => p1.name.localeCompare(p2.name))//NOTE - sortiren nach Name(expiration date/szavatossági idö)
        
        return sorted1
        
    }
    //TODO 8 - zum Entfernen aller vorhandenen Produkte   
    defrostProductButton() {
        let defrosted = this.products.splice(0)
        return defrosted
    }
    //TODO 7 - zum Entfernen vorhandener Produkte
    getAmountExpProduct() {
       
        let expiredProduct = this.products.filter(product => {
            let today = new Date();
            today.setHours(0, 0, 0, 0);

            let diff = product.ablaufsdatum - today;

            return ((diff / ONE_DAY) < 0)
        });
        /* console.log(expiredProduct); */
        return expiredProduct.length
    };
    //NOTE - kurz vor Ablauf 
    bisMorgenUntilTomorrow() {
        const ONE_DAY = 1000 * 60 * 60 * 24;
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let morgenTomorrow = today.getTime() + ONE_DAY;//morgen ist heute plus 1 Tag
        let tomorrow = this.products.filter(product => {
            /* console.log(product.name); */
           /*  console.log(product.ablaufsdatum.getTime(), morgenTomorrow); */
            /* console.log(product.ablaufsdatum <= morgenTomorrow); */
            return (product.ablaufsdatum >= today && product.ablaufsdatum.getTime() <= morgenTomorrow)//wenn der Ablaufdatum größer als heute ist UND
            //wenn der Ablaufdatum kleiner ist als morgen

        });
        
        return tomorrow.length

    }
    löschEinzelnButton(index) {
        this.products.splice(index, 1)
    }
}
    

const ONE_DAY = 1000 * 60 * 60 * 24;
let produkt1 = new Product("Joghurt Pfirsisch", 2, new Date('2022-12-11'));
let produkt2 = new Product("Butter", 4, new Date('2023-12-11'));
let produkt3 = new Product("Banane Chiquita", 1, new Date('2022-11-03'));
let produkt4 = new Product("Frischkäse Kräuter", 2, new Date('2022-12-25'));
let produkt5 = new Product("Senf (Tube)", 4, new Date('2023-05-16'));
let produkt6 = new Product("Frischkäse Sahne", 3, new Date('2022-12-05'));
let produkt7 = new Product("Ketchup light", 2, new Date('2023-08-05'));
let produkt8 = new Product("Mayonese light", 2, new Date('2023-07-05'));
let produkt9 = new Product("Senf (Glas)", 2, new Date('2023-09-02'));
let produkt10 = new Product("Würstchen", 5, new Date('2022-12-15'));
let produkt11 = new Product("Paprika (rot)", 6, new Date('2022-10-08'));
let produkt12 = new Product("Paprika (grün)", 6, new Date('2022-10-01'));
let produkt13 = new Product("Cherry - Tomaten", 12, new Date('2022-11-08'));
let produkt14 = new Product("Joghurt Str.Groß", 5, new Date('2022-12-19'));

let fridge = new Fridge()
fridge.products.push(produkt1, produkt2, produkt3, produkt4, produkt5, produkt6, produkt7, produkt8, produkt9, produkt10, produkt11, produkt12, produkt13, produkt14);
console.log(fridge.bisMorgenUntilTomorrow());
console.log(fridge.capacity)
console.log(fridge.freeCapacity());
console.log(fridge.usedCapacityamount());
console.log(fridge.amountProduct());//6
console.log(fridge.smallestProduct());//1VU
console.log(fridge.biggestProduct());//4VU






export default Fridge;



