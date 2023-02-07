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
                se: `Kontakt`
            },
            info: {
                enUs: `Experience`,
                se: `Erfarenhet`
            }
        }
        this.ps = {
            home: {
                enUs: `My name is Esbjörn and I am currently attending the second year of the Software Engineering
                bachelor program at Blekinge Institute of Technology in Karlskrona, Sweden.
                With an open mind to different ranges of solutions, 
                my goal is to continue broadening my software development knowledge
                spanning the entire stack, with great attention to detail.
                While I love creating computer software, I also love
                creating other forms of digital work, such as video and audio,
                where I have a decade of on- and off engagement.`
            },
            projects: {
                enUs: `Projects`,
                se: `Projekt`
            },
            contact: {
                enUs: `I am currently looking 
                for a summer job this summer in the development industry. 
                Please reach out if you have a career opportunity or any other 
                inquiries that you think I could be of help with.`,
                se: `Just nu söker jag sommarjobb för sommaren 2023, 
                så om ni har en ledig position i utvecklarbranschen är jag mycket tacksam
                om ni skulle höra av er.
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
                    enUs: `Task Scheduler`,
                    se: `Schemaläggare`
                },
                p: {
                    enUs: `My first web project, made with no prior experience of the React 
                    stack. The application visualizes suggested working hours for the entered
                    tasks based on durations and deadlines. Completed in 110 hours total.`,
                    se: `Individuellt högskoleprojekt påbörjat från ingen tidigare erfarenhet
                    av webbprogrammering. Webbappen rekommenderar och visualiserar arbetstimmar
                    beroende på användarens arbetens längd och deadline. Utfärdat på 110 arbetstimmar.`
                },
                image: './src/assets/TaskScheduler.png',
                year: "2022"
            },
            {
                title: {
                    enUs: `Connectitude billing engine`,
                    se: `Connectitude faktureringsprogram`
                },
                p: {
                    enUs: `Test project description hahaahahahahahahaahahahahahahaahahahahahahaahahahahahahaahahahaha`,
                    se: `Test projekt beskrivning`
                },
                image: './src/assets/TaskScheduler.png',
                year: "2023"
            }
        ]
    }
}

export default langPack