export type ClassSearchResult = {
    classId: string
    name: string
    schoolName: string
    isTreasurer: boolean
    treasurer: {
        email: string
        name: string
        surname: string
    }
}

export type ClassDetailsResponse = {
    name: string
    schoolName: string
    isTreasurer: boolean
    treasurer: {
        email: string
        name: string
        surname: string
    }
    children: Array<{
        childId: string
        name: string
        parentId: string
        parentName: string
        parentSurname: string
    }>
}
