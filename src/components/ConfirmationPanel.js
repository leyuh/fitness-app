import { useEffect, useState } from "react";

export default function ConfirmationPanel ({ data, setConfirmationPanel }) {

    return <div className={`bg-background2 border-4 rounded-sm py-6 px-2 absolute top-[30%] mx-auto text-white block max-w-sm`}>
        <h4 className="text-center font-bold text-lg mt-4">{data?.message}</h4>
        <p className="text-center mt-2">{data?.submessage}</p>

        <div className="flex justify-center gap-4 mt-2">
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