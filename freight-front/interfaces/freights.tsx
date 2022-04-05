export default interface FreightsInterface {
    _id: string;
    name: string,
    type: string,
    weight: number,
    destination: string,
    owner_number: string,
    owner_email: string,
    is_deleted: boolean
}