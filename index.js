const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
let data2014 = fifaData.filter(
	(final) => final["Stage"] === "Final" && final["Year"] === 2014);
const evsahibi = data2014[0]["Home Team Name"];
console.log("Görev 1a", evsahibi);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
const deplasman = data2014[0]["Away Team Name"];
console.log("Görev 2a", deplasman);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
const goal = data2014[0]["Home Team Goals"];
console.log("Görev 3a", goal);


//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
const depgoal = data2014[0]["Away Team Goals"];
console.log("Görev 3a", depgoal);


//(e) 2014 Dünya kupası finali kazananı*/
const winnerTeam = data2014[0]["Win conditions"];
console.log("Görev 4a", winnerTeam);

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/
function Finaller(array) {
	const finals = array.filter((final) => final["Stage"] === "Final");

	return finals;
}
console.log("Görev 2", Finaller(fifaData));


/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(array, callback) {
	const years = callback(array).map((yil) => yil.Year);
	return years;
}

console.log("GÖREV 3 ", Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */


function Kazananlar(array, callback) {
	let finaller = callback(array);
	const filtre = finaller.filter((final) => final["Home Team Goals"] !== final["Away Team Goals"]);           //////
	const winnersClubs = filtre.map(mac => {
		if (mac["Home Team Goals"] > mac["Away Team Goals"]) {
			console.log("Görev 4 Ev Sahibi ", mac['Home Team Name'] + ' ev sahibi olarak kazandı.');
			return (mac['Home Team Name']);
		} else if (mac["Home Team Goals"] < mac["Away Team Goals"]) {
			console.log("Görev 4 Deplasman  ", mac['Away Team Name'] + ' ev sahibi olarak kazandı.');
			return (mac['Away Team Name']);
		}
	});
	/*for (let i = 0; i < callback(array).length; i++) {
		const maclar = callback(array)[i];
		if (maclar["Home Team Goals"] > maclar["Away Team Goals"]) {
			winnersClubs.push(maclar['Home Team Name']);
			console.log("Görev 4 Ev Sahibi ", maclar['Home Team Name'] + ' ev sahibi olarak kazandı.');
		} else if (maclar["Home Team Goals"] < maclar["Away Team Goals"]) {
			console.log("Görev 4 Deplasman  ", maclar['Away Team Name'] + ' ev sahibi olarak kazandı.');
			winnersClubs.push(maclar['Away Team Name']);

		} else if (maclar["Home Team Goals"] == maclar["Away Team Goals"]);
		console.log("Görev 4 Beraberlik", maclar["Win conditions"])
	}*/

	return winnersClubs;
}
console.log("KAZANAN TAKIMLAR ", Kazananlar(fifaData, Finaller));


/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(array, callback0, callback1, callback2) {
	let sonmaclar = callback0(array);
	const wins = callback2(array);
	const winyears = callback1(array);
	const cumleler = winyears.map((yil, index) => [yil] + " yılında," + [wins[index]] + "dünya kupasını kazandı!");
	return cumleler;
}
console.log("Görev 5 ", YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));





/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(array) {
	let sumgol1 = 0;
	const toplamgol1 = array.reduce((toplam, mac) => {                                  // .reduce kullanarak for ile yaptığımızı yapabiliyor!!!!
		return toplam + mac["Home Team Goals"] + mac["Away Team Goals"]
	}, 0);
	/*for (let i = 0; i < array.length; i++) {
		sumgol1 += array[i]["Home Team Goals"] + array[i]["Away Team Goals"];
	} */
	const ortgol = (toplamgol1 / array.length);
	let ortalamagol = ortgol.toFixed(2);
	return ortalamagol;
} console.log("ORTALAMA GOL ", OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {

	/* kodlar buraya */

}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {

	/* kodlar buraya */

}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {

	/* kodlar buraya */

}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
	console.log('Kodlar çalışıyor');
	return 'as';
}
sa();
module.exports = {
	sa,
	Finaller,
	Yillar,
	Kazananlar,
	YillaraGoreKazananlar,
	OrtalamaGolSayisi
}
