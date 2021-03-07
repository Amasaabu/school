export const check_duplicate_scores = (array) => {

    const subject_id_array = array.map((it) => {
        return it.subject.toString()
    })

    for (let index = 0; index < subject_id_array.length; index++) {
        const currentElement = subject_id_array[index];
        const duplicate = subject_id_array.indexOf(currentElement)
        const check = index - duplicate;
        if (check !== 0) {
            throw new Error('Duplicate subject entries!!')
        }
    }
}


