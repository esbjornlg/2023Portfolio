class langPack {
    constructor() {
        this.langs = [`enUs`, `se`];
        this.titles = {
            title: {
                enUs: `Fullstack developer`,
                se: `Fullstackutvecklare`
            },
            home: {
                enUs: `About me`,
                se: `Om mig`
            },
            projects: {
                enUs: `Projects`,
                se: `Projekt`
            },
            contact: {
                enUs: `Contact`,
                se: `Kontakta mig`
            },
            info: {
                enUs: `Experience`,
                se: `Erfarenhet`
            },
            stack: {
                enUs: `Stack`,
                se: `Stack`
            },
            work: {
                enUs: `Work`,
                se: `Arbetsliv`
            },
            education: {
                enUs: `Education`,
                se: `Utbildning`
            },
            emailMe: {
                enUs: `Email me!`,
                se: `Skicka ett mail!`
            }
        }
        this.ps = {
            home: {
                enUs: `Hello! My name is Esbjörn and I am currently attending the second year of the Software Engineering
                bachelor program at Blekinge Institute of Technology in Karlskrona, Sweden.
                With an open mind to different ranges of solutions, my goal is to continue broadening my software development knowledge spanning the entire stack, with great attention to detail. During my free time, I also love creating other forms of digital work, such as video and audio, where I have a decade of on- and off engagement.`,
                se: `Tjena! Mitt namn är Esbjörn och jag är en student inom Software Engineering på Blekinge Tekniska Högskola
                i Karlskrona. Just nu är mitt intresse att utöka mitt kunskapsområde inom programvaruutveckling, med kreativitet och uppmärksamhet för detaljer i sinne.
                På fritiden brukar jag också hantera andra digitala kreativa medel, som film- och ljudproduktion.`
            },
            projects: {
                enUs: `Projects`,
                se: `Projekt`
            },
            contact: {
                enUs: `I am currently looking for a summer job this summer of 2023 in the software development industry, preferably in the Karlskrona or Stockholm areas of Sweden. 
                Please reach out if you have a career opportunity or any other  inquiries that you think I could be of help with.`,
                se: `Just nu söker jag sommarjobb för denna sommaren 2023, helst i Karlskrona eller Stockholm, så om ni har en ledig position i utvecklarbranschen skulle jag vara väldigt tacksam om ni skulle höra av er.
                `
            },
            info: {
                enUs: `I convey a broad range of tools that I `,
                se: `Erfarenhet`
            }
        }
        this.projects = [
            {
                title: {
                    enUs: `Connectitude billing engine`,
                    se: `Connectitude faktureringsprogram`
                },
                p: {
                    enUs: `A BTH team project involving the creation of a system for sending invoices automatically, periodically via Fortnox' API to the IIoT-company Connectitude's customers. The invoice basis is gathered via a rest API to an SQL database, whose data can be altered via an admin interface made in Angular.`,
                    se: `Detta grupprojekt innebär skapandet av ett system för automatiskt utskickande av fakturor via Fortnox API till IIoT-företaget Connectitudes kunder. Fakturaunderlaget hämtas via egengjord API till SQL databas och kan CRUD-hanteras bland annat av ett admingränssnitt skapat i Angular.`
                },
                tags: [
                    `Angular`,
                    `.NET`,
                    `C#`,
                    `SQL`,
                    `Azure`
                ],
                image: `/connectitude.png`,
                link: false,
                year: `2023`
            },
            {
                title: {
                    enUs: `Task Scheduler`,
                    se: `Schemaläggare`
                },
                p: {
                    enUs: `My first web project, made with no prior experience of the React stack. The application visualizes suggested working hours for the entered tasks based on durations and deadlines. 
                    Completed in 110 hours total.`,
                    se: `Individuellt högskoleprojekt påbörjat från ingen tidigare erfarenhet av webbprogrammering. Webbappen rekommenderar och visualiserar arbetstimmar beroende på användarens arbetens längd och deadline. 
                    Utfärdat på 110 arbetstimmar.`
                },
                tags: [
                    `React`,
                    `JavaScript`
                ],
                image: `/taskscheduler.png`,
                link: `/projects/taskscheduler`,
                year: `2022`
            }
        ]
        this.experience = {
            PostNord2020: {
                title: {
                    enUs: `Mailman`,
                    se: `Brevbärare`
                },
                year: `2020-2022`
            },
            BOLD2019: {
                title: {
                    enUs: `Forwarder`,
                    se: `Expeditör`
                },
                year: `2019-2021`
            }
        }
        this.education = {
            BTH2021: {
                school: {
                    enUs: `Blekinge Institute of Technology`,
                    se: `Blekinge Tekniska Högskola`
                },
                program: {
                    enUs: `Software Engineering (180hp)`,
                    se: `Software Engineering (180hp)`
                },
                year: `2021-2024`
            }
        }
    }
}

export default langPack