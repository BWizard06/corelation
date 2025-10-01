export default interface Service {
    title: string
    description: string
    meta: { 
        subtitle: string 
        competences: Array<{ title: string, description: string }>
        references: Array<{ title: string, image: string, link: string }>
    }
}