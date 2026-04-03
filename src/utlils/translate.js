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
        },
        registration: {
          header: {
            LT:"Lankytojo registracija",
            EN:"Visitor Registration"
          },
          nameText: {
            LT: "Vardas",
            EN: "Name",
          
          },
          lastNameText: {
            LT: "Pavardė",
            EN: "Last name",
          },
          goalText: {
            LT: "Vizito tikslas",
            EN: "The purpose of visit",
          },
          adreseeText: {
            LT: "Vizitas pas",
            EN: "Who did you come to visit",
          },
          continueButton: {
            LT: "Testi",
            EN: "Continue",
          },
          backButton: {
            LT: "Atgal",
            EN: "Back",
          },
          schoolGoal: {
            LT:"Dėl mokslų",
            EN: "For studies"
          },
          documentGoal: {
            LT:"Dėl dokumentų",
            EN:"For documents"
          },
          consultationGoal: {
            LT:"Konsultacijai",
            EN:"For consultation"
          },
          plannedGoal: {
            LT:"Suderintas vizitas",
            EN:"Planned visit"
          },
          otherGoal: {
            LT:"Kita",
            EN:"Other"
          },
          reason: {
            LT:"Įrašyk priežastį",
            EN:"Enter the reason"
          },
          email: {
            LT: "Jūsų EL. paštas",
            EN: "Your email"
          } 
        },
        directions: {
          header: {
            LT:"Jūsų kelionė prasideda čia",
            EN:"Your journey begins here."
          },
          finishButton: {
            LT:"Baigti",
            EN:"Finish"
          },
          directionText: {
            LT: "Eikite į antrą aukštą",
            EN: "Go to the second floor."
          },
          cabinet: {
            LT: "Jūsų laukia 205 kabinete",
            EN: "You are expected in room 205."
          }
        }
    }

    return wordDictinary[page][word][lang];
} 

export default translate;
