import { HEADER_ALIASES } from "../constants/headerAliases.js";

const normalize = ( text= " ") =>{
    return text
    .toLowerCase()
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
};

const findCrmFileld = (header) =>{
    const normalizeHeader = normalize(header)

    for(const[crmField,aliases] of Object.entries(HEADER_ALIASES)){
        const  normalizeAliases = aliases.map(normalize);

        if(normalizeAliases.includes(normalizeHeader)){
            return crmField;
        }
    };
    return null

}

export const mapHeaders = (headers = [])=>{
    const mapping = {}
    const unresolved = [];
    
    for (const header of headers){
        const crmFiled =findCrmFileld(header)
        if(crmFiled){
            mapping[header]= crmFiled
        }else{
            unresolved.push(header)
        }
    }

    return {
    mapping,
    unresolved,
  };
}