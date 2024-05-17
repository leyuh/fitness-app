import { useEffect, useState } from "react";

export default function ConfirmationPanel ({ data, setConfirmationPanel }) {

    const [anim, setAnim] = useState(false);


    useEffect(() => {
        setAnim(prev => !prev);
    }, [data])


    return <div className={`bg-background2 rounded-sm py-6 px-2 absolute top-[100%] mx-auto text-white block max-w-sm ${anim && "popup-transition"} shadow-2xl`}>
        <h4 className="text-center font-bold text-lg">{data?.message}</h4>
        <p className="text-center">{data?.submessage}</p>

        <div className="flex justify-center gap-4 mt-4">
            <button 
                className="button bg-primary primary-gradient w-24 h-10 font-bold text-lg text-white"
                onClick={() => setConfirmationPanel(null)}
            >
                Cancel
            </button>
            <button 
                className="button bg-primary primary-gradient w-24 h-10 font-bold text-lg text-white"
                onClick={data?.handler}
            >
                {data?.buttonText}
            </button>
        </div>
    </div>
}