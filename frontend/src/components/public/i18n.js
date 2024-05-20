import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "welcome": "Welcome to Barber's House",
          "address": "Istedgade 28, 8700 Horsens, Denmark",
          "showOnMap": "Show on map",
          "phone": "Phone: +45 52 64 42 96",
          "bookNow": "Book Now",
          "appointment": "You can make an appointment at Barber's House.",
          "carousel": {
            "firstSlide": "First slide",
            "secondSlide": "Second slide",
            "thirdSlide": "Third slide",
            "fourthSlide": "Fourth slide",
            "fifthSlide": "Fifth slide"
          },
          "aboutUs": {
            "title": "About Us",
            "paragraph1": "I'm Ciprian Maftei, and what started as a hobby for me has grown into a passion and now it became my dream job.",
            "paragraph2": "I guide my craft by a simple yet powerful motto: 'Attitude is Everything'. In my work, this motto is a constant reminder that a good haircut is key in crafting an attitude that speaks of confidence, success, and positivity. I understand that when you look great, you feel great, and that's what I aim to achieve with every client who walks through the doors.",
            "paragraph3": "As I work, I enjoy getting to know my clients, understanding their styles, and their stories. These interactions turn a routine haircut into a personalized experience. I am here to craft a look that suits you, and in the process, build lasting connections that go beyond the barber chair. Join the Barber's House community. Looking forward to welcoming you and creating a style that’s all about you!"
          },
          "navigation": {
            "aboutUs": "About Us",
            "services": "Services",
            "team": "Team",
            "faq": "FAQ"
          },
          "team": {
            "header": "Get to know the team"
          },
          "faq": {
            "header": "FAQ",
            "question": "How to make an appointment at Barber's House?",
            "answer": "Follow the link:",
            "bookNow": "Book Now"
          },
          "footer": {
            "aboutUs": "About Us",
            "services": "Services",
            "team": "Team",
            "faq": "FAQ",
            "contact": "Contact",
            "showOnMap": "Show on map"
          },
          "stepper": {
            "success": "Your Booking was successful",
            "seeYouSoon": "See you soon!"
          },
          "step1": {
            "title": "Select a Barber"
          },
          "step2": {
            "title": "Select a Service"
          },
          "step3": {
            "title": "Pick a date and time"
          },
          "step4": {
            "title": "Enter Details"
          },
          "barbers": {
            "services": "Services",
            "select": "Select",
            "booking": "Booking"
          },
          "common": {
            "continue": "Continue",
            "back": "Back",
            "close": "Close"
          }
        }
      },
      da: {
        translation: {
          "welcome": "Velkommen til Barber's House",
          "address": "Istedgade 28, 8700 Horsens, Danmark",
          "showOnMap": "Vis på kort",
          "phone": "Telefon: +45 52 64 42 96",
          "bookNow": "Book nu",
          "appointment": "Du kan lave en aftale hos Barber's House.",
          "carousel": {
            "firstSlide": "Første slide",
            "secondSlide": "Andet slide",
            "thirdSlide": "Tredje slide",
            "fourthSlide": "Fjerde slide",
            "fifthSlide": "Femte slide"
          },
          "aboutUs": {
            "title": "Om os",
            "paragraph1": "Jeg er Ciprian Maftei, og det der startede som en hobby for mig, er vokset til en passion, og nu blev det mit drømmejob.",
            "paragraph2": "Jeg guider mit håndværk med et simpelt men kraftfuldt motto: 'Attitude er alt'. I mit arbejde er dette motto en konstant påmindelse om, at en god klipning er nøglen til at skabe en holdning, der taler om selvtillid, succes og positivitet. Jeg forstår, at når du ser godt ud, føler du dig godt tilpas, og det er det, jeg sigter efter at opnå med hver klient, der går gennem dørene.",
            "paragraph3": "Når jeg arbejder, nyder jeg at lære mine klienter at kende, forstå deres stilarter og deres historier. Disse interaktioner gør en rutineklipning til en personlig oplevelse. Jeg er her for at skabe et look, der passer til dig, og i processen opbygge varige forbindelser, der går ud over frisørstolen. Deltag i Barber's House-fællesskabet. Jeg ser frem til at byde dig velkommen og skabe en stil, der handler om dig!"
          },
          "navigation": {
            "aboutUs": "Om os",
            "services": "Tjenester",
            "team": "Team",
            "faq": "FAQ"
          },
          "team": {
            "header": "Lær holdet at kende"
          },
          "faq": {
            "header": "FAQ",
            "question": "Hvordan laver man en aftale hos Barber's House?",
            "answer": "Følg linket:",
            "bookNow": "Book nu"
          },
          "footer": {
            "aboutUs": "Om os",
            "services": "Tjenester",
            "team": "Team",
            "faq": "FAQ",
            "contact": "Kontakt",
            "showOnMap": "Vis på kort"
          },
          "stepper": {
            "success": "Din booking var en succes",
            "seeYouSoon": "Vi ses snart!"
          },
          "step1": {
            "title": "Vælg en barber"
          },
          "step2": {
            "title": "Vælg en service"
          },
          "step3": {
            "title": "Vælg en dato og tid"
          },
          "step4": {
            "title": "Indtast detaljer"
          },
          "barbers": {
            "services": "Tjenester",
            "select": "Vælg",
            "booking": "Booking"
          },
          "common": {
            "continue": "Fortsæt",
            "back": "Tilbage",
            "close": "Luk"
          }
        }
      }
    },
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
