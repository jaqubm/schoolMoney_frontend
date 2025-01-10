export type CreateClassPayload = {
    name: string
    schoolName: string
}

export type UpdateClassPayload = {
    name: string
    schoolName: string
}

export type ClassDetails = {
    name: string
    schoolName: string
    isTreasurer: boolean
    treasurer: {
        email: string
        name: string
        surname: string
    }
    children: {
        childId: string
        name: string
        parentId: string
        parentName: string
        parentSurname: string
    }[]
}

export type SearchClassResult = {
    classId: string
    name: string
    schoolName: string
    isTreasurer: boolean
    treasurer: {
        email: string
        name: string
        surname: string
    }
}[]
