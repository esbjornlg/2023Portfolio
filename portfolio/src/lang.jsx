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
                så om ni har en ledig position i utvecklarbranschen
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
                    enUs: "test2proj",
                    se: "test2projekt"
                },
                p: {
                    enUs: "Test project description hahaahahahahahahaahahahahahahaahahahahahahaahahahahahahaahahahaha",
                    se: "Test projekt beskrivning"
                },
                image: './src/assets/TaskScheduler.png' 
            }
        ]
    }
}

export default langPack