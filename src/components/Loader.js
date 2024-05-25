import { cardio } from "ldrs";
export default function Loader () {
    cardio.register();
    
    return <div className="mx-auto mt-8 block text-center">
        <l-cardio
            size="50"
            stroke="4"
            speed="2" 
            color="#ff4f19" 
        ></l-cardio>
    </div> 
}