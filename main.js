//ANCHOR - AUFGABESTELLUNG/* 
/*     Dies ist die haupt Javascript Datei, die im HTML eingebunden ist.
    Hierin sollten alle Nutzer - Interaktionen geregelt werden.

    Hierin sollten möglichst keine Datenstrukturdaten gespeichert werden,
    dafür sind die beiden Klassen 'Fridge' und 'Product' vorgesehen.
    Die nötigen Dateien für die Fridge - und Productklasse sind bereits eingebunden,
    so dass von hier aus von ihnen Gebrauch gemacht werden kann.

    Es empfiehlt sich das Befüllen bzw.Erzeugen der dynamischen GUI Elemente
    in einer größeren Methode zu definieren, die sich an den in der Datenstruktur hinterlegten Daten orientiert.
    So kann man diese Methode bei jeder Änderung der Daten immer wieder aufrufen 
    und muss sich nicht um das Hinzufügen, Ändern oder Entfernen einzelner HTML - Elemente kümmern.

    Die Datei enthält bereits eine Methode zum Erzeugen von Product - Cards.
    Sie liefert das fertige und mit Daten befüllte HTML - Element zurück.

    Außerdem hat Datei einige nötige Referenzen auf HTML - Elemente der GUI.
    Diese können bereits genutzt werden.
    Weitere nötige Referenzen auf HTML - Elemente der GUI können nach demselben Muster per ID - Zugriff gemacht werden.

 */
//SECTION - IMPORTS UND HILFVARIABLEN // Imports der Kühlschrank Klasse aus der externen Datei
import Fridge from "./fridge.js";
// Imports der Produkt Klasse aus der externen Datei
import Product from "./product.js";

/* ----------- HILFSVARIABLEN ----------- */
// Konstante für einen Tag in Millisekunden
const ONE_DAY = 1000 * 60 * 60 * 24;
/* -------------------------------------- */
//!SECTION




//SECTION  - LINKS renderStatusNumbers- SPANS - ZUM ANZEIGEN DER WARENBESTAND
//NOTE -  Render-Funktion für den Kühlschrank-Status-Bereich
function renderStatusNumbers(fridge) {
    // GUI-Referenzen auf die Spans
    //! Könnte man auch global auslagern
    let fridgeCapacitySpan = document.querySelector('#fridge-capacity-span');
    let productsAmountSpan = document.querySelector('#products-amount-span');
    let fridgeFreeCapacitySpan = document.querySelector('#fridge-free-capacity-span');
    let productsUntilTomorrowSpan = document.querySelector('#products-until-tomorrow-span');
    let productsExpiredSpan = document.querySelector('#products-expired-span');
    let smallestProductSpan = document.querySelector('#smallest-product-span');
    let biggestProductSpan = document.querySelector('#biggest-product-span');

    //NOTE -  Befülle die Span mit den entsprechenden Informationen aus der Fridge-Instanz
    fridgeCapacitySpan.innerText = fridge.capacity;
    productsAmountSpan.innerText = fridge.amountProduct();
    fridgeFreeCapacitySpan.innerText = fridge.freeCapacity();
    productsUntilTomorrowSpan.innerText = fridge.bisMorgenUntilTomorrow();
    productsExpiredSpan.innerText = fridge.getAmountExpProduct(); 
    smallestProductSpan.innerText = fridge.smallestProduct();
    biggestProductSpan.innerText = fridge.biggestProduct();
}
//!SECTION
















//SECTION - MITTE -KLICK EVENTS - GUI REFERENZEN - ADD-BUTTON -------------------------------------------------------------------------------------------------------------------------//
const fridgeProductsContainer = document.querySelector('#fridge-products-container');//NOTE - Referenz auf Produkte-Container

const addProductNameInput = document.querySelector('#form-add-product-name');//NOTE - // Referenz auf Input für Name des neuen Produkts

const addProductVolInput = document.querySelector('#form-add-product-volume');//NOTE - // Referenz auf Input für Volumen des neuen Produkts

const addProductExpDateInput = document.querySelector('#form-add-product-exp-date');//NOTE - // Referenz auf Input für Ablaufdatum des neuen Produkts

const addProductSubmitBtn = document.querySelector('#btn-add-product'); //NOTE - // Referenz auf Button für Bestätigung des neuen Produkts

// -------------------------------------------------------------------------------------------------------------//
addProductSubmitBtn.addEventListener('click', function (evt) {
    if ((addProductNameInput.value.trim().length > 0) && (addProductVolInput.value.trim().length > 0) && (addProductExpDateInput.value.trim().length > 0)) {//NOTE - Prüfung ob der Wert(value) von Name-VU-Datum größer ist als null ist dann ...

        let newProduct = new Product(addProductNameInput.value,//NOTE - wird neuen Produkt hinzugefügt
            parseInt(addProductVolInput.value),
            new Date(addProductExpDateInput.value));

        // 
        fridge.addProduct(newProduct);

        renderProducts(fridge);//NOTE - //Render-Funktion aufrufen und Daten wiedergeben

        renderStatusNumbers(fridge);
    }
});
/* 
    Funktion zum Erstellen einer Produktcard für den Kühlschrank.
    Sie erhält als Parameter
    - Den Namen des Produkts (productName)
    - Das Volumen des Produkts (productVolume), also den Platz, den es innerhalb des Kühlschranks einnimmt
    - Das Ablaufdatum des Produkts (productExpDate)
    - Ein boole'scher Indikator dafür, ob das Produkt abgelaufen ist (isExpired)
    - Eine Callback-Funktion für Behandlung des Klicks auf den Löschknopf der jeweiligen Card (deleteCallback)
        Sollte dieses Callback keiner Funktion entsprechen (oder nicht mitgeliefert werden) erscheint eine Fehlermeldung in der Konsole.

    Als Rückgabewert (return) liefert sie das fertige HTML-Element mit allen übergebenen Informationen.
*/




//SECTION - MITTE -createNewProductCard NEUE PRODUKTKARTE ERZEUGEN -------------------------------------------------------------------------------------------------------------//
function createNewProductCard(productName, productVolume, productExpDate, isExpired, deleteCallback) {
    // Erstelle äußeres Card-div
    let card = document.createElement('div');
    // Hänge Bootstrap card-Klasse an
    card.classList.add('card');

    // Erstelle inneres Card-Body-div
    let cardBody = document.createElement('div');
    // Hänge Bootstrap card-body-Klasse an
    cardBody.classList.add('card-body');

    // Erstelle Card Titel
    let cardTitle = document.createElement('h5');
    // Hänge Bootstrap card-title Klasse an
    cardTitle.classList.add('card-title');
    // Fülle Card Titel mit übergebenem Produktnamen
    cardTitle.innerText = productName + ' ';

    // Erstelle Knopf zum Löschen des Produktes
    let deleteCardBtn = document.createElement('button');
    // Setze button-type
    deleteCardBtn.type = 'button';
    // Hänge Bootrap Button Klassen an abhängig davon, ob Produkt bereits abgelaufen oder nicht
    deleteCardBtn.classList.add('btn', 'btn-sm', (isExpired ? 'btn-outline-danger' : 'btn-outline-primary'));

    if (typeof deleteCallback === 'function') {    // Prüfe, ob übergebenes Callback für den Löschknopf gültig ist

        deleteCardBtn.addEventListener('click', evt => {        // Hänge übergebenes Callback auf das onClick-Event des Löschknopfs an

            deleteCallback();
        });

    } else {
        // Gebe aus, dass übergebenes Callback ungültig ist
        console.log('%cDas mitgelieferte Callback zum Löschen des Produkts ist keine Funktion oder nicht vorhanden.', 'color: red;');
    }

    let deleteCardBtnIcon = document.createElement('i');    // Erstelle icon-Element für Löschknopf

    deleteCardBtnIcon.classList.add('fa-solid', (isExpired ? 'fa-trash' : 'fa-utensils'));    // Hänge dem icon-Element abhängig von Ablaufszustand die entsprechende Bootstrap Klasse an


    let cardSubTitle = document.createElement('h6');    // Erstelle Untertitel Element

    cardSubTitle.classList.add('card-subtitle', 'mb-2', 'text-muted');    // Hänge Bootstrap card-subtitle Klasse an Untertitel Element an


    if (isExpired) cardSubTitle.classList.replace('text-muted', 'text-danger');    // Wenn abgelaufen, ersetze Bootstrap Klasse für Textfarbe

    else if (new Date(productExpDate) - new Date() < ONE_DAY) cardSubTitle.classList.replace('text-muted', 'text-warning');    // Wenn kurz vor Ablauf, ersetze Bootstrap Klasse für Textfarbe

    cardSubTitle.innerText = productExpDate.toLocaleDateString("de-DE");    // Befülle Untertitel Element mit übergebenem Ablaufsdatum


    let cardText = document.createElement('p');    // Erstelle Text-Element für Produkt-Volumen

    cardText.classList.add('card-text');    // Hänge Bootstrap card-text Klasse an Text-Element an


    cardText.innerText = productVolume + " VU";    // Befülle Text-Element mit übergebenem Produktvolumen


    deleteCardBtn.appendChild(deleteCardBtnIcon);    // Hänge Lösch-Icon an Löschknopf an

    cardTitle.appendChild(deleteCardBtn);    // Hänge Löschknopf an Card Titel an


    cardBody.appendChild(cardTitle);    // Hänge Card Titel an Card-Body an

    cardBody.appendChild(cardSubTitle);    // Hänge Card Untertiel an Card-Body an

    cardBody.appendChild(cardText);    // Hänge Card Text an Card-Body an


    card.appendChild(cardBody);    // Hänge Card-Body an Card-div an


    
    return card;    // Gebe fertige Klasse zurück
}
//!SECTION


//SECTION MITTE-renderProducts RENDER FÜR PRODUKTE -------------------------------------------------------------------------------------------------------------//
function renderProducts(fridge) {
    fridgeProductsContainer.replaceChildren();       //NOTE - //! HACK: Dadurch werden alle Kind-Elemente mit NICHTS ersetzt also sozusagen entfernt.//(Die Element.replaceChildren()Methode ersetzt die vorhandenen Kinder von a Nodedurch eine angegebene neue Gruppe von Kindern. Dies können Strings oder NodeObjekte sein.)
    fridge.products.forEach((product,index) => {     //NOTE - alle Produkte durchlaufen...

        let today = new Date()                      //NOTE - Variable für Heute erstellen
        today.setHours(0, 0, 0, 0)                  //NOTE - // Instanz auf 00:00:00 Uhr setzen
        let isExpired = ((today - product.ablaufsdatum) / ONE_DAY) > 3;// Abgelaufene Produkte sind = heute(3.) - 15. / 1Tag größer als 3 ....
        
        let productCard = createNewProductCard(product.name, product.produktvolumen, product.ablaufsdatum, isExpired, () => {   //NOTE - neue Produktkarte erstellen/erzeugen (als parameter die Details angegeben,wie name. Produktvolumen Ablaufdatum und ob es schon abgelaufen ist)
            
            fridge.löschEinzelnButton(index,1);     //NOTE -  Entferne das Produkt anhand des Index aus dem Array in der Fridge-Instanz
            renderProducts(fridge)                  //NOTE -  Rufe die allgemeine Render-Funktion auf, um neuen Zustand in der GUI darzustellen
            renderStatusNumbers(fridge);            //NOTE -  Rufe die allgemeine Render-Funktion auf, um neuen Zustand in der GUI darzustellen
              
        });

        fridgeProductsContainer.appendChild(productCard);
    });
};
//!SECTION










//SECTION RECHTS - FUNKTIONEN -KLICK EVENTS 
const sortNameBtn = document.querySelector("#sort-products-by-name-btn") //sortieren nach name gui

const sortProductsBtn = document.querySelector("#sort-products-by-exp-date-btn");//sortieren nach Ablaufdatum (ältere wird nach vorne sortiert)

const removeAllProductsBtn = document.querySelector("#remove-all-products-btn");// alle Produkte im Kühlschrank entfernt

const removeExpProductsBtn = document.querySelector("#clean-fridge-btn");// abgelaufenen Produkte im Kühlschrank entfernt
/* -------------------------------------- */
sortNameBtn.addEventListener('click', evt => {
    fridge.sortNameProductButton();
    // wird allgemeine Render-Funktion aufgerufen, um die Datenlage in der GUI widerzuspiegeln
    renderProducts(fridge);
    renderStatusNumbers(fridge);
})
sortProductsBtn.addEventListener('click', evt => {
    fridge.sortProductButton();
    // wird allgemeine Render-Funktion aufgerufen, um die Datenlage in der GUI widerzuspiegeln
    renderProducts(fridge);
    renderStatusNumbers(fridge);
});
removeAllProductsBtn.addEventListener('click', evt => {
    fridge.defrostProductButton();
    // wird allgemeine Render-Funktion aufgerufen, um die Datenlage in der GUI widerzuspiegeln
    renderProducts(fridge);
    renderStatusNumbers(fridge);
});
removeExpProductsBtn.addEventListener('click', evt => {
    fridge.clearProductButton();
    // wird allgemeine Render-Funktion aufgerufen, um die Datenlage in der GUI widerzuspiegeln
    renderProducts(fridge);
    renderStatusNumbers(fridge);
});
//!SECTION


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

//SECTION - RENDER FUNKTIONEN AUFRUFEN
renderProducts(fridge);
renderStatusNumbers(fridge);
//!SECTION

