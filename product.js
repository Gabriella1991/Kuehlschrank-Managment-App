/* 
    Diese Klasse repräsentiert die Datenstruktur eines im Kühlschrank eingelagerten Produkts.
    Sie sollte per Konstruktor einige nötige Produktdaten entgegen nehmen und in der Produkt-Instanz hinterlegen:
    - Den Namen des Produkts als Zeichenkette (String)
    - Das Produktvolumen als Ganzzahl (Integer)
    - Das Ablaufsdatum des Produkts als Datum (Date)
*/
class Product {
    constructor(name,produktvolumen,ablaufsdatum){
        
        this.name = name;
        
        this.produktvolumen = produktvolumen;
        
        this.ablaufsdatum = ablaufsdatum;

    }
    
}
 export default Product; 