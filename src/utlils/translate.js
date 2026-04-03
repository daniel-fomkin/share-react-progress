const translate = (page, word, lang) => {
    const wordDictinary = {
        aside: {
             months: {
                LT: ["Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio","Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"],
                EN: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            }
        },
        welcome: {
            welcomeText: {
              LT: "Sveiki atvykę",
              EN: "Welcome",
                
            },
            startButton: {
              LT: "Pradėti registraciją",
              EN: "Start registration",
            }
        }
    }

    return wordDictinary[page][word][lang];
} 

export default translate;