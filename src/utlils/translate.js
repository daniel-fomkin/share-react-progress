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
            EN: "First name",
          
          },
          lastNameText: {
            LT: "Pavardė",
            EN: "Last name",
          },
          goalText: {
            LT: "Vizito tikslas",
            EN: "Purpose of visit",
          },
          adreseeText: {
            LT: "Vizitas pas",
            EN: "Person to visit",
          },
          continueButton: {
            LT: "Tęsti",
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
            EN:"Scheduled visit"
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
        },
        confirmation: {
            finishButton: {
              LT:"Baigti",
              EN:"Finish"
            },
            confirm: {
              LT:"Registracija sėkminga!",
              EN:"Registration sucessful!"
            },
            information: {
              LT:"Darbuotojas informuotas apie Jūsų atvykimą",
              EN:"The staff member has been informed about your arrival"
            }
        },
        alerts:{
            firstName: {
                LT: "Įvesk vardą",
                EN: ""
            },
            lastName: {
                LT: "Įvesk pavardę",
                EN: ""
            },
            goal: {
                LT: "Pasirink vizito tikslą",
                EN: ""
            },
            addressee: {
                LT: "Pasirink žmogų",
                EN: ""
            },
            firstNameNum: {
                LT: "Varde negali būti skaičių",
                EN: ""
            },  
            lastNameNum: {
                LT: "Pavardėje negali būti skaičių",
                EN: ""
            },
            goalOther: {
                LT: "Įrašyk savo priežastį",
                EN: ""
            },
            email: {
                LT: "Įvesk savo pašta",
                EN: ""
            },
            emailNotExist: {
                LT: "Įvesk egzistuojanti pašta",
                EN: ""
            }
        }
    }

    return wordDictinary[page][word][lang];
} 

export default translate;
